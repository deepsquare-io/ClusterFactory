{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "slurm-cluster.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "slurm-cluster.fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Fullname suffixed with controller */}}
{{- define "slurm-cluster.controller.name" -}}
{{- printf "%s-controller" (include "slurm-cluster.name" .) -}}
{{- end }}

{{- define "slurm-cluster.controller.fullname" -}}
{{- printf "%s-controller" (include "slurm-cluster.fullname" .) -}}
{{- end }}

{{/* Fullname suffixed with login */}}
{{- define "slurm-cluster.login.name" -}}
{{- printf "%s-login" (include "slurm-cluster.name" .) -}}
{{- end }}

{{- define "slurm-cluster.login.fullname" -}}
{{- printf "%s-login" (include "slurm-cluster.fullname" .) -}}
{{- end }}
