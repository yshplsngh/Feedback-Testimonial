FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl openssl-dev

COPY package*.json  ./
COPY tsconfig.json  ./
RUN npm install

COPY prisma ./prisma/
RUN npm run db:gen

COPY src ./src

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]