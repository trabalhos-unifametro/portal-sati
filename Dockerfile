FROM node:18-alpine
LABEL authors="rafael"

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-only

EXPOSE 8080
CMD [ "http-server", "dist" ]