FROM node:16.13.2

EXPOSE 8080

WORKDIR /backend

COPY package*.json ./
COPY .env ./

RUN npm install

COPY src/presentation_layer/app.js ./src/ 

COPY src src

CMD ["npm", "run", "start"]
