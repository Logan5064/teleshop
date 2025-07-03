#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 SIMPLE TeleShop Constructor Launcher
Простые ярлыки для запуска сервисов в отдельных окнах
"""

import tkinter as tk
from tkinter import ttk, messagebox
import subprocess
import socket
import sys
import os
from pathlib import Path

class SimpleLauncher:
    def __init__(self, root):
        self.root = root
        self.root.title("🚀 SIMPLE TeleShop Constructor Launcher")
        self.root.geometry("800x600")
        self.root.configure(bg='#f0f0f0')
        
        self.local_ip = self.get_local_ip()
        self.setup_ui()
        
    def get_local_ip(self):
        """Получение локального IP адреса"""
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            s.close()
            return ip
        except:
            return "127.0.0.1"
        
    def setup_ui(self):
        """Создание интерфейса"""
        # Главный фрейм
        main_frame = ttk.Frame(self.root, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Заголовок
        title_label = ttk.Label(main_frame, text="🚀 SIMPLE TeleShop Constructor", 
                               font=('Arial', 24, 'bold'), foreground='green')
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 30))
        
        # IP информация
        ip_label = ttk.Label(main_frame, text=f"🌐 Ваш IP: {self.local_ip}", 
                            font=('Arial', 14, 'bold'), foreground='blue')
        ip_label.grid(row=1, column=0, columnspan=2, pady=(0, 20))
        
        # ЯРЛЫКИ СЕРВИСОВ
        services_frame = ttk.LabelFrame(main_frame, text="🎮 ЗАПУСК СЕРВИСОВ", padding="20")
        services_frame.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=20)
        
        # Кнопка 1: Backend
        ttk.Button(services_frame, text="🔧 ЗАПУСТИТЬ BACKEND\n(FastAPI + PostgreSQL)", 
                  command=self.launch_backend, 
                  style='Custom.TButton').grid(row=0, column=0, padx=10, pady=10, ipadx=30, ipady=20)
        
        # Кнопка 2: Auth Bot
        ttk.Button(services_frame, text="🤖 ЗАПУСТИТЬ AUTH BOT\n(Telegram авторизация)", 
                  command=self.launch_auth_bot, 
                  style='Custom.TButton').grid(row=0, column=1, padx=10, pady=10, ipadx=30, ipady=20)
        
        # Кнопка 3: Frontend
        ttk.Button(services_frame, text="🎨 ЗАПУСТИТЬ FRONTEND\n(Next.js админка)", 
                  command=self.launch_frontend, 
                  style='Custom.TButton').grid(row=1, column=0, padx=10, pady=10, ipadx=30, ipady=20)
        
        # Кнопка 4: LocalTunnel
        ttk.Button(services_frame, text="🌐 ЗАПУСТИТЬ TUNNEL\n(Внешний доступ)", 
                  command=self.launch_tunnel, 
                  style='Custom.TButton').grid(row=1, column=1, padx=10, pady=10, ipadx=30, ipady=20)
        
        # ПОЛЕЗНЫЕ ССЫЛКИ
        links_frame = ttk.LabelFrame(main_frame, text="🔗 ПОЛЕЗНЫЕ ССЫЛКИ", padding="15")
        links_frame.grid(row=3, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=20)
        
        # Ссылки
        ttk.Button(links_frame, text=f"🏠 Админка: http://localhost:3000", 
                  command=lambda: self.open_url("http://localhost:3000")).grid(row=0, column=0, padx=10, pady=5)
        
        ttk.Button(links_frame, text=f"📖 API: http://localhost:8000/docs", 
                  command=lambda: self.open_url("http://localhost:8000/docs")).grid(row=0, column=1, padx=10, pady=5)
        
        ttk.Button(links_frame, text=f"🌐 Сеть: http://{self.local_ip}:3000", 
                  command=lambda: self.open_url(f"http://{self.local_ip}:3000")).grid(row=1, column=0, padx=10, pady=5)
        
        ttk.Button(links_frame, text="📋 Копировать IP URL", 
                  command=self.copy_ip_url).grid(row=1, column=1, padx=10, pady=5)
        
        # БЫСТРЫЕ ДЕЙСТВИЯ
        actions_frame = ttk.LabelFrame(main_frame, text="⚡ БЫСТРЫЕ ДЕЙСТВИЯ", padding="15")
        actions_frame.grid(row=4, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=20)
        
        ttk.Button(actions_frame, text="🚀 ЗАПУСТИТЬ ВСЕ СЕРВИСЫ", 
                  command=self.launch_all, 
                  style='Accent.TButton').grid(row=0, column=0, padx=10, pady=10, ipadx=20)
        
        ttk.Button(actions_frame, text="🧪 ТЕСТ API", 
                  command=self.test_api).grid(row=0, column=1, padx=10, pady=10, ipadx=20)
        
        ttk.Button(actions_frame, text="📁 ОТКРЫТЬ ПАПКУ", 
                  command=self.open_folder).grid(row=0, column=2, padx=10, pady=10, ipadx=20)
        
        # Настройка растяжения
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        
        # Настройка сетки
        for i in range(2):
            services_frame.columnconfigure(i, weight=1)
            links_frame.columnconfigure(i, weight=1)
        for i in range(3):
            actions_frame.columnconfigure(i, weight=1)
        
        # Стиль кнопок
        style = ttk.Style()
        style.configure('Custom.TButton', font=('Arial', 11, 'bold'))
        style.configure('Accent.TButton', font=('Arial', 12, 'bold'))
        
    def launch_backend(self):
        """ЯРЛЫК: Запуск Backend в новом окне"""
        try:
            backend_path = Path(__file__).parent / "backend"
            
            # ИСПРАВЛЕНО: Правильная команда для PowerShell
            subprocess.Popen([
                'powershell.exe', 
                '-Command', 
                f'Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd \'{backend_path}\'; python main_secure.py"'
            ])
            
            messagebox.showinfo("✅ Backend", "Backend запускается в новом окне!\nПорт: 8000")
            
        except Exception as e:
            messagebox.showerror("❌ Ошибка", f"Не удалось запустить Backend:\n{e}")
            
    def launch_auth_bot(self):
        """ЯРЛЫК: Запуск Auth Bot в новом окне"""
        try:
            backend_path = Path(__file__).parent / "backend"
            
            # ИСПРАВЛЕНО: Используем рабочий auth_bot.py
            subprocess.Popen([
                'powershell.exe', 
                '-Command', 
                f'Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd \'{backend_path}\'; python auth_bot.py"'
            ])
            
            messagebox.showinfo("✅ Auth Bot", "Auth Bot запускается в новом окне!\nТокен: 7503005367:AAF2rrpRUr0TXSKWJZsnlPwtuU-RidYLYos")
            
        except Exception as e:
            messagebox.showerror("❌ Ошибка", f"Не удалось запустить Auth Bot:\n{e}")
            
    def launch_frontend(self):
        """ЯРЛЫК: Запуск Frontend в новом окне"""
        try:
            frontend_path = Path(__file__).parent / "frontend" / "teleshop-admin"
            
            if not frontend_path.exists():
                messagebox.showerror("❌ Ошибка", "Папка frontend/teleshop-admin не найдена!")
                return
            
            # ИСПРАВЛЕНО: Правильная команда для PowerShell
            subprocess.Popen([
                'powershell.exe', 
                '-Command', 
                f'Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd \'{frontend_path}\'; npm run dev"'
            ])
            
            messagebox.showinfo("✅ Frontend", "Frontend запускается в новом окне!\nПорт: 3000")
            
        except Exception as e:
            messagebox.showerror("❌ Ошибка", f"Не удалось запустить Frontend:\n{e}")
            
    def launch_tunnel(self):
        """ЯРЛЫК: Запуск LocalTunnel в новом окне"""
        try:
            # ИСПРАВЛЕНО: Правильная команда для PowerShell
            subprocess.Popen([
                'powershell.exe', 
                '-Command', 
                'Start-Process powershell -ArgumentList "-NoExit", "-Command", "lt --port 3000"'
            ])
            
            messagebox.showinfo("✅ LocalTunnel", "LocalTunnel запускается в новом окне!\nПорт: 3000")
            
        except Exception as e:
            messagebox.showerror("❌ Ошибка", f"Не удалось запустить LocalTunnel:\n{e}")
            
    def launch_all(self):
        """Запуск всех сервисов"""
        self.launch_backend()
        self.launch_auth_bot()
        self.launch_frontend()
        self.launch_tunnel()
        
        messagebox.showinfo("🚀 Запуск", "Все сервисы запускаются в отдельных окнах!\n\nПодождите 10-15 секунд для полного запуска.")
        
    def test_api(self):
        """Тест API"""
        try:
            subprocess.Popen([sys.executable, "final_test.py"], shell=True)
            messagebox.showinfo("🧪 Тест", "Тест API запущен!\nСмотрите результат в консоли.")
        except Exception as e:
            messagebox.showerror("❌ Ошибка", f"Не удалось запустить тест:\n{e}")
            
    def open_folder(self):
        """Открыть папку проекта"""
        try:
            project_path = Path(__file__).parent
            subprocess.Popen(f'explorer "{project_path}"')
        except Exception as e:
            messagebox.showerror("❌ Ошибка", f"Не удалось открыть папку:\n{e}")
            
    def copy_ip_url(self):
        """Копирование IP URL"""
        ip_url = f"http://{self.local_ip}:3000"
        self.root.clipboard_clear()
        self.root.clipboard_append(ip_url)
        messagebox.showinfo("📋 Скопировано", f"IP URL скопирован:\n{ip_url}")
        
    def open_url(self, url):
        """Открытие URL в браузере"""
        import webbrowser
        webbrowser.open(url)

def main():
    """Главная функция"""
    root = tk.Tk()
    app = SimpleLauncher(root)
    
    root.mainloop()

if __name__ == "__main__":
    main() 