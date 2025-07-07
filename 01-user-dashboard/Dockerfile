# Frontend Dockerfile для TeleShop Next.js
FROM node:18-alpine

# Устанавливаем системные зависимости
RUN apk add --no-cache libc6-compat

# Создаем рабочую директорию
WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --legacy-peer-deps

# Копируем весь frontend код
COPY . .

# Переменные окружения для production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Собираем приложение
RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"] 