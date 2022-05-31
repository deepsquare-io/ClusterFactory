# MetalLB, the bare-metal Load Balancer

A good article is written [here](https://kubernetes.github.io/ingress-nginx/deploy/baremetal/).

Kubernetes was primarily designed for the cloud. Most clouds have a [Cloud Load Balancer](https://cloud.google.com/load-balancing). On bare-metal, that load balancer doesn't exist.

![Cloud environment](02-metallb.assets/cloud_overview.jpg)

![Bare-metal environment](02-metallb.assets/baremetal_overview.jpg)

A proper solution would have been to use a dedicated appliance or software (like [HAproxy](https://www.haproxy.com/documentation/hapee/latest/high-availability/active-active/l4-load-balancing/)) which is outside the Kubernetes cluster. The ingresses (like Traefik) would have been configured using [NodePort services](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport).

![User edge](02-metallb.assets/user_edge.jpg)

However, MetalLB is inside the Kubernetes Cluster and permits the use of [LoadBalancer services](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer). The experience becomes extremely similar to the cloud and load balancing is resolved using L2 or L3 (BGP) solutions.

![MetalLB in L2 mode](02-metallb.assets/metallb.jpg)

Using a self-provisioned edge is surely the most stable and suitable solution since MetalLB is still young. However, MetalLB allows for a proper Kubernetes experience.
