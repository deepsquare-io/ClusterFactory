# Deploy rapidly a ClusterFactory cluster on Exoscale

## Usage

See [examples](./examples/) directory for sample usages.

See below for a simple inclusion within your own terraform project.

```hcl
module "slurm_cluster" {
  source = "github.com/SquareFactory/ClusterFactory-CE/terraform/exoscale?ref=v0.8.0"

  # ... omitted ...
}
```
