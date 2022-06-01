FROM node:16-alpine

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

WORKDIR /app

ENV NODE_ENV development
COPY package.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "start:dev" ]