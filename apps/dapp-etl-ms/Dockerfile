FROM node:18.15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env
RUN npx prisma generate && npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
