{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "cvmfs-service.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "cvmfs-service.fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Convert repositories to string like: example.com,test.com,...
*/}}
{{- define "cvmfs-service.repositoriesList" -}}
{{- $list := list -}}
{{- range $rep := .Values.repositories -}}
{{- $list = append $list $rep.repository -}}
{{- end -}}
{{ join ", " $list }}
{{- end -}}
