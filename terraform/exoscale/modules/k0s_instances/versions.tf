terraform {
  required_version = ">= 1.2.0"
  required_providers {
    exoscale = {
      source  = "exoscale/exoscale"
      version = "~> 0.41.0"
    }
  }
  experiments = [module_variable_optional_attrs]
}
