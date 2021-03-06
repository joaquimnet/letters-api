FROM node:14-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD ["npm", "start"]
