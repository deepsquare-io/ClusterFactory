{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "slurm-cluster.name" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- printf "%s-%s-%s" .Release.Name .Values.slurmConfig.clusterName $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Fullname suffixed with controller */}}
{{- define "slurm-cluster.controller.name" -}}
{{- printf "%s-controller" (include "slurm-cluster.name" .) -}}
{{- end }}

{{/* Fullname suffixed with login */}}
{{- define "slurm-cluster.login.name" -}}
{{- printf "%s-login" (include "slurm-cluster.name" .) -}}
{{- end }}
