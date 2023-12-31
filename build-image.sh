#!/bin/sh
# make sure you have run the `command` bellow
#yarn && yarn build
TAG=$(./get-version.sh)
docker build -t levychen/chroma-viewer:$TAG .
docker tag levychen/chroma-viewer:$TAG levychen/chroma-viewer:latest 

# --push
push=false

# Process command-line arguments
while [ $# -gt 0 ]; do
  case $1 in
    --push)
      push=true
      ;;
    *)
      echo "Unknown argument will be ignored: $1"
      ;;
  esac
  shift
done

if [ "$push" = true ]; then
  echo "push is true. Performing push operation..."

  echo "Pushing to registry..."
  docker push levychen/chroma-viewer -a

  echo "Build and push complete!"
else
  echo "push is false. Skipping push operation."
fi
