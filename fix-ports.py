#!/usr/bin/env python3
"""
🔧 TeleShop Port Fix Script
Исправляет проблемы с портами и запускает все сервисы правильно
"""

import subprocess
import requests
import time
import sys
import os

def run_command(cmd):
    """Выполняет команду и возвращает результат"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout, result.stderr, result.returncode
    except Exception as e:
        return "", str(e), 1

def check_port(port):
    """Проверяет что запущено на порту"""
    try:
        response = requests.get(f"http://localhost:{port}", timeout=5)
        return response.status_code == 200
    except:
        return False

def main():
    print("🔧 TeleShop Port Fix - Исправление портов")
    print("=" * 50)
    
    # 1. Останавливаем все PM2 процессы
    print("1. Останавливаем все PM2 процессы...")
    run_command("pm2 stop all")
    run_command("pm2 delete all")
    time.sleep(2)
    
    # 2. Убиваем все Node.js процессы
    print("2. Убиваем все Node.js процессы...")
    run_command("pkill -f node")
    run_command("pkill -f next")
    time.sleep(2)
    
    # 3. Очищаем кэш и пересобираем
    print("3. Очищаем кэш и пересобираем...")
    
    # Dashboard
    os.chdir("/root/sitetest/01-user-dashboard")
    run_command("rm -rf .next")
    run_command("npm install")
    run_command("npm run build")
    
    # Constructor
    os.chdir("/root/sitetest/offconstryktor")
    run_command("rm -rf .next")
    run_command("npm install")
    run_command("npm run build")
    
    # 4. Запускаем сервисы по очереди
    print("4. Запускаем сервисы...")
    
    # Dashboard на порту 3000
    print("   - Запускаем Dashboard (порт 3000)...")
    os.chdir("/root/sitetest/01-user-dashboard")
    run_command("pm2 start npm --name 'dashboard' -- start")
    time.sleep(5)
    
    # Constructor на порту 3001
    print("   - Запускаем Constructor (порт 3001)...")
    os.chdir("/root/sitetest/offconstryktor")
    run_command("pm2 start npm --name 'constructor' -- start")
    time.sleep(5)
    
    # Backend API на порту 8000
    print("   - Запускаем Backend API (порт 8000)...")
    os.chdir("/root/sitetest/05-server-launchers/main")
    run_command("pm2 start python3 --name 'backend' -- main_secure_fixed.py --host 0.0.0.0 --port 8000")
    time.sleep(3)
    
    # Auth Bot
    print("   - Запускаем Auth Bot...")
    os.chdir("/root/sitetest/auth-bot")
    run_command("pm2 start python3 --name 'auth-bot' -- working_bot.py")
    time.sleep(3)
    
    # 5. Проверяем результат
    print("5. Проверяем результат...")
    print("   - Порт 3000 (Dashboard):", "✅ ОК" if check_port(3000) else "❌ НЕТ")
    print("   - Порт 3001 (Constructor):", "✅ ОК" if check_port(3001) else "❌ НЕТ")
    print("   - Порт 8000 (Backend API):", "✅ ОК" if check_port(8000) else "❌ НЕТ")
    
    # Показываем статус PM2
    print("\n6. Статус PM2:")
    stdout, _, _ = run_command("pm2 status")
    print(stdout)
    
    print("\n🎉 ГОТОВО! Сервисы запущены:")
    print("   🏠 Dashboard: http://77.73.232.46:3000")
    print("   🎨 Constructor: http://77.73.232.46:3001")
    print("   🔧 Backend API: http://77.73.232.46:8000")

if __name__ == "__main__":
    main() 