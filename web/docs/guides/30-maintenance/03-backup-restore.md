# Backup and restore

## Backup

```shell
cfctl backup
```

This will create a `tar.gz` with:

- The certificates (the content of the <data-dir\>/pki directory)
- An etcd snapshot, if the etcd datastore is used
- Any custom-defined manifests under the <data-dir\>/manifests
- Any image bundles located under the <data-dir\>/images
- Any helm configuration

PersistentVolumes won't be inside the backup.

## Restore

```shell
cfctl apply --debug --restore-from /path/to/backup_file.tar.gz
```
