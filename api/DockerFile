FROM node:20-alpine

WORKDIR /app

COPY package*.json  ./
COPY tsconfig.json  ./
RUN npm install

COPY prisma ./prisma/
RUN npm run db:generate

COPY src ./src

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npm run start"]