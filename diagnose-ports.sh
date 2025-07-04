#!/bin/bash
echo "🔍 TeleShop Port Diagnostics"
echo "=========================="

echo "1. Проверяем что запущено на портах:"
echo "   Port 3000: $(lsof -i :3000 | grep LISTEN || echo 'FREE')"
echo "   Port 3001: $(lsof -i :3001 | grep LISTEN || echo 'FREE')"
echo "   Port 8000: $(lsof -i :8000 | grep LISTEN || echo 'FREE')"

echo ""
echo "2. PM2 статус:"
pm2 status

echo ""
echo "3. Активные Node.js процессы:"
ps aux | grep -E "(node|next)" | grep -v grep

echo ""
echo "4. Проверяем ответы портов:"
echo "   Port 3000: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo 'NO_RESPONSE')"
echo "   Port 3001: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 2>/dev/null || echo 'NO_RESPONSE')"
echo "   Port 8000: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000 2>/dev/null || echo 'NO_RESPONSE')"

echo ""
echo "5. Конфигурация портов в файлах:"
echo "   Dashboard package.json: $(grep -A 2 -B 2 '3000' /root/sitetest/01-user-dashboard/package.json || echo 'NOT_FOUND')"
echo "   Constructor package.json: $(grep -A 2 -B 2 '3001' /root/sitetest/offconstryktor/package.json || echo 'NOT_FOUND')"

echo ""
echo "🎯 РЕКОМЕНДАЦИИ:"
echo "1. Если оба порта показывают один контент - остановите все PM2 процессы"
echo "2. Перезапустите Dashboard на порту 3000 и Constructor на порту 3001"
echo "3. Проверьте .next папки - может быть проблема с кэшем" 