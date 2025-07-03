@echo off
title TeleShop Tunnels - Временные публичные URL
color 0A

echo.
echo ====================================================
echo           🌐 TeleShop Public URL Generator
echo ====================================================
echo.
echo Создаем временные публичные ссылки для:
echo  - Основное приложение (порт 3000)
echo  - Конструктор (порт 3001)  
echo  - API Backend (порт 8000)
echo.
echo ⚠️  ВАЖНО: Серверы должны быть уже запущены!
echo.
pause

echo.
echo 🚀 Запускаем туннели...
echo.

:: Запускаем туннели в новых окнах
start "TeleShop Main App Tunnel" cmd /k "echo 🌐 Основное приложение (порт 3000) && lt --port 3000 --subdomain teleshop-main-%RANDOM%"

timeout /t 2 /nobreak >nul

start "TeleShop Constructor Tunnel" cmd /k "echo 🎨 Конструктор (порт 3001) && lt --port 3001 --subdomain teleshop-constructor-%RANDOM%"

timeout /t 2 /nobreak >nul

start "TeleShop API Tunnel" cmd /k "echo 🔧 API Backend (порт 8000) && lt --port 8000 --subdomain teleshop-api-%RANDOM%"

echo.
echo ✅ Туннели запущены в отдельных окнах!
echo.
echo 📋 Скопируйте URL из каждого окна и поделитесь с пользователями
echo.
echo 🛑 Для остановки закройте окна туннелей
echo.
pause 