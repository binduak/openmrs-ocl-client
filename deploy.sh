#!/bin/bash

echo "Start the deploy.."
OCL_API_HOST="$1"
OCL_FRONTEND_IMG="$2"
DOCKER_IMAGE_TAG="$3"
REPO_LOCATION="$4"
echo "Stop the running container.."
docker stop ocl-frontend

echo "Remove the stopped container.."
docker rm ocl-frontend

echo "aws ecr login .."
aws ecr get-login-password --region ap-southeast-1|docker login --username AWS --password-stdin ${REPO_LOCATION}

echo "Run the latest docker.."
docker run --name=ocl-frontend --restart unless-stopped -d -p 80:80 -e OCL_API_HOST=${OCL_API_HOST} ${OCL_FRONTEND_IMG}:${DOCKER_IMAGE_TAG}

echo "Cleanup..."
docker system prune -a -f
