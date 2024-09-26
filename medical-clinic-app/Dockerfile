FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y docker-compose

EXPOSE 3000

CMD ["docker-compose", "up"]
