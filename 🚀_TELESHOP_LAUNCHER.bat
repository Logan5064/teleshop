@echo off
chcp 65001 >nul
title 🚀 TeleShop Launcher

echo.
echo ============================================
echo    🚀 TeleShop Launcher - Запуск GUI
echo ============================================
echo.

cd /d "%~dp0"

echo ✅ Текущая папка: %CD%
echo.

if not exist "teleshop-deploy-key" (
    echo ❌ ОШИБКА: SSH ключ не найден!
    echo    Убедитесь что вы запускаете из папки:
    echo    C:\Users\GTX\Desktop\sitetest
    echo.
    pause
    exit /b 1
)

if not exist "teleshop_launcher.py" (
    echo ❌ ОШИБКА: Файл teleshop_launcher.py не найден!
    echo.
    pause
    exit /b 1
)

echo 🔑 SSH ключ найден ✅
echo 🐍 Запускаю Python GUI...
echo.
echo 💡 В GUI используйте кнопки для управления:
echo    ▶️  Запустить компонент
echo    ⏹️  Остановить компонент
echo    🚀 Запустить ВСЕ
echo    📋 Логи в реальном времени
echo.

python teleshop_launcher.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Ошибка запуска! Проверьте что Python установлен.
    echo.
    echo 🔧 Попробуйте: python3 teleshop_launcher.py
    echo.
    pause
)

echo.
echo 👋 TeleShop Launcher завершен
pause 