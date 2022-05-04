# MetalLB, the bare-metal Load Balancer

A good article is written [here](https://kubernetes.github.io/ingress-nginx/deploy/baremetal/).

Kubernetes was primarily made for the cloud. Most of the cloud have a [Cloud Load Balancer](https://cloud.google.com/load-balancing). On bare-metal, this load balancer obviously doesn't exists.

![Cloud environment](02-metallb.assets/cloud_overview.jpg)

![Bare-metal environment](02-metallb.assets/baremetal_overview.jpg)

A proper solution would have been to use a dedicated appliance or software (like [HAproxy](https://www.haproxy.com/documentation/hapee/latest/high-availability/active-active/l4-load-balancing/)) which is outside the kubernetes cluster. The ingresses (like Traefik) would have been configured using [NodePort services](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport).

![User edge](02-metallb.assets/user_edge.jpg)

However, MetalLB is included in the Kubernetes Cluster and permits the use of [LoadBalancer services](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer). The experience become extremely similar to the cloud and the Load Balancing

![MetalLB in L2 mode](02-metallb.assets/metallb.jpg)

Using a self-provisioned edge is surely the most stable and suitable solution, since MetalLB is still young. However, for simple clusters MetalLB allows a proper Kubernetes experience.

