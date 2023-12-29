#!/bin/sh
# make sure you have run the `command` bellow
#yarn && yarn build
TAG=$(./get-version.sh)
docker build -t levychen/chroma-viewer:$TAG .
