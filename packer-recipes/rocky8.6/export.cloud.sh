#!/bin/sh

AWS_PROFILE=exoscale s5cmd --endpoint-url https://sos-at-vie-1.exo.io run commands.s5cmd
