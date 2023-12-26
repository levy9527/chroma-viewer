#!/bin/sh
# make sure you have setup Node.js environment
yarn && yarn build
TAG=$(./get-tag.sh)
docker build -t levychen/chroma-viewer:$TAG .
