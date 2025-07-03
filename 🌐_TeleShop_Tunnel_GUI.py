#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🌐 TeleShop Tunnel Manager GUI
Графический интерфейс для управления туннелями LocalTunnel
"""

import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import subprocess
import threading
import time
import re
import os
import json
from datetime import datetime
import pyperclip

class TeleShopTunnelGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("🌐 TeleShop Tunnel Manager")
        self.root.geometry("800x600")
        self.root.configure(bg='#1a1a2e')
        
        # Состояние
        self.tunnel_process = None
        self.tunnel_url = None
        self.components_status = {
            'tunnel': False,
            'auth_bot': False,
            'backend': False,
            'frontend': False
        }
        
        self.setup_ui()
        
    def setup_ui(self):
        # Главный фрейм
        main_frame = tk.Frame(self.root, bg='#1a1a2e')
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Заголовок
        title_label = tk.Label(
            main_frame, 
            text="🌐 TeleShop Tunnel Manager",
            font=('Arial', 20, 'bold'),
            fg='#4CAF50',
            bg='#1a1a2e'
        )
        title_label.pack(pady=(0, 20))
        
        # Фрейм туннеля
        tunnel_frame = tk.LabelFrame(
            main_frame,
            text="🚀 Управление туннелем",
            font=('Arial', 12, 'bold'),
            fg='#ffffff',
            bg='#16213e',
            padx=15,
            pady=15
        )
        tunnel_frame.pack(fill=tk.X, pady=(0, 20))
        
        # Кнопка создания туннеля
        self.tunnel_btn = tk.Button(
            tunnel_frame,
            text="🌐 Создать туннель",
            command=self.create_tunnel,
            bg='#4CAF50',
            fg='white',
            font=('Arial', 12, 'bold'),
            padx=20,
            pady=10,
            relief=tk.FLAT,
            cursor='hand2'
        )
        self.tunnel_btn.pack(pady=(0, 10))
        
        # URL отображение
        url_frame = tk.Frame(tunnel_frame, bg='#16213e')
        url_frame.pack(fill=tk.X, pady=(10, 0))
        
        tk.Label(
            url_frame,
            text="📋 Публичный URL:",
            font=('Arial', 10),
            fg='#ffffff',
            bg='#16213e'
        ).pack(anchor=tk.W)
        
        self.url_var = tk.StringVar(value="Туннель не создан")
        self.url_entry = tk.Entry(
            url_frame,
            textvariable=self.url_var,
            font=('Arial', 11),
            state='readonly',
            width=60,
            bg='#2a2a3e',
            fg='#4CAF50',
            insertbackground='#4CAF50'
        )
        self.url_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, pady=(5, 0))
        
        self.copy_btn = tk.Button(
            url_frame,
            text="📋",
            command=self.copy_url,
            bg='#2196F3',
            fg='white',
            font=('Arial', 10),
            padx=10,
            relief=tk.FLAT,
            cursor='hand2',
            state='disabled'
        )
        self.copy_btn.pack(side=tk.RIGHT, padx=(10, 0), pady=(5, 0))
        
        # Фрейм компонентов
        components_frame = tk.LabelFrame(
            main_frame,
            text="🔧 Компоненты системы",
            font=('Arial', 12, 'bold'),
            fg='#ffffff',
            bg='#16213e',
            padx=15,
            pady=15
        )
        components_frame.pack(fill=tk.X, pady=(0, 20))
        
        # Кнопки компонентов
        buttons_frame = tk.Frame(components_frame, bg='#16213e')
        buttons_frame.pack(fill=tk.X)
        
        self.auth_btn = tk.Button(
            buttons_frame,
            text="🤖 Auth Bot",
            command=self.start_auth_bot,
            bg='#FF9800',
            fg='white',
            font=('Arial', 10, 'bold'),
            padx=15,
            pady=8,
            relief=tk.FLAT,
            cursor='hand2'
        )
        self.auth_btn.pack(side=tk.LEFT, padx=(0, 10))
        
        self.backend_btn = tk.Button(
            buttons_frame,
            text="🔧 Backend API",
            command=self.start_backend,
            bg='#9C27B0',
            fg='white',
            font=('Arial', 10, 'bold'),
            padx=15,
            pady=8,
            relief=tk.FLAT,
            cursor='hand2'
        )
        self.backend_btn.pack(side=tk.LEFT, padx=(0, 10))
        
        self.frontend_btn = tk.Button(
            buttons_frame,
            text="🌐 Frontend",
            command=self.start_frontend,
            bg='#2196F3',
            fg='white',
            font=('Arial', 10, 'bold'),
            padx=15,
            pady=8,
            relief=tk.FLAT,
            cursor='hand2'
        )
        self.frontend_btn.pack(side=tk.LEFT, padx=(0, 10))
        
        # Автозапуск
        self.auto_btn = tk.Button(
            buttons_frame,
            text="🚀 Запустить всё",
            command=self.start_all,
            bg='#4CAF50',
            fg='white',
            font=('Arial', 10, 'bold'),
            padx=20,
            pady=8,
            relief=tk.FLAT,
            cursor='hand2'
        )
        self.auto_btn.pack(side=tk.RIGHT)
        
        # Статус компонентов
        status_frame = tk.Frame(components_frame, bg='#16213e')
        status_frame.pack(fill=tk.X, pady=(15, 0))
        
        self.status_labels = {}
        for i, (key, name) in enumerate([
            ('tunnel', '🌐 Туннель'),
            ('auth_bot', '🤖 Auth Bot'),
            ('backend', '🔧 Backend'),
            ('frontend', '🌐 Frontend')
        ]):
            frame = tk.Frame(status_frame, bg='#16213e')
            frame.grid(row=0, column=i, padx=10, sticky='w')
            
            tk.Label(
                frame,
                text=name,
                font=('Arial', 9),
                fg='#ffffff',
                bg='#16213e'
            ).pack(anchor=tk.W)
            
            status_label = tk.Label(
                frame,
                text="⚫ Остановлен",
                font=('Arial', 9),
                fg='#f44336',
                bg='#16213e'
            )
            status_label.pack(anchor=tk.W)
            self.status_labels[key] = status_label
        
        # Лог
        log_frame = tk.LabelFrame(
            main_frame,
            text="📝 Логи",
            font=('Arial', 12, 'bold'),
            fg='#ffffff',
            bg='#16213e',
            padx=15,
            pady=15
        )
        log_frame.pack(fill=tk.BOTH, expand=True)
        
        self.log_text = scrolledtext.ScrolledText(
            log_frame,
            height=10,
            bg='#1e1e1e',
            fg='#ffffff',
            font=('Consolas', 9),
            insertbackground='#4CAF50'
        )
        self.log_text.pack(fill=tk.BOTH, expand=True)
        
        # Очистка логов
        clear_btn = tk.Button(
            log_frame,
            text="🗑️ Очистить логи",
            command=self.clear_logs,
            bg='#f44336',
            fg='white',
            font=('Arial', 9),
            padx=10,
            pady=5,
            relief=tk.FLAT,
            cursor='hand2'
        )
        clear_btn.pack(pady=(10, 0))
        
        # Начальное сообщение
        self.log("🎉 TeleShop Tunnel Manager запущен!")
        self.log("👉 Нажмите '🌐 Создать туннель' для начала работы")
    
    def log(self, message):
        """Добавить сообщение в лог"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.log_text.see(tk.END)
        self.root.update()
    
    def clear_logs(self):
        """Очистить логи"""
        self.log_text.delete(1.0, tk.END)
    
    def update_status(self, component, status):
        """Обновить статус компонента"""
        self.components_status[component] = status
        label = self.status_labels[component]
        
        if status:
            label.config(text="🟢 Запущен", fg='#4CAF50')
        else:
            label.config(text="⚫ Остановлен", fg='#f44336')
    
    def create_tunnel(self):
        """Создать туннель LocalTunnel"""
        if self.tunnel_process:
            self.log("⚠️ Туннель уже запущен!")
            return
        
        self.log("🌐 Создание туннеля LocalTunnel...")
        self.tunnel_btn.config(text="⏳ Создание...", state='disabled')
        
        def tunnel_thread():
            try:
                # Запускаем туннель
                self.tunnel_process = subprocess.Popen(
                    ['npx', 'localtunnel', '--port', '3000'],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    cwd=os.getcwd()
                )
                
                # Ждем URL
                while True:
                    line = self.tunnel_process.stdout.readline()
                    if not line:
                        break
                    
                    # Ищем URL
                    match = re.search(r'your url is: (https://[^\s]+)', line)
                    if match:
                        self.tunnel_url = match.group(1)
                        self.root.after(0, self.tunnel_created)
                        break
                        
            except Exception as e:
                self.root.after(0, lambda: self.tunnel_error(str(e)))
        
        threading.Thread(target=tunnel_thread, daemon=True).start()
    
    def tunnel_created(self):
        """Туннель создан успешно"""
        self.log(f"✅ Туннель создан: {self.tunnel_url}")
        self.url_var.set(self.tunnel_url)
        self.copy_btn.config(state='normal')
        self.tunnel_btn.config(text="🟢 Туннель активен", bg='#4CAF50')
        self.update_status('tunnel', True)
        
        # Создаем .env.local файл
        self.create_env_file()
        
    def tunnel_error(self, error):
        """Ошибка создания туннеля"""
        self.log(f"❌ Ошибка создания туннеля: {error}")
        self.tunnel_btn.config(text="🌐 Создать туннель", state='normal')
        self.tunnel_process = None
    
    def create_env_file(self):
        """Создать .env.local файл с туннельным URL"""
        try:
            env_path = os.path.join("01-user-dashboard", ".env.local")
            with open(env_path, 'w', encoding='utf-8') as f:
                f.write("# Auto-generated by TeleShop Tunnel Manager\n")
                f.write(f"NEXT_PUBLIC_TUNNEL_URL={self.tunnel_url}\n")
            
            self.log(f"⚙️ Конфигурация обновлена: {env_path}")
        except Exception as e:
            self.log(f"⚠️ Ошибка создания .env.local: {e}")
    
    def copy_url(self):
        """Скопировать URL в буфер обмена"""
        if self.tunnel_url:
            pyperclip.copy(self.tunnel_url)
            self.log("📋 URL скопирован в буфер обмена!")
            messagebox.showinfo("Успех", "URL скопирован в буфер обмена!")
    
    def start_auth_bot(self):
        """Запустить Auth Bot"""
        self.log("🤖 Запуск Auth Bot...")
        try:
            subprocess.Popen(
                ['python', 'simple_auth_bot.py'],
                cwd=os.path.join(os.getcwd(), 'auth-bot'),
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.update_status('auth_bot', True)
            self.log("✅ Auth Bot запущен в новом окне")
        except Exception as e:
            self.log(f"❌ Ошибка запуска Auth Bot: {e}")
    
    def start_backend(self):
        """Запустить Backend API"""
        self.log("🔧 Запуск Backend API...")
        try:
            subprocess.Popen(
                ['python', 'main_secure_fixed.py'],
                cwd=os.path.join(os.getcwd(), '05-server-launchers', 'main'),
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.update_status('backend', True)
            self.log("✅ Backend API запущен в новом окне")
        except Exception as e:
            self.log(f"❌ Ошибка запуска Backend API: {e}")
    
    def start_frontend(self):
        """Запустить Frontend"""
        self.log("🌐 Запуск Frontend...")
        try:
            subprocess.Popen(
                ['npm', 'run', 'dev'],
                cwd=os.path.join(os.getcwd(), '01-user-dashboard'),
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.update_status('frontend', True)
            self.log("✅ Frontend запущен в новом окне")
        except Exception as e:
            self.log(f"❌ Ошибка запуска Frontend: {e}")
    
    def start_all(self):
        """Запустить все компоненты"""
        self.log("🚀 Запуск всех компонентов...")
        
        if not self.tunnel_url:
            self.log("⚠️ Сначала создайте туннель!")
            return
        
        # Запускаем с задержками
        self.start_auth_bot()
        self.root.after(3000, self.start_backend)
        self.root.after(6000, self.start_frontend)
        
        self.log("✅ Все компоненты запускаются...")

def main():
    try:
        import pyperclip
    except ImportError:
        print("Установка pyperclip...")
        subprocess.check_call(['pip', 'install', 'pyperclip'])
        import pyperclip
    
    root = tk.Tk()
    app = TeleShopTunnelGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main() 