locals {
  tags = {
    Name        = "${var.domain_name}"
    Environment = "${var.env}"
  }
  cert_sans = ["www.${var.domain_name}", "*.${var.domain_name}"]
}

variable "env" {
  default = "production"
}

variable "domain_name" {
  default = "give-credit.co.nz"
}