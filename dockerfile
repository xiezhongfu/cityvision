FROM node:lts-alpine
RUN npm install -g http-server --registry=https://registry.npm.taobao.org
WORKDIR /app
COPY . .
EXPOSE 8080
ENTRYPOINT [ "http-server", "/app/packages/front/build", "-g"]