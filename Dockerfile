FROM node:18.17.1-alpine as builder
LABEL authors="Rafael Leonan"
RUN mkdir /app
WORKDIR /app
ADD package-lock.json .
ADD package.json .
RUN npm ci
ADD . .
RUN npm run build

FROM devforth/spa-to-http:latest
COPY --from=builder /app/dist/ .