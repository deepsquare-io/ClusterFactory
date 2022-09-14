terraform {
  required_providers {
    exoscale = {
      source = "exoscale/exoscale"
    }
  }
  experiments = [module_variable_optional_attrs]
}
