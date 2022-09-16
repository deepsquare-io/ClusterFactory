provider "openstack" {
  auth_url    = "https://auth.cloud.ovh.net/v3/"
  domain_name = "default"

  user_name   = var.ovh_user_name
  tenant_name = var.ovh_tenant_name
  tenant_id   = var.ovh_tenant_id
  password    = var.ovh_password
  region      = var.region
}
