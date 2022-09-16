terraform {
  required_version = ">= 1.2.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.48.0"
    }
  }
  experiments = [module_variable_optional_attrs]
}
