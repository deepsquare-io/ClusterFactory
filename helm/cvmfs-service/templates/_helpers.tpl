{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "cvmfs-service.name" -}}
{{- default .Release.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
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
