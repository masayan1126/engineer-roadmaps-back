FROM node:lts-slim

WORKDIR /usr/api

ENV PORT 8080

# コンテナ内でnpxコマンドを実行するため
RUN apt-get update -y && apt-get install -y openssl

# COPY ../package*.json ./
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# FIXME: node_modulesなどの不要ファイル対応
COPY ../api ./

RUN npm ci


