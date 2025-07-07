# Backend Dockerfile для TeleShop FastAPI
FROM python:3.11-slim

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Создаем рабочую директорию
WORKDIR /app

# Копируем requirements.txt
COPY main/requirements.txt .

# Устанавливаем Python зависимости
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь backend код
COPY . .

# Открываем порт 8000
EXPOSE 8000

# Переменные окружения
ENV PYTHONPATH=/app/main:/app/config
ENV PYTHONUNBUFFERED=1

# Рабочая директория для запуска
WORKDIR /app/main

# Команда запуска
CMD ["python", "api_server.py"] 