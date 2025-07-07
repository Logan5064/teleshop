#!/usr/bin/env python3
"""
🚀 TeleShop Launcher GUI
Графический интерфейс для запуска всех компонентов системы
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import subprocess
import threading
import os
import sys
import time
import requests
from pathlib import Path

class TeleShopLauncher:
    def __init__(self, root):
        self.root = root
        self.root.title("🚀 TeleShop Constructor Launcher")
        self.root.geometry("800x600")
        self.root.resizable(True, True)
        
        # Процессы
        self.processes = {
            'frontend': None,
            'backend': None,
            'auth_bot': None
        }
        
        # Статусы
        self.statuses = {
            'frontend': tk.StringVar(value="🔴 Остановлен"),
            'backend': tk.StringVar(value="🔴 Остановлен"),
            'auth_bot': tk.StringVar(value="🔴 Остановлен")
        }
        
        self.setup_ui()
        self.check_statuses()
        
    def setup_ui(self):
        """Создание интерфейса"""
        # Заголовок
        title_frame = tk.Frame(self.root)
        title_frame.pack(pady=10)
        
        title = tk.Label(title_frame, text="🚀 TeleShop Constructor Launcher", 
                        font=("Arial", 16, "bold"))
        title.pack()
        
        subtitle = tk.Label(title_frame, text="Управление всеми компонентами системы", 
                           font=("Arial", 10))
        subtitle.pack()
        
        # Основная область
        main_frame = tk.Frame(self.root)
        main_frame.pack(expand=True, fill='both', padx=20, pady=10)
        
        # Фронтенд
        self.create_service_frame(main_frame, "Frontend (Next.js)", 'frontend', 0)
        
        # Бэкенд
        self.create_service_frame(main_frame, "Backend API + BotManager", 'backend', 1)
        
        # Бот авторизации
        self.create_service_frame(main_frame, "Auth Bot", 'auth_bot', 2)
        
        # Кнопки управления всеми
        control_frame = tk.Frame(main_frame)
        control_frame.grid(row=3, column=0, columnspan=3, pady=20)
        
        start_all_btn = tk.Button(control_frame, text="🚀 Запустить всё", 
                                 command=self.start_all, bg="#4CAF50", fg="white",
                                 font=("Arial", 12, "bold"), padx=20)
        start_all_btn.pack(side='left', padx=10)
        
        stop_all_btn = tk.Button(control_frame, text="🛑 Остановить всё", 
                                command=self.stop_all, bg="#f44336", fg="white",
                                font=("Arial", 12, "bold"), padx=20)
        stop_all_btn.pack(side='left', padx=10)
        
        # Лог
        log_frame = tk.LabelFrame(main_frame, text="📋 Логи системы", font=("Arial", 10, "bold"))
        log_frame.grid(row=4, column=0, columnspan=3, sticky='ew', pady=(20, 0))
        
        self.log_text = scrolledtext.ScrolledText(log_frame, height=8, width=90)
        self.log_text.pack(expand=True, fill='both', padx=10, pady=10)
        
        # Статус бар
        status_frame = tk.Frame(self.root)
        status_frame.pack(side='bottom', fill='x')
        
        self.status_bar = tk.Label(status_frame, text="Готов к запуску", 
                                  relief='sunken', anchor='w')
        self.status_bar.pack(side='bottom', fill='x')
        
        # Настраиваем колонки
        main_frame.grid_columnconfigure(0, weight=1)
        main_frame.grid_columnconfigure(1, weight=1)
        main_frame.grid_columnconfigure(2, weight=1)
    
    def create_service_frame(self, parent, title, service_key, row):
        """Создание фрейма для сервиса"""
        frame = tk.LabelFrame(parent, text=title, font=("Arial", 10, "bold"))
        frame.grid(row=row, column=0, columnspan=3, sticky='ew', pady=5)
        
        # Статус
        status_label = tk.Label(frame, textvariable=self.statuses[service_key], 
                               font=("Arial", 11))
        status_label.pack(pady=5)
        
        # Кнопки
        button_frame = tk.Frame(frame)
        button_frame.pack(pady=5)
        
        start_btn = tk.Button(button_frame, text="▶️ Запустить", 
                             command=lambda: self.start_service(service_key),
                             bg="#4CAF50", fg="white", padx=10)
        start_btn.pack(side='left', padx=5)
        
        stop_btn = tk.Button(button_frame, text="⏹️ Остановить", 
                            command=lambda: self.stop_service(service_key),
                            bg="#f44336", fg="white", padx=10)
        stop_btn.pack(side='left', padx=5)
        
        if service_key == 'frontend':
            open_btn = tk.Button(button_frame, text="🌐 Открыть", 
                                command=lambda: self.open_url("http://localhost:3000"),
                                bg="#2196F3", fg="white", padx=10)
            open_btn.pack(side='left', padx=5)
        elif service_key == 'backend':
            open_btn = tk.Button(button_frame, text="📖 API Docs", 
                                command=lambda: self.open_url("http://localhost:8000/secure/docs"),
                                bg="#2196F3", fg="white", padx=10)
            open_btn.pack(side='left', padx=5)
    
    def log(self, message):
        """Добавление сообщения в лог"""
        timestamp = time.strftime("%H:%M:%S")
        log_message = f"[{timestamp}] {message}\n"
        
        self.log_text.insert(tk.END, log_message)
        self.log_text.see(tk.END)
        self.root.update()
    
    def start_service(self, service):
        """Запуск сервиса"""
        if self.processes[service] and self.processes[service].poll() is None:
            self.log(f"⚠️ {service} уже запущен")
            return
        
        self.log(f"🚀 Запуск {service}...")
        self.status_bar.config(text=f"Запуск {service}...")
        
        try:
            if service == 'frontend':
                self.processes[service] = subprocess.Popen(
                    ['npm.cmd', 'run', 'dev'],
                    cwd='01-user-dashboard',
                    creationflags=subprocess.CREATE_NEW_CONSOLE if os.name == 'nt' else 0
                )
            elif service == 'backend':
                self.processes[service] = subprocess.Popen(
                    ['python', 'api_server.py'],
                    cwd='05-server-launchers/main',
                    creationflags=subprocess.CREATE_NEW_CONSOLE if os.name == 'nt' else 0
                )
            elif service == 'auth_bot':
                self.processes[service] = subprocess.Popen(
                    ['python', 'auth_bot.py'],
                    cwd='05-server-launchers/bots',
                    creationflags=subprocess.CREATE_NEW_CONSOLE if os.name == 'nt' else 0
                )
            
            self.log(f"✅ {service} запущен (PID: {self.processes[service].pid})")
            
            # Проверяем статус через несколько секунд
            threading.Timer(3.0, lambda: self.check_service_status(service)).start()
            
        except Exception as e:
            self.log(f"❌ Ошибка запуска {service}: {e}")
            messagebox.showerror("Ошибка", f"Не удалось запустить {service}:\n{e}")
    
    def stop_service(self, service):
        """Остановка сервиса"""
        if not self.processes[service] or self.processes[service].poll() is not None:
            self.log(f"⚠️ {service} не запущен")
            return
        
        self.log(f"🛑 Остановка {service}...")
        
        try:
            self.processes[service].terminate()
            self.processes[service].wait(timeout=5)
            self.log(f"✅ {service} остановлен")
            self.statuses[service].set("🔴 Остановлен")
        except subprocess.TimeoutExpired:
            self.processes[service].kill()
            self.log(f"🔥 {service} принудительно завершен")
            self.statuses[service].set("🔴 Остановлен")
        except Exception as e:
            self.log(f"❌ Ошибка остановки {service}: {e}")
    
    def start_all(self):
        """Запуск всех сервисов"""
        self.log("🚀 Запуск всех сервисов...")
        self.start_service('backend')
        time.sleep(2)
        self.start_service('auth_bot')
        time.sleep(1)
        self.start_service('frontend')
    
    def stop_all(self):
        """Остановка всех сервисов"""
        self.log("🛑 Остановка всех сервисов...")
        for service in ['frontend', 'backend', 'auth_bot']:
            self.stop_service(service)
    
    def check_service_status(self, service):
        """Проверка статуса сервиса"""
        try:
            if service == 'frontend':
                response = requests.get("http://localhost:3000", timeout=2)
                if response.status_code == 200:
                    self.statuses[service].set("🟢 Работает (Port 3000)")
                else:
                    self.statuses[service].set("🟡 Запускается...")
            elif service == 'backend':
                response = requests.get("http://localhost:8000/health", timeout=2)
                if response.status_code == 200:
                    self.statuses[service].set("🟢 Работает (Port 8000)")
                else:
                    self.statuses[service].set("🟡 Запускается...")
            elif service == 'auth_bot':
                # Для бота просто проверяем что процесс жив
                if self.processes[service] and self.processes[service].poll() is None:
                    self.statuses[service].set("🟢 Работает")
                else:
                    self.statuses[service].set("🔴 Остановлен")
        except:
            if self.processes[service] and self.processes[service].poll() is None:
                self.statuses[service].set("🟡 Запускается...")
            else:
                self.statuses[service].set("🔴 Остановлен")
    
    def check_statuses(self):
        """Периодическая проверка статусов"""
        for service in ['frontend', 'backend', 'auth_bot']:
            self.check_service_status(service)
        
        # Проверяем каждые 10 секунд
        threading.Timer(10.0, self.check_statuses).start()
    
    def open_url(self, url):
        """Открытие URL в браузере"""
        import webbrowser
        webbrowser.open(url)
    
    def on_closing(self):
        """Обработка закрытия окна"""
        if messagebox.askokcancel("Выход", "Остановить все сервисы и выйти?"):
            self.stop_all()
            time.sleep(1)
            self.root.destroy()

def main():
    root = tk.Tk()
    app = TeleShopLauncher(root)
    
    # Обработка закрытия окна
    root.protocol("WM_DELETE_WINDOW", app.on_closing)
    
    root.mainloop()

if __name__ == "__main__":
    main() 