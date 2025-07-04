# 🔧 Исправление проблемы с дашбордом

## Проблема
Дашборд не запускается на сервере из-за нестабильной версии React 19 с Next.js 15

## Исправления
1. ✅ Понизил React с 19.0.0 до 18.3.1 (стабильная версия)
2. ✅ Убрал строгие CSP правила из next.config.ts
3. ✅ Добавил output: 'standalone' для лучшей совместимости
4. ✅ Исправил версии React в конструкторе тоже

## Для деплоя на сервер:
```bash
# 1. Подключиться к серверу
ssh -i teleshop-beget-key cloud_user@77.73.232.46

# 2. Перейти в папку проекта
cd /var/www/teleshop

# 3. Обновить код
git pull origin main

# 4. Переустановить зависимости дашборда
cd 01-user-dashboard
rm -rf node_modules package-lock.json
npm install

# 5. Собрать дашборд
npm run build

# 6. Переустановить зависимости конструктора
cd ../offconstryktor
rm -rf node_modules package-lock.json
npm install

# 7. Собрать конструктор
npm run build

# 8. Вернуться в корень и перезапустить PM2
cd ..
pm2 stop all
pm2 start ecosystem-server.config.js
pm2 status
```

## Проверка логов
```bash
# Логи дашборда
pm2 logs teleshop-frontend

# Логи конструктора
pm2 logs teleshop-constructor

# Логи backend
pm2 logs teleshop-backend

# Логи auth-bot
pm2 logs teleshop-auth-bot
``` 