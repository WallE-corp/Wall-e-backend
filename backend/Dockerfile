FROM node:16.13.2

EXPOSE 8080

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY src/PL/app.js ./src/ 

COPY src src

CMD ["npm", "run", "start"]
