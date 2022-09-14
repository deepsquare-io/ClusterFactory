terraform {
  required_version = ">= 1.2.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.35.0"
    }
    ovh = {
      source  = "ovh/ovh"
      version = "~> 0.21.0"
    }
  }
  experiments = [module_variable_optional_attrs]
}
