#!/bin/bash

echo "🔍 ДИАГНОСТИКА ПРОБЛЕМЫ TELESHOP"
echo "================================="

echo "1. Проверяем что слушает каждый порт:"
echo "   Порт 3000: $(lsof -i :3000 | grep LISTEN | head -1)"
echo "   Порт 3001: $(lsof -i :3001 | grep LISTEN | head -1)"
echo "   Порт 8000: $(lsof -i :8000 | grep LISTEN | head -1)"

echo ""
echo "2. PM2 процессы:"
pm2 list

echo ""
echo "3. Проверяем ответы портов:"
echo "   3000: $(curl -s -I http://localhost:3000 | head -1 | tr -d '\r')"
echo "   3001: $(curl -s -I http://localhost:3001 | head -1 | tr -d '\r')"

echo ""
echo "4. Проверяем содержимое главной страницы:"
echo "   3000 title: $(curl -s http://localhost:3000 | grep -o '<title[^>]*>[^<]*</title>' | head -1)"
echo "   3001 title: $(curl -s http://localhost:3001 | grep -o '<title[^>]*>[^<]*</title>' | head -1)"

echo ""
echo "🛠️ ИСПРАВЛЕНИЕ ПРОБЛЕМЫ"
echo "======================="

echo "1. Останавливаем ВСЕ PM2 процессы..."
pm2 stop all
pm2 delete all

echo "2. Убиваем зависшие Node.js процессы..."
pkill -f node || true
pkill -f next || true

echo "3. Ждем 5 секунд..."
sleep 5

echo "4. Очищаем кэш и пересобираем Dashboard..."
cd /root/sitetest/01-user-dashboard
rm -rf .next node_modules/.cache
npm run build

echo "5. Очищаем кэш и пересобираем Constructor..."
cd /root/sitetest/offconstryktor
rm -rf .next node_modules/.cache
npm run build

echo "6. Запускаем сервисы по очереди..."

# Dashboard на порту 3000
echo "   → Запускаем Dashboard на порту 3000..."
cd /root/sitetest/01-user-dashboard
pm2 start npm --name 'dashboard' -- start
sleep 10

# Constructor на порту 3001
echo "   → Запускаем Constructor на порту 3001..."
cd /root/sitetest/offconstryktor
pm2 start npm --name 'constructor' -- start
sleep 10

# Backend API
echo "   → Запускаем Backend API..."
cd /root/sitetest/05-server-launchers/main
pm2 start python3 --name 'backend' -- api_server.py --host 0.0.0.0 --port 8000
sleep 5

# Auth Bot
echo "   → Запускаем Auth Bot..."
cd /root/sitetest/auth-bot
pm2 start python3 --name 'auth-bot' -- working_bot.py
sleep 5

echo ""
echo "7. Проверяем результат:"
pm2 list

echo ""
echo "8. Финальная проверка портов:"
echo "   3000: $(curl -s -I http://localhost:3000 | head -1 | tr -d '\r')"
echo "   3001: $(curl -s -I http://localhost:3001 | head -1 | tr -d '\r')"

echo ""
echo "9. Проверяем содержимое после исправления:"
echo "   3000 title: $(curl -s http://localhost:3000 | grep -o '<title[^>]*>[^<]*</title>' | head -1)"
echo "   3001 title: $(curl -s http://localhost:3001 | grep -o '<title[^>]*>[^<]*</title>' | head -1)"

echo ""
echo "🎉 ГОТОВО! Проверьте:"
echo "   🏠 Dashboard: http://77.73.232.46:3000"
echo "   🎨 Constructor: http://77.73.232.46:3001"
echo "   🔧 Backend API: http://77.73.232.46:8000" 