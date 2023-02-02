#!/bin/bash

sudo chmod -R 777 /home/ec2-user/build

cd /home/ec2-user/build
echo "cd to build File"
source /home/ec2-user/.bash_profile

npm -v
node -v

npm install -g yarn 

yarn -v

npm install -g pm2

cp /home/ec2-user/build/env/.env.dev /home/ec2-user/build/.env

pm2 stop all

yarn config:dev

pm2 start dist/ecosystem.json