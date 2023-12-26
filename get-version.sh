#!/bin/sh

# Get the current datetime in the desired format (YYYY-MM-DD-HHMM)
CURRENT_DATETIME=$(date +'%Y_%m_%d_%H_%M')

# Get the abbreviated Git commit hash
GIT_COMMIT=$(git rev-parse --short HEAD)

# Combine the datetime and Git commit hash to generate the tag
TAG="${CURRENT_DATETIME}-${GIT_COMMIT}"

# Print the generated tag
echo "${TAG}"
