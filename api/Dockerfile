# Stage 1: Building Environment

FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY prisma ./prisma
RUN npm run db:gen

COPY src ./src
RUN npm run build

RUN npm prune --production


# Stage 2: Production Environment

FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl openssl-dev

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY prisma ./prisma

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]