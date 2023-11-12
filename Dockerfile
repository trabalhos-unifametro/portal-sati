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

#FROM nginx:1.25.3-alpine AS production
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=builder /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]