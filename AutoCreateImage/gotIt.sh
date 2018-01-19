#!/bin/bash
# clone code
git clone git@project.t90.vn:taobaoteam/polim-server.git
# copy gulp file to project
cp gulpfile.js polim-server/
cd polim-server
git checkout release
# install gulp
npm install gulp gulp-install gulp-ext-replace gulp-json-modify gulp-run-command gulp-json-editor --save-dev
# auto gencode
gulp
# create docker image
cd ..
docker build -t gobiz-api:$1 .
# tag image
# docker tag SOURCE_IMAGE[:TAG] gobiz.[:TAG]
export DOCKER_ID_USER="anhdq1102"
docker login -u anhdq1102 -p dangquanganh1102
docker tag gobiz-api:$1 $DOCKER_ID_USER/gobiz-api:$1
# push image to dockerhub
# docker push
docker push $DOCKER_ID_USER/gobiz-api:$1
