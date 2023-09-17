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
  name = "give-credit-cluster" # Name your cluster here
}