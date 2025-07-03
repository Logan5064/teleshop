@echo off
title TeleShop Public URL - Единая ссылка для всего приложения
color 0A

echo.
echo ====================================================
echo           🌐 TeleShop - Единый публичный URL
echo ====================================================
echo.
echo Создаем временную публичную ссылку для TeleShop Constructor
echo.
echo ✅ Включает:
echo  - Дашборд
echo  - Конструктор магазинов  
echo  - Управление ботами
echo  - Аналитику
echo  - Все страницы системы
echo.
echo ⚠️  ВАЖНО: TeleShop должен быть запущен на порту 3000!
echo.
pause

echo.
echo 🚀 Создаем публичный URL...
echo.

:: Создаем один туннель для всего приложения
echo 🌐 Запускаем туннель для TeleShop Constructor...
npx localtunnel --port 3000 --subdomain teleshop-%RANDOM%

echo.
echo ℹ️  URL будет показан выше
echo 📋 Скопируйте и поделитесь с пользователями
echo.
echo 🛑 Для остановки нажмите Ctrl+C
echo.
pause 