
FROM node:16-slim

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
