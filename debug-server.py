#!/usr/bin/env python3
"""
🔍 TeleShop Server Debug & Fix Script
Диагностирует и исправляет проблемы с портами на сервере
"""

import subprocess
import requests
import time
import os
import sys

def run_cmd(cmd):
    """Выполняет команду и возвращает результат"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout.strip(), result.stderr.strip(), result.returncode
    except Exception as e:
        return "", str(e), 1

def check_port_content(port):
    """Проверяет содержимое порта"""
    try:
        response = requests.get(f"http://localhost:{port}", timeout=5)
        title = ""
        if "<title>" in response.text:
            start = response.text.find("<title>") + 7
            end = response.text.find("</title>", start)
            title = response.text[start:end]
        return response.status_code, title
    except:
        return 0, "NO_RESPONSE"

def main():
    print("🔍 ДИАГНОСТИКА ПРОБЛЕМЫ TELESHOP")
    print("=" * 50)
    
    # 1. Проверяем текущее состояние
    print("1. Проверяем порты:")
    for port in [3000, 3001, 8000]:
        status, title = check_port_content(port)
        print(f"   Порт {port}: {status} | {title}")
    
    # 2. PM2 статус
    print("\n2. PM2 процессы:")
    stdout, _, _ = run_cmd("pm2 list")
    print(stdout)
    
    # 3. Проверяем что слушает порты
    print("\n3. Процессы на портах:")
    for port in [3000, 3001, 8000]:
        stdout, _, _ = run_cmd(f"lsof -i :{port} | grep LISTEN")
        if stdout:
            print(f"   Порт {port}: {stdout}")
        else:
            print(f"   Порт {port}: FREE")
    
    # Диагностика проблемы
    status_3000, title_3000 = check_port_content(3000)
    status_3001, title_3001 = check_port_content(3001)
    
    if "Constructor" in title_3000:
        print("\n❌ ПРОБЛЕМА: На порту 3000 запущен конструктор вместо дашборда!")
        print("🔧 НАЧИНАЮ ИСПРАВЛЕНИЕ...")
        
        # Исправляем проблему
        print("\n🛠️ ИСПРАВЛЕНИЕ:")
        
        # 1. Останавливаем все
        print("1. Останавливаем все PM2 процессы...")
        run_cmd("pm2 stop all")
        run_cmd("pm2 delete all")
        
        # 2. Убиваем зависшие процессы
        print("2. Убиваем зависшие Node.js процессы...")
        run_cmd("pkill -f node")
        run_cmd("pkill -f next")
        time.sleep(3)
        
        # 3. Очищаем кэш
        print("3. Очищаем кэш...")
        os.chdir("/root/sitetest/01-user-dashboard")
        run_cmd("rm -rf .next")
        run_cmd("npm run build")
        
        os.chdir("/root/sitetest/offconstryktor")
        run_cmd("rm -rf .next")
        run_cmd("npm run build")
        
        # 4. Запускаем правильно
        print("4. Запускаем сервисы...")
        
        # Dashboard на 3000
        os.chdir("/root/sitetest/01-user-dashboard")
        run_cmd("pm2 start npm --name 'dashboard' -- start")
        time.sleep(8)
        
        # Constructor на 3001
        os.chdir("/root/sitetest/offconstryktor")
        run_cmd("pm2 start npm --name 'constructor' -- start")
        time.sleep(8)
        
        # Backend
        os.chdir("/root/sitetest/05-server-launchers/main")
        run_cmd("pm2 start python3 --name 'backend' -- main_secure_fixed.py --host 0.0.0.0 --port 8000")
        time.sleep(3)
        
        # Auth Bot
        os.chdir("/root/sitetest/auth-bot")
        run_cmd("pm2 start python3 --name 'auth-bot' -- working_bot.py")
        time.sleep(3)
        
        print("\n5. Проверяем результат:")
        stdout, _, _ = run_cmd("pm2 list")
        print(stdout)
        
        print("\n6. Финальная проверка:")
        for port in [3000, 3001, 8000]:
            status, title = check_port_content(port)
            print(f"   Порт {port}: {status} | {title}")
        
        print("\n🎉 ГОТОВО! Проверьте:")
        print("   🏠 Dashboard: http://77.73.232.46:3000")
        print("   🎨 Constructor: http://77.73.232.46:3001")
        print("   🔧 Backend API: http://77.73.232.46:8000")
        
    else:
        print("\n✅ Портоkay! Дашборд работает правильно.")

if __name__ == "__main__":
    main() 