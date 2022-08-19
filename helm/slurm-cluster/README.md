# slurm-cluster

![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 21.08.8-2-1](https://img.shields.io/badge/AppVersion-21.08.8--2--1-informational?style=flat-square)

Slurm: A Highly Scalable Workload Manager

**Homepage:** <https://github.com/SquareFactory/slurm-docker>

## Maintainers

| Name | Email | Url |
| ---- | ------ | --- |
| Marc Nguyen | <marc@squarefactory.io> |  |
| Christophe Lillo | <lillo@squarefactory.io> |  |

## Source Code

* <https://github.com/SquareFactory/slurm-docker>

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| controller.annotations | object | `{}` |  |
| controller.command[0] | string | `"/init"` |  |
| controller.enabled | bool | `true` |  |
| controller.epilogsConfigMap | string | `""` |  |
| controller.image | string | `"ghcr.io/squarefactory/slurm:22.05.2-1-controller"` |  |
| controller.imagePullPolicy | string | `"IfNotPresent"` |  |
| controller.imagePullSecrets | object | `{}` |  |
| controller.initContainers | list | `[]` |  |
| controller.labels | object | `{}` |  |
| controller.livenessProbe.failureThreshold | int | `3` |  |
| controller.livenessProbe.initialDelaySeconds | int | `10` |  |
| controller.livenessProbe.periodSeconds | int | `10` |  |
| controller.livenessProbe.timeoutSeconds | int | `5` |  |
| controller.nodeAffinity | object | `{}` |  |
| controller.nodeSelector | object | `{}` |  |
| controller.persistence.accessModes[0] | string | `"ReadWriteOnce"` |  |
| controller.persistence.selectorLabels | object | `{}` |  |
| controller.persistence.size | string | `"50Gi"` |  |
| controller.persistence.storageClassName | string | `""` |  |
| controller.podSecurityContext.runAsUser | int | `0` |  |
| controller.prologsConfigMap | string | `""` |  |
| controller.readOnlyRootFilesystem | bool | `false` |  |
| controller.readinessProbe.failureThreshold | int | `3` |  |
| controller.readinessProbe.initialDelaySeconds | int | `10` |  |
| controller.readinessProbe.periodSeconds | int | `10` |  |
| controller.readinessProbe.successThreshold | int | `3` |  |
| controller.readinessProbe.timeoutSeconds | int | `5` |  |
| controller.replicas | int | `1` |  |
| controller.resources.limits.memory | string | `"1Gi"` |  |
| controller.resources.requests.cpu | string | `"250m"` |  |
| controller.resources.requests.memory | string | `"256Mi"` |  |
| controller.runAsNonRoot | bool | `false` |  |
| controller.runAsUser | int | `0` |  |
| controller.schedulerName | string | `""` |  |
| controller.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| controller.servicePerReplica.additionalPorts | list | `[]` |  |
| controller.servicePerReplica.annotations | object | `{}` |  |
| controller.servicePerReplica.clusterIP | string | `""` |  |
| controller.servicePerReplica.enabled | bool | `true` |  |
| controller.servicePerReplica.externalIPs | list | `[]` |  |
| controller.servicePerReplica.externalTrafficPolicy | string | `"Cluster"` |  |
| controller.servicePerReplica.labels | object | `{}` |  |
| controller.servicePerReplica.loadBalancerIP | string | `""` |  |
| controller.servicePerReplica.loadBalancerSourceRanges | list | `[]` |  |
| controller.servicePerReplica.nodePort | int | `36817` |  |
| controller.servicePerReplica.port | int | `6817` |  |
| controller.servicePerReplica.type | string | `"ClusterIP"` |  |
| controller.terminationGracePeriod | int | `10` |  |
| controller.tmp.medium | string | `""` |  |
| controller.tmp.size | string | `"50Gi"` |  |
| controller.tolerations | list | `[]` |  |
| controller.updateStrategy | string | `"RollingUpdate"` |  |
| controller.volumeClaimTemplates | list | `[]` |  |
| controller.volumeMounts | list | `[]` |  |
| controller.volumes | list | `[]` |  |
| db.annotations | object | `{}` |  |
| db.command[0] | string | `"/init"` |  |
| db.config.items | list | `[]` |  |
| db.config.secretName | string | `""` |  |
| db.enabled | bool | `false` |  |
| db.image | string | `"ghcr.io/squarefactory/slurm:22.05.2-1-db"` |  |
| db.imagePullPolicy | string | `"IfNotPresent"` |  |
| db.imagePullSecrets | object | `{}` |  |
| db.initContainers | list | `[]` |  |
| db.labels | object | `{}` |  |
| db.livenessProbe.failureThreshold | int | `3` |  |
| db.livenessProbe.initialDelaySeconds | int | `10` |  |
| db.livenessProbe.periodSeconds | int | `10` |  |
| db.livenessProbe.timeoutSeconds | int | `5` |  |
| db.net.enabled | bool | `false` |  |
| db.net.ipam.ranges[0][0].gateway | string | `"10.10.2.1"` |  |
| db.net.ipam.ranges[0][0].rangeEnd | string | `"10.10.2.50"` |  |
| db.net.ipam.ranges[0][0].rangeStart | string | `"10.10.2.46"` |  |
| db.net.ipam.ranges[0][0].subnet | string | `"10.10.2.0/24"` |  |
| db.net.ipam.type | string | `"host-local"` |  |
| db.net.masterInterface | string | `"eth0"` |  |
| db.net.mode | string | `"l2"` |  |
| db.net.type | string | `"ipvlan"` |  |
| db.networks | string | `""` |  |
| db.nodeAffinity | object | `{}` |  |
| db.nodeSelector | object | `{}` |  |
| db.podSecurityContext.runAsUser | int | `0` |  |
| db.readOnlyRootFilesystem | bool | `false` |  |
| db.readinessProbe.failureThreshold | int | `3` |  |
| db.readinessProbe.initialDelaySeconds | int | `10` |  |
| db.readinessProbe.periodSeconds | int | `10` |  |
| db.readinessProbe.successThreshold | int | `3` |  |
| db.readinessProbe.timeoutSeconds | int | `5` |  |
| db.replicas | int | `1` |  |
| db.resources.limits.memory | string | `"256Mi"` |  |
| db.resources.requests.cpu | string | `"100m"` |  |
| db.resources.requests.memory | string | `"128Mi"` |  |
| db.runAsNonRoot | bool | `false` |  |
| db.runAsUser | int | `0` |  |
| db.schedulerName | string | `""` |  |
| db.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| db.service.enabled | bool | `true` |  |
| db.service.type | string | `"ClusterIP"` |  |
| db.terminationGracePeriod | int | `10` |  |
| db.tmp.medium | string | `""` |  |
| db.tmp.size | string | `"50Gi"` |  |
| db.tolerations | list | `[]` |  |
| db.updateStrategy | string | `"RollingUpdate"` |  |
| db.volumeMounts | list | `[]` |  |
| db.volumes | list | `[]` |  |
| jwt.secretName | string | `nil` |  |
| login.annotations | object | `{}` |  |
| login.command[0] | string | `"/init"` |  |
| login.enabled | bool | `false` |  |
| login.image | string | `"ghcr.io/squarefactory/slurm:22.05.2-1-login"` |  |
| login.imagePullPolicy | string | `"IfNotPresent"` |  |
| login.imagePullSecrets | object | `{}` |  |
| login.initContainers | list | `[]` |  |
| login.labels | object | `{}` |  |
| login.livenessProbe.failureThreshold | int | `10` |  |
| login.livenessProbe.initialDelaySeconds | int | `30` |  |
| login.livenessProbe.periodSeconds | int | `30` |  |
| login.livenessProbe.timeoutSeconds | int | `30` |  |
| login.net.ipam.ranges[0][0].gateway | string | `"10.10.2.1"` |  |
| login.net.ipam.ranges[0][0].rangeEnd | string | `"10.10.2.50"` |  |
| login.net.ipam.ranges[0][0].rangeStart | string | `"10.10.2.46"` |  |
| login.net.ipam.ranges[0][0].subnet | string | `"10.10.2.0/24"` |  |
| login.net.ipam.type | string | `"host-local"` |  |
| login.net.masterInterface | string | `"eth0"` |  |
| login.net.mode | string | `"l2"` |  |
| login.net.type | string | `"ipvlan"` |  |
| login.networks | string | `""` |  |
| login.nodeAffinity | object | `{}` |  |
| login.nodeSelector | object | `{}` |  |
| login.podSecurityContext.runAsUser | int | `0` |  |
| login.readOnlyRootFilesystem | bool | `false` |  |
| login.replicas | int | `1` |  |
| login.resources.limits.memory | string | `"1Gi"` |  |
| login.resources.requests.cpu | string | `"100m"` |  |
| login.resources.requests.memory | string | `"256Mi"` |  |
| login.rest.command[0] | string | `"/init"` |  |
| login.rest.enabled | bool | `false` |  |
| login.rest.image | string | `"ghcr.io/squarefactory/slurm:22.05.2-1-rest"` |  |
| login.rest.imagePullPolicy | string | `"IfNotPresent"` |  |
| login.rest.resources.limits.memory | string | `"256Mi"` |  |
| login.rest.resources.requests.cpu | string | `"100m"` |  |
| login.rest.resources.requests.memory | string | `"128Mi"` |  |
| login.rest.volumeMounts | list | `[]` |  |
| login.runAsNonRoot | bool | `false` |  |
| login.runAsUser | int | `0` |  |
| login.schedulerName | string | `""` |  |
| login.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| login.service.enabled | bool | `true` |  |
| login.service.type | string | `"ClusterIP"` |  |
| login.sshd.secretName | string | `nil` |  |
| login.strategy.rollingUpdate.maxSurge | int | `1` |  |
| login.strategy.rollingUpdate.maxUnavailable | int | `1` |  |
| login.strategy.type | string | `"RollingUpdate"` |  |
| login.terminationGracePeriod | int | `10` |  |
| login.tmp.medium | string | `""` |  |
| login.tmp.size | string | `"50Gi"` |  |
| login.tolerations | list | `[]` |  |
| login.volumeMounts | list | `[]` |  |
| login.volumes | list | `[]` |  |
| munge.secretName | string | `nil` |  |
| ondemand.annotations | object | `{}` |  |
| ondemand.command[0] | string | `"/init"` |  |
| ondemand.config.apps | object | `{}` |  |
| ondemand.config.clusters | object | `{}` |  |
| ondemand.config.dev | object | `{}` |  |
| ondemand.config.hookEnv | string | `"K8S_USERNAME_PREFIX=\"\"\nNAMESPACE_PREFIX=\"\"\nNETWORK_POLICY_ALLOW_CIDR=\"127.0.0.1/32\"\nIDP_ISSUER_URL=\"https://idp.example.com/auth/realms/main/protocol/openid-connect/token\"\nCLIENT_ID=\"changeme\"\nCLIENT_SECRET=\"changeme\"\nIMAGE_PULL_SECRET=\"\"\nREGISTRY_DOCKER_CONFIG_JSON=\"/some/path/to/docker/config.json\"\nUSE_POD_SECURITY_POLICY=false\nUSE_JOB_POD_REAPER=false\n"` |  |
| ondemand.config.nginxStage | object | `{}` |  |
| ondemand.enabled | bool | `false` |  |
| ondemand.hostAliases[0].hostnames[0] | string | `"ondemand.example.com"` |  |
| ondemand.hostAliases[0].ip | string | `"127.0.0.1"` |  |
| ondemand.httpIngress.annotations | object | `{}` |  |
| ondemand.httpIngress.enabled | bool | `false` |  |
| ondemand.httpIngress.hosts | list | `[]` |  |
| ondemand.httpIngress.ingressClass | string | `""` |  |
| ondemand.httpIngress.tls | object | `{}` |  |
| ondemand.image | string | `"ghcr.io/squarefactory/open-ondemand:2.0.28-slurm22.05-dex"` |  |
| ondemand.imagePullPolicy | string | `"IfNotPresent"` |  |
| ondemand.imagePullSecrets | object | `{}` |  |
| ondemand.initContainers | list | `[]` |  |
| ondemand.labels | object | `{}` |  |
| ondemand.livenessProbe.failureThreshold | int | `3` |  |
| ondemand.livenessProbe.initialDelaySeconds | int | `60` |  |
| ondemand.livenessProbe.periodSeconds | int | `10` |  |
| ondemand.livenessProbe.successThreshold | int | `1` |  |
| ondemand.livenessProbe.tcpSocket.port | int | `80` |  |
| ondemand.livenessProbe.timeoutSeconds | int | `1` |  |
| ondemand.nodeAffinity | object | `{}` |  |
| ondemand.nodeSelector | object | `{}` |  |
| ondemand.oidcIngress.annotations | object | `{}` |  |
| ondemand.oidcIngress.enabled | bool | `false` |  |
| ondemand.oidcIngress.hosts | list | `[]` |  |
| ondemand.oidcIngress.ingressClass | string | `""` |  |
| ondemand.oidcIngress.tls | object | `{}` |  |
| ondemand.oodPortalSecretName | string | `""` |  |
| ondemand.persistence.accessModes[0] | string | `"ReadWriteOnce"` |  |
| ondemand.persistence.selectorLabels | object | `{}` |  |
| ondemand.persistence.size | string | `"50Gi"` |  |
| ondemand.persistence.storageClassName | string | `""` |  |
| ondemand.podSecurityContext.runAsUser | int | `0` |  |
| ondemand.readOnlyRootFilesystem | bool | `false` |  |
| ondemand.readinessProbe.failureThreshold | int | `3` |  |
| ondemand.readinessProbe.periodSeconds | int | `2` |  |
| ondemand.readinessProbe.successThreshold | int | `1` |  |
| ondemand.readinessProbe.tcpSocket.port | int | `80` |  |
| ondemand.readinessProbe.timeoutSeconds | int | `1` |  |
| ondemand.replicas | int | `1` |  |
| ondemand.resources.limits.cpu | string | `"1"` |  |
| ondemand.resources.limits.memory | string | `"1Gi"` |  |
| ondemand.resources.requests.cpu | string | `"250m"` |  |
| ondemand.resources.requests.memory | string | `"256Mi"` |  |
| ondemand.runAsNonRoot | bool | `false` |  |
| ondemand.runAsUser | int | `0` |  |
| ondemand.schedulerName | string | `""` |  |
| ondemand.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| ondemand.service.enabled | bool | `true` |  |
| ondemand.service.type | string | `"ClusterIP"` |  |
| ondemand.sshd.secretName | string | `nil` |  |
| ondemand.terminationGracePeriod | int | `10` |  |
| ondemand.tmp.medium | string | `""` |  |
| ondemand.tmp.size | string | `"50Gi"` |  |
| ondemand.tolerations | list | `[]` |  |
| ondemand.updateStrategy.type | string | `"RollingUpdate"` |  |
| ondemand.volumeClaimTemplates | list | `[]` |  |
| ondemand.volumeMounts | list | `[]` |  |
| ondemand.volumes | list | `[]` |  |
| slurmConfig.accounting | string | `"AccountingStorageType=accounting_storage/slurmdbd\nAccountingStorageHost=slurmdb.example.com\nAccountingStoragePort=6819\nAccountingStorageTRES=gres/gpu\nAccountingStoreFlags=job_comment,job_env,job_script\nAccountingStorageEnforce=associations,limits,qos\n"` |  |
| slurmConfig.auth | string | `"AuthType=auth/munge\nAuthAltTypes=auth/jwt\nAuthAltParameters=jwt_key=/var/spool/slurm/jwt_hs256.key\n"` |  |
| slurmConfig.clusterName | string | `"my-cluster"` |  |
| slurmConfig.compute.debug | string | `"debug5"` |  |
| slurmConfig.compute.srunPortRangeEnd | int | `63000` |  |
| slurmConfig.compute.srunPortRangeStart | int | `60001` |  |
| slurmConfig.controller.debug | string | `"debug5"` |  |
| slurmConfig.controller.parameters | string | `"enable_configless"` |  |
| slurmConfig.defaultResourcesAllocation | string | `"DefCpuPerGPU=4\nDefMemPerCpu=7000\n"` |  |
| slurmConfig.extra | string | `"LaunchParameters=enable_nss_slurm\nDebugFlags=Script,Gang,SelectType\nTCPTimeout=5\n\n# MPI stacks running over Infiniband or OmniPath require the ability to allocate more\n# locked memory than the default limit. Unfortunately, user processes on login nodes\n# may have a small memory limit (check it by ulimit -a) which by default are propagated\n# into Slurm jobs and hence cause fabric errors for MPI.\nPropagateResourceLimitsExcept=MEMLOCK\n\nProctrackType=proctrack/cgroup\nTaskPlugin=task/cgroup\nSwitchType=switch/none\nMpiDefault=pmix_v2\nReturnToService=2 #temp\nGresTypes=gpu\nPreemptType=preempt/qos\nPreemptMode=REQUEUE\nPreemptExemptTime=-1\nProlog=/etc/slurm/prolog.d/*\nEpilog=/etc/slurm/epilog.d/*\n\n# Federation\nFederationParameters=fed_display\n"` |  |
| slurmConfig.gres | string | `"NodeName=cn[1-12] File=/dev/nvidia[0-3] AutoDetect=nvml\n"` |  |
| slurmConfig.nodes | string | `"NodeName=cn[1-10] Sockets=8 CoresPerSocket=2 ThreadsPerCore=2 RealMemory=112000 Gres=gpu:2\nNodeName=cn[11-12] Sockets=8 CoresPerSocket=2 ThreadsPerCore=2 RealMemory=112000 Gres=gpu:2\n"` |  |
| slurmConfig.partitions | string | `"PartitionName=main Nodes=cn[1-10] Default=YES MaxTime=INFINITE State=UP OverSubscribe=NO TRESBillingWeights=\"CPU=2.6,Mem=0.25G,GRES/gpu=24.0\"\nPartitionName=main-beeond Nodes=cn[1-10] Default=NO MaxTime=INFINITE State=UP OverSubscribe=EXCLUSIVE TRESBillingWeights=\"CPU=2.6,Mem=0.25G,GRES/gpu=24.0\"\nPartitionName=private Nodes=cn[11-12] Default=NO MaxTime=INFINITE State=UP OverSubscribe=NO Hidden=YES AllowQos=admin\n"` |  |
| slurmConfig.priorities | string | `"PriorityType=priority/multifactor\n# The larger the job, the greater its job size priority.\nPriorityFavorSmall=NO\n# The job's age factor reaches 1.0 after waiting in the\n# queue for 2 weeks.\n#PriorityMaxAge=14-0\n# This next group determines the weighting of each of the\n# components of the Multi-factor Job Priority Plugin.\n# The default value for each of the following is 1.\nPriorityWeightAge=0\nPriorityWeightFairshare=0\nPriorityWeightJobSize=0\nPriorityWeightPartition=0\nPriorityWeightQOS=100\nPriorityDecayHalfLife=0\nPriorityUsageResetPeriod=MONTHLY\n"` |  |
| slurmConfig.scheduling | string | `"SchedulerType=sched/backfill\nSelectType=select/cons_tres\nSelectTypeParameters=CR_CPU_Memory\nSchedulerTimeSlice=60\nUnkillableStepTimeout=300\n"` |  |
| sssd.secretName | string | `nil` |  |

----------------------------------------------
Autogenerated from chart metadata using [helm-docs v1.11.0](https://github.com/norwoodj/helm-docs/releases/v1.11.0)
