#!/bin/sh
# make sure you have run the `command` bellow
#yarn && yarn build
TAG=$(./get-tag.sh)
docker build -t levychen/chroma-viewer:$TAG .
