terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_ecr_repository" "app_ecr_repo" {
  name = "give-credit-repo"
}

resource "aws_ecs_cluster" "my_cluster" {
  name = "give-credit-cluster" 
}

resource "aws_ecs_task_definition" "app_task" {
  family                   = "give-credit-launch" 
  container_definitions    = <<DEFINITION
  [
    {
      "name": "give-credit-launch",
      "image": "${aws_ecr_repository.app_ecr_repo.repository_url}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 5000
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = ["FARGATE"] 
  network_mode             = "awsvpc"    
  memory                   = 512         
  cpu                      = 256         
  execution_role_arn       = "${aws_iam_role.ecsTaskExecutionRole.arn}"
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = "${aws_iam_role.ecsTaskExecutionRole.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_default_vpc" "default_vpc" {
}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "ap-southeast-2a"
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "ap-southeast-2b"
}

resource "aws_alb" "application_load_balancer" {
  name               = "load-balancer-dev"
  load_balancer_type = "application"
  subnets = [ 
    "${aws_default_subnet.default_subnet_a.id}",
    "${aws_default_subnet.default_subnet_b.id}"
  ]
  security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
}

resource "aws_security_group" "load_balancer_security_group" {
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

   ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_lb_target_group" "target_group" {
  name        = "target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = "${aws_default_vpc.default_vpc.id}"
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = "${aws_alb.application_load_balancer.arn}"
  port              = "80"
  protocol          = "HTTP"
   default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = "${aws_alb.application_load_balancer.arn}"
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn = aws_acm_certificate_validation.cert_validation.certificate_arn
  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.target_group.arn}"
  }
}

resource "aws_ecs_service" "app_service" {
  name            = "give-credit-service"
  cluster         = "${aws_ecs_cluster.my_cluster.id}"   
  task_definition = "${aws_ecs_task_definition.app_task.arn}"
  launch_type     = "FARGATE"
  desired_count   = 3

  load_balancer {
    target_group_arn = "${aws_lb_target_group.target_group.arn}" 
    container_name   = "${aws_ecs_task_definition.app_task.family}"
    container_port   = 5000 
  }

  network_configuration {
    subnets          = ["${aws_default_subnet.default_subnet_a.id}", "${aws_default_subnet.default_subnet_b.id}"]
    assign_public_ip = true     
    security_groups  = ["${aws_security_group.service_security_group.id}"]
  }
}

resource "aws_security_group" "service_security_group" {
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "app_url" {
  value = aws_alb.application_load_balancer.dns_name
}

resource "aws_route53_zone" "my_hosted_zone" {
  name = var.domain_name
}

resource "aws_acm_certificate" "my_certificate_request" {
  domain_name               = var.domain_name
  subject_alternative_names = local.cert_sans
  validation_method         = "DNS"

  tags = {
    Name : var.domain_name
  }

  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_route53_record" "cert_validations" {
  count = length(local.cert_sans) + 1


  zone_id  = aws_route53_zone.my_hosted_zone.zone_id
  allow_overwrite = true
  name            = element(aws_acm_certificate.my_certificate_request.domain_validation_options.*.resource_record_name, count.index)
  type            = element(aws_acm_certificate.my_certificate_request.domain_validation_options.*.resource_record_type, count.index)
  records         = [element(aws_acm_certificate.my_certificate_request.domain_validation_options.*.resource_record_value, count.index)]
  ttl             = 60
}

# This tells terraform to cause the route53 validation to happen
resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.my_certificate_request.arn
  validation_record_fqdns = aws_route53_record.cert_validations.*.fqdn

  timeouts {
    create = "120m"
  }
}

resource "aws_route53_record" "root" {
name = aws_route53_zone.my_hosted_zone.name
type = "A"
zone_id = aws_route53_zone.my_hosted_zone.zone_id

alias {
zone_id = aws_alb.application_load_balancer.zone_id
name = aws_alb.application_load_balancer.dns_name
evaluate_target_health = true
}
}

resource "aws_route53_record" "www" {
name = "www.${aws_route53_zone.my_hosted_zone.name}"
type = "A"

zone_id = aws_route53_zone.my_hosted_zone.zone_id
alias {
zone_id = aws_alb.application_load_balancer.zone_id
name = aws_alb.application_load_balancer.dns_name
evaluate_target_health = true
}
}

