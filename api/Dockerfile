# Stage 1: Building Environment

FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npm run db:gen

COPY tsconfig.json ./
COPY src ./src
RUN npm run build


# Stage 2: Production Environment

FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY prisma ./prisma

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]