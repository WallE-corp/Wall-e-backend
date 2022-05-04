FROM node:16.13.2

EXPOSE 8080

WORKDIR /backend

COPY package*.json ./
COPY .env ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]
