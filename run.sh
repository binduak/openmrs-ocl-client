#!/bin/bash
echo "Holy Start..."
export PATH=/usr/local/bin:$PATH
echo $PATH
export BUILD_TIME=$(date +"%Y-%m-%d-%H-%M-%S")
echo "Build time - $BUILD_TIME"
echo "Docker build.."
docker build --no-cache -t ocl-frontend:latest .
docker tag ocl-frontend:latest 485402728093.dkr.ecr.ap-southeast-1.amazonaws.com/bahmni-msf/ocl-frontend:latest
docker tag ocl-frontend:latest 485402728093.dkr.ecr.ap-southeast-1.amazonaws.com/bahmni-msf/ocl-frontend:$BUILD_TIME
echo "aws ecr login.."
aws ecr get-login-password --region ap-southeast-1|docker login --username AWS --password-stdin 485402728093.dkr.ecr.ap-southeast-1.amazonaws.com
echo "Docker push to ECR.."
docker push 485402728093.dkr.ecr.ap-southeast-1.amazonaws.com/bahmni-msf/ocl-frontend:latest
docker push 485402728093.dkr.ecr.ap-southeast-1.amazonaws.com/bahmni-msf/ocl-frontend:$BUILD_TIME
echo "Done.."
