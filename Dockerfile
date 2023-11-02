FROM node:18 AS base

EXPOSE 23313
ENV ADDRESS=0.0.0.0 PORT=23313

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
