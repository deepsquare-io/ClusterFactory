# dirsrv-389ds

![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 2.1](https://img.shields.io/badge/AppVersion-2.1-informational?style=flat-square)

The enterprise-class Open Source LDAP server for Linux.

**Homepage:** <https://directory.fedoraproject.org>

## Maintainers

| Name             | Email                    | Url |
| ---------------- | ------------------------ | --- |
| Marc Nguyen      | <marc@squarefactory.io>  |     |
| Christophe Lillo | <lillo@squarefactory.io> |     |

## Source Code

- <https://github.com/389ds/389-ds-base/>
- <https://hub.docker.com/r/389ds/dirsrv>

## Initializing the database

By default, no entries are inside the database.

To create entries, enter the container using `kubectl exec -it <pod> bash` and execute these commands:

```shell
dsconf localhost backend create --suffix dc=example,dc=com --be-name example_backend
dsidm localhost initialise
```

## Values

| Key                               | Type   | Default                    | Description |
| --------------------------------- | ------ | -------------------------- | ----------- |
| annotations                       | object | `{}`                       |             |
| config.dmPassword.key             | string | `"dm-password"`            |             |
| config.dmPassword.secretName      | string | `""`                       |             |
| config.inf.key                    | string | `"container.inf"`          |             |
| config.inf.secretName             | string | `""`                       |             |
| config.logLevel                   | int    | `256`                      |             |
| config.memoryPercentage           | int    | `25`                       |             |
| config.reindex                    | bool   | `false`                    |             |
| config.suffixName                 | string | `"dc=example,dc=com"`      |             |
| image.repository                  | string | `"docker.io/389ds/dirsrv"` |             |
| image.tag                         | string | `""`                       |             |
| imagePullPolicy                   | string | `"IfNotPresent"`           |             |
| imagePullSecrets                  | object | `{}`                       |             |
| initChownData.enabled             | bool   | `true`                     |             |
| initContainers                    | list   | `[]`                       |             |
| labels                            | object | `{}`                       |             |
| livenessProbe.failureThreshold    | int    | `10`                       |             |
| livenessProbe.initialDelaySeconds | int    | `30`                       |             |
| livenessProbe.periodSeconds       | int    | `10`                       |             |
| livenessProbe.successThreshold    | int    | `1`                        |             |
| livenessProbe.timeoutSeconds      | int    | `10`                       |             |
| nodeAffinity                      | object | `{}`                       |             |
| nodeSelector                      | object | `{}`                       |             |
| persistence.accessModes[0]        | string | `"ReadWriteOnce"`          |             |
| persistence.selectorLabels        | object | `{}`                       |             |
| persistence.size                  | string | `"5Gi"`                    |             |
| persistence.storageClassName      | string | `""`                       |             |
| podSecurityContext.fsGroup        | int    | `499`                      |             |
| podSecurityContext.runAsUser      | int    | `499`                      |             |
| readinessProbe.failureThreshold   | int    | `5`                        |             |
| readinessProbe.periodSeconds      | int    | `10`                       |             |
| readinessProbe.successThreshold   | int    | `1`                        |             |
| readinessProbe.timeoutSeconds     | int    | `10`                       |             |
| replicas                          | int    | `1`                        |             |
| resources                         | object | `{}`                       |             |
| schedulerName                     | string | `""`                       |             |
| securityContext.runAsGroup        | int    | `499`                      |             |
| securityContext.runAsNonRoot      | bool   | `true`                     |             |
| securityContext.runAsUser         | int    | `499`                      |             |
| service.enabled                   | bool   | `true`                     |             |
| service.type                      | string | `"ClusterIP"`              |             |
| startupProbe.failureThreshold     | int    | `10`                       |             |
| startupProbe.initialDelaySeconds  | int    | `180`                      |             |
| startupProbe.periodSeconds        | int    | `10`                       |             |
| startupProbe.successThreshold     | int    | `1`                        |             |
| startupProbe.timeoutSeconds       | int    | `10`                       |             |
| terminationGracePeriod            | int    | `10`                       |             |
| tls.secretName                    | string | `""`                       |             |
| tolerations                       | list   | `[]`                       |             |
| updateStrategy.type               | string | `"RollingUpdate"`          |             |
| volumeMounts                      | list   | `[]`                       |             |
| volumes                           | list   | `[]`                       |             |

---

Autogenerated from chart metadata using [helm-docs v1.11.0](https://github.com/norwoodj/helm-docs/releases/v1.11.0)
