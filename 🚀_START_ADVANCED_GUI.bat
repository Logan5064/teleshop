@echo off
title TeleShop Advanced GUI v2.0 - Integrated Manager
echo 🚀 Запуск TeleShop Advanced GUI v2.0...
echo ======================================
echo.
echo Компоненты системы:
echo 🤖 Auth Bot (Telegram авторизация)
echo ⚙️ Backend API (порт 8000) 
echo 🌐 Frontend (порт 3000)
echo 🎨 Constructor (порт 3002)
echo 🚀 LocalTunnel для внешнего доступа
echo.
echo 📋 Управление через GUI интерфейс
echo ======================================
echo.

python teleshop_advanced_gui.py

if %errorlevel% neq 0 (
    echo.
    echo ❌ Ошибка запуска GUI!
    echo Проверьте установку Python и tkinter
    pause
)

echo.
echo GUI завершен. Нажмите любую клавишу для выхода...
pause > nul 