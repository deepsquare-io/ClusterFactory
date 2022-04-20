{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "slurm-cluster.name" -}}
{{- default .Release.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Fullname suffixed with controller */}}
{{- define "slurm-cluster.controller.name" -}}
{{- printf "%s-controller" (include "slurm-cluster.name" .) -}}
{{- end }}

{{/* Fullname suffixed with login */}}
{{- define "slurm-cluster.login.name" -}}
{{- printf "%s-login" (include "slurm-cluster.name" .) -}}
{{- end }}

{{/* Fullname suffixed with rest */}}
{{- define "slurm-cluster.rest.name" -}}
{{- printf "%s-rest" (include "slurm-cluster.name" .) -}}
{{- end }}

{{/* Fullname suffixed with rest */}}
{{- define "slurm-cluster.ondemand.name" -}}
{{- printf "%s-ondemand" (include "slurm-cluster.name" .) -}}
{{- end }}
