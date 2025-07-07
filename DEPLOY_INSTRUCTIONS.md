# 🚀 Инструкция по деплою TeleShop на сервер

## 📋 Информация о сервере
- **IP**: 178.236.17.93
- **База данных**: PostgreSQL (облачная на Beget) ✅
- **Порты**: 8000 (Backend API), 3000 (Frontend)

## 🔧 Установка на сервере

### 1. Подключение к серверу
```bash
ssh root@178.236.17.93
```

### 2. Обновление системы
```bash
apt update && apt upgrade -y
```

### 3. Установка Node.js 18+
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
node --version  # должно быть 18+
npm --version
```

### 4. Установка Python 3.11+
```bash
apt install -y python3 python3-pip python3-venv
python3 --version  # должно быть 3.11+
```

### 5. Установка PM2 (для управления процессами)
```bash
npm install -g pm2
```

### 6. Клонирование проекта
```bash
cd /opt
git clone https://github.com/Logan5064/teleshop.git
cd teleshop
```

### 7. Настройка Backend (Python/FastAPI)
```bash
cd 05-server-launchers/main

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install fastapi uvicorn sqlalchemy asyncpg psycopg2-binary
pip install python-multipart python-jose passlib bcrypt
pip install aiofiles python-dotenv aiogram
pip install python-telegram-bot nest_asyncio

# Создание таблиц в БД
python -c "
import asyncio
import sys
sys.path.append('.')
from config.shared.utils.database import create_tables
asyncio.run(create_tables())
"
```

### 8. Настройка Frontend (Next.js)
```bash
cd /opt/teleshop/01-user-dashboard

# Установка зависимостей
npm install

# Сборка для продакшена
npm run build
```

### 9. Создание PM2 конфигурации
```bash
cd /opt/teleshop
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'teleshop-backend',
      script: 'python',
      args: ['-m', 'uvicorn', 'api_server:app', '--host', '0.0.0.0', '--port', '8000'],
      cwd: '/opt/teleshop/05-server-launchers/main',
      interpreter: '/opt/teleshop/05-server-launchers/main/venv/bin/python',
      env: {
        NODE_ENV: 'production',
        PYTHONPATH: '/opt/teleshop/05-server-launchers/main'
      },
      restart_delay: 3000,
      max_restarts: 10
    },
    {
      name: 'teleshop-frontend',
      script: 'npm',
      args: ['start'],
      cwd: '/opt/teleshop/01-user-dashboard',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      restart_delay: 3000,
      max_restarts: 10
    }
  ]
};
EOF
```

### 10. Запуск приложения
```bash
# Запуск с PM2
pm2 start ecosystem.config.js

# Проверка статуса
pm2 status

# Просмотр логов
pm2 logs

# Автозапуск при перезагрузке сервера
pm2 startup
pm2 save
```

## 🌐 Проверка работы

### Backend API (порт 8000)
```bash
curl http://178.236.17.93:8000/
curl http://178.236.17.93:8000/auth/stats
```

### Frontend (порт 3000)
Откройте в браузере: `http://178.236.17.93:3000`

## 🔧 Полезные команды PM2

```bash
# Перезапуск приложений
pm2 restart all

# Остановка
pm2 stop all

# Удаление
pm2 delete all

# Мониторинг
pm2 monit

# Просмотр логов конкретного приложения
pm2 logs teleshop-backend
pm2 logs teleshop-frontend
```

## 🐛 Устранение проблем

### Если порты заняты:
```bash
# Проверка занятых портов
netstat -tlnp | grep :8000
netstat -tlnp | grep :3000

# Освобождение порта
kill -9 $(lsof -t -i:8000)
kill -9 $(lsof -t -i:3000)
```

### Если проблемы с правами доступа:
```bash
chmod +x /opt/teleshop/05-server-launchers/main/venv/bin/python
chown -R $USER:$USER /opt/teleshop
```

### Обновление кода:
```bash
cd /opt/teleshop
git pull origin main
pm2 restart all
```

## ✅ Готово!

После успешного деплоя:
- 🌐 **Frontend**: http://178.236.17.93:3000
- 🔧 **Backend API**: http://178.236.17.93:8000
- 📊 **PostgreSQL**: Работает через облако Beget
- 🤖 **Система ботов**: Готова к работе

## 🔐 Система авторизации
- Коды создаются через Telegram бот
- Срок жизни кода: 15 минут
- Срок жизни сессии: 24 часа
- Вход через страницу: http://178.236.17.93:3000/login 