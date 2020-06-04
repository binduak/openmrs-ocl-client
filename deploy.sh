#!/bin/bash

echo "Start the deploy.."
OCL_API_HOST="$1"
echo "Stop the running container.."
docker stop ocl-frontend

echo "Remove the stopped container.."
docker rm ocl-frontend

echo "Run the latest docker.."
docker run --name=ocl-frontend --restart unless-stopped -d -p 80:80 -e OCL_API_HOST=${OCL_API_HOST} 485402728093.dkr.ecr.ap-southeast-1.amazonaws.com/bahmni-msf/ocl-frontend:latest

echo "Cleanup..."
docker system prune -a -f
