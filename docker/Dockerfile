FROM node:18.14.0-alpine

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY ./docker/ecosystem.config.js .

COPY ../ .

RUN npm run build

CMD pm2-runtime ecosystem.config.js