FROM node:18-alpine AS base
RUN apk add --no-cache dumb-init
WORKDIR /usr/src/app

# Bağımlılıkları kur
COPY package*.json ./
RUN npm ci

# Uygulama dosyalarını kopyala
COPY prisma ./prisma
COPY . .

# Prisma client'ı oluştur
RUN npx prisma generate

EXPOSE 8000
CMD ["dumb-init", "npm", "run", "start"]

