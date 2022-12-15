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

## Automatic uidNumber gidNumber generation

Uniqueness:

```shell
dsconf localhost plugin attr-uniq add "mail attribute uniqueness" --attr-name mail --subtree "dc=hpc,dc=deepsquare,dc=run"
dsconf localhost plugin attr-uniq add "uid attribute uniqueness" --attr-name uid --subtree "dc=hpc,dc=deepsquare,dc=run"
dsconf localhost plugin attr-uniq add "uidNumber attribute uniqueness" --attr-name uidNumber --subtree "dc=hpc,dc=deepsquare,dc=run"
dsconf localhost plugin attr-uniq add "gidNumber attribute uniqueness" --attr-name gidNumber --subtree "ou=groups,dc=hpc,dc=deepsquare,dc=run"
dsconf localhost plugin attr-uniq enable "mail attribute uniqueness"
dsconf localhost plugin attr-uniq enable "uid attribute uniqueness"
dsconf localhost plugin attr-uniq enable "uidNumber attribute uniqueness"
dsconf localhost plugin attr-uniq enable "gidNumber attribute uniqueness"
```

Distributed Number Assignment (DNA):

```shell
dsconf localhost plugin dna config "UID and GID numbers" add \
  --type gidNumber uidNumber \
  --filter "(|(objectclass=posixAccount)(objectclass=posixGroup))" \
  --scope dc=hpc,dc=deepsquare,dc=run\
  --next-value 1601 \
  --magic-regen -1
dsconf localhost plugin dna enable
```

Restart the server:

```shell
dsctl localhost restart
```

Test:

```shell
dsidm -b "dc=hpc,dc=deepsquare,dc=run" localhost user create \
  --uid marc \
  --cn marc \
  --displayName marc \
  --homeDirectory "/home/ldap-users/marc" \
  --uidNumber -1 \
  --gidNumber -1
```
