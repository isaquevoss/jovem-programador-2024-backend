FROM ubuntu:24.04

RUN apt update
RUN apt install nodejs -y
RUN apt install npm -y

COPY . /app

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]

EXPOSE 3000
