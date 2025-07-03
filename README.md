# 🚀 TeleShop Constructor

Многопользовательская SaaS платформа для создания Telegram магазинов с автоматическим деплоем.

## 📋 Архитектура

- **Frontend** (01-user-dashboard) - Next.js 15, порт 3000
- **Constructor** (offconstryktor) - Next.js 15, порт 3001  
- **Backend API** (05-server-launchers/main) - FastAPI, порт 8000
- **Auth Bot** (auth-bot) - Telegram бот авторизации
- **Database** - PostgreSQL (Beget hosting)

## 🌐 Автодеплой через GitHub Actions

### 1. Настройка GitHub Secrets

В настройках репозитория → Settings → Secrets and variables → Actions:

```
HOST = your-server-ip-address
USERNAME = ubuntu (или ваш пользователь)
SSH_KEY = ваш приватный SSH ключ
PORT = 22 (или другой SSH порт)
```

### 2. Подготовка сервера

```bash
# Подключение к серверу
ssh username@your-server.com

# Установка Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка Python 3.9+
sudo apt-get update
sudo apt-get install -y python3 python3-pip

# Установка PM2 глобально
sudo npm install -g pm2

# Создание директории проекта
sudo mkdir -p /var/www/teleshop
sudo chown $USER:$USER /var/www/teleshop

# Клонирование репозитория
cd /var/www
git clone https://github.com/yourusername/teleshop-constructor.git teleshop
cd teleshop

# Создание директории для логов
mkdir -p logs

# Первоначальная установка зависимостей
cd 01-user-dashboard && npm install
cd ../offconstryktor && npm install
cd ../auth-bot && pip3 install -r requirements.txt

# Первоначальная сборка
cd ../01-user-dashboard && npm run build
cd ../offconstryktor && npm run build

# Запуск через PM2
cd ..
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔄 Workflow разработки

### Автоматический деплой
```bash
git add .
git commit -m "✨ Добавил новую функцию"
git push origin main
# → Автоматический деплой через GitHub Actions (2-3 минуты)
```

### Управление сервисами на сервере
```bash
# Статус
pm2 list

# Перезапуск
pm2 restart teleshop-frontend
pm2 restart teleshop-constructor  
pm2 restart teleshop-backend
pm2 restart teleshop-auth-bot

# Логи
pm2 logs teleshop-frontend
pm2 logs teleshop-backend

# Мониторинг
pm2 monit
```

## 🚨 Решение проблем

### Next.js ошибки _document.js
```bash
# Автоматически исправляется в GitHub Actions
# Или вручную на сервере:
rm -rf 01-user-dashboard/.next
rm -rf offconstryktor/.next
npm run build --prefix 01-user-dashboard
npm run build --prefix offconstryktor
pm2 restart teleshop-frontend teleshop-constructor
```

## 🎯 Первый деплой

1. **Настройте GitHub Secrets** (HOST, USERNAME, SSH_KEY)
2. **Подготовьте сервер** (Node.js, Python, PM2)
3. **Сделайте push в main ветку**
4. **GitHub Actions автоматически развернет проект**

**Готово! 🎉 TeleShop Constructor работает на сервере с автодеплоем!** 