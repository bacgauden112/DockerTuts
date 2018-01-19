FROM node:8-alpine
MAINTAINER Dang Quang Anh <dangquanganh@alimama.vn>

# Install pm2
RUN npm install pm2 -g

ENV POLIM_PATH /root/dist

# Copy files
COPY ./polim-server/dist $POLIM_PATH

RUN cd $POLIM_PATH

WORKDIR $POLIM_PATH

EXPOSE 3000

CMD ["pm2-docker", "./server/server.js"]
