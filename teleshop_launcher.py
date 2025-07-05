#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 TeleShop Launcher
Графический интерфейс для управления всеми компонентами TeleShop
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import subprocess
import threading
import os
import signal
import sys
from datetime import datetime

class TeleShopLauncher:
    def __init__(self, root):
        self.root = root
        self.root.title("🚀 TeleShop Launcher")
        self.root.geometry("900x700")
        self.root.configure(bg="#2c3e50")
        
        # Процессы
        self.processes = {}
        self.ssh_key = "teleshop-deploy-key"
        self.server = "root@178.236.17.93"
        
        # Компоненты
        self.components = {
            "dashboard": {
                "name": "📊 Dashboard",
                "path": "/var/www/teleshop/01-user-dashboard",
                "cmd": "npm run dev",
                "port": "3000",
                "color": "#3498db"
            },
            "constructor": {
                "name": "🏗️ Constructor", 
                "path": "/var/www/teleshop/offconstryktor",
                "cmd": "npm run dev",
                "port": "3001",
                "color": "#e74c3c"
            },
            "backend": {
                "name": "🔧 Backend API",
                "path": "/var/www/teleshop/05-server-launchers/main", 
                "cmd": "source venv/bin/activate && python test_backend.py",
                "port": "8000",
                "color": "#2ecc71"
            },
            "auth_bot": {
                "name": "🤖 Auth Bot",
                "path": "/var/www/teleshop/05-server-launchers/bots",
                "cmd": "python3 auth_bot_modern.py", 
                "port": "Bot",
                "color": "#f39c12"
            }
        }
        
        self.setup_ui()
        
    def setup_ui(self):
        # Заголовок
        title_frame = tk.Frame(self.root, bg="#2c3e50")
        title_frame.pack(fill=tk.X, padx=10, pady=10)
        
        title_label = tk.Label(
            title_frame,
            text="🚀 TeleShop Launcher",
            font=("Arial", 24, "bold"),
            bg="#2c3e50",
            fg="#ecf0f1"
        )
        title_label.pack()
        
        subtitle_label = tk.Label(
            title_frame,
            text="Управление всеми компонентами TeleShop",
            font=("Arial", 12),
            bg="#2c3e50", 
            fg="#bdc3c7"
        )
        subtitle_label.pack()
        
        # Основной контейнер
        main_frame = tk.Frame(self.root, bg="#2c3e50")
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Левая панель - кнопки управления
        left_frame = tk.Frame(main_frame, bg="#34495e", relief=tk.RAISED, bd=2)
        left_frame.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 10))
        
        # Общие кнопки
        general_label = tk.Label(
            left_frame,
            text="🎮 Общее управление",
            font=("Arial", 14, "bold"),
            bg="#34495e",
            fg="#ecf0f1"
        )
        general_label.pack(pady=10)
        
        self.start_all_btn = tk.Button(
            left_frame,
            text="▶️ Запустить ВСЕ",
            font=("Arial", 12, "bold"),
            bg="#27ae60",
            fg="white",
            relief=tk.FLAT,
            command=self.start_all,
            width=20
        )
        self.start_all_btn.pack(pady=5, padx=10)
        
        self.stop_all_btn = tk.Button(
            left_frame,
            text="⏹️ Остановить ВСЕ", 
            font=("Arial", 12, "bold"),
            bg="#e74c3c",
            fg="white",
            relief=tk.FLAT,
            command=self.stop_all,
            width=20
        )
        self.stop_all_btn.pack(pady=5, padx=10)
        
        self.clear_ports_btn = tk.Button(
            left_frame,
            text="🧹 Очистить порты",
            font=("Arial", 12, "bold"),
            bg="#f39c12",
            fg="white",
            relief=tk.FLAT,
            command=self.clear_ports,
            width=20
        )
        self.clear_ports_btn.pack(pady=5, padx=10)
        
        # Разделитель
        separator = tk.Frame(left_frame, height=2, bg="#7f8c8d")
        separator.pack(fill=tk.X, pady=10, padx=10)
        
        # Кнопки компонентов
        components_label = tk.Label(
            left_frame,
            text="🔧 Компоненты",
            font=("Arial", 14, "bold"),
            bg="#34495e",
            fg="#ecf0f1"
        )
        components_label.pack(pady=(10, 5))
        
        self.component_buttons = {}
        self.status_labels = {}
        
        for comp_id, comp_info in self.components.items():
            # Фрейм для компонента
            comp_frame = tk.Frame(left_frame, bg="#34495e")
            comp_frame.pack(fill=tk.X, padx=10, pady=5)
            
            # Кнопка запуска
            btn = tk.Button(
                comp_frame,
                text=f"▶️ {comp_info['name']}",
                font=("Arial", 10),
                bg=comp_info['color'],
                fg="white",
                relief=tk.FLAT,
                command=lambda cid=comp_id: self.toggle_component(cid),
                width=18
            )
            btn.pack(fill=tk.X)
            self.component_buttons[comp_id] = btn
            
            # Статус
            status_label = tk.Label(
                comp_frame,
                text=f"💤 Остановлен (:{comp_info['port']})",
                font=("Arial", 8),
                bg="#34495e",
                fg="#95a5a6"
            )
            status_label.pack()
            self.status_labels[comp_id] = status_label
            
        # Правая панель - логи
        right_frame = tk.Frame(main_frame, bg="#2c3e50")
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        logs_label = tk.Label(
            right_frame,
            text="📋 Логи процессов",
            font=("Arial", 14, "bold"),
            bg="#2c3e50",
            fg="#ecf0f1"
        )
        logs_label.pack(pady=(0, 10))
        
        # Область логов
        self.log_text = scrolledtext.ScrolledText(
            right_frame,
            font=("Consolas", 10),
            bg="#1c1c1c",
            fg="#00ff00",
            insertbackground="#00ff00",
            wrap=tk.WORD
        )
        self.log_text.pack(fill=tk.BOTH, expand=True)
        
        # Кнопка очистки логов
        clear_btn = tk.Button(
            right_frame,
            text="🗑️ Очистить логи",
            font=("Arial", 10),
            bg="#95a5a6",
            fg="white",
            relief=tk.FLAT,
            command=self.clear_logs
        )
        clear_btn.pack(pady=(10, 0))
        
        # Статус бар
        self.status_bar = tk.Label(
            self.root,
            text="🔴 Все компоненты остановлены",
            font=("Arial", 10),
            bg="#34495e",
            fg="#ecf0f1",
            relief=tk.SUNKEN,
            anchor=tk.W
        )
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)
        
        self.log("🚀 TeleShop Launcher запущен!")
        self.log("💡 Используйте кнопки для управления компонентами")
        
    def log(self, message):
        """Добавить сообщение в логи"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.log_text.see(tk.END)
        self.root.update()
        
    def clear_logs(self):
        """Очистить логи"""
        self.log_text.delete(1.0, tk.END)
        self.log("📋 Логи очищены")
        
    def run_ssh_command(self, component_id, command):
        """Запустить SSH команду"""
        try:
            full_command = f'ssh -i {self.ssh_key} {self.server} "{command}"'
            self.log(f"🔧 Выполняю: {full_command}")
            
            process = subprocess.Popen(
                full_command,
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                universal_newlines=True,
                bufsize=1
            )
            
            self.processes[component_id] = process
            
            # Читаем вывод в отдельном потоке
            def read_output():
                try:
                    for line in iter(process.stdout.readline, ''):
                        if line:
                            self.log(f"[{self.components[component_id]['name']}] {line.rstrip()}")
                    process.wait()
                except Exception as e:
                    self.log(f"❌ Ошибка чтения вывода: {str(e)}")
                finally:
                    if component_id in self.processes:
                        del self.processes[component_id]
                    self.update_component_status(component_id, False)
                    
            threading.Thread(target=read_output, daemon=True).start()
            
            return True
            
        except Exception as e:
            self.log(f"❌ Ошибка запуска {component_id}: {str(e)}")
            return False
            
    def toggle_component(self, component_id):
        """Переключить состояние компонента"""
        if component_id in self.processes:
            self.stop_component(component_id)
        else:
            self.start_component(component_id)
            
    def start_component(self, component_id):
        """Запустить компонент"""
        comp_info = self.components[component_id]
        self.log(f"🚀 Запускаю {comp_info['name']}...")
        
        command = f"cd {comp_info['path']} && {comp_info['cmd']}"
        
        if self.run_ssh_command(component_id, command):
            self.update_component_status(component_id, True)
            self.log(f"✅ {comp_info['name']} запущен")
        else:
            self.log(f"❌ Не удалось запустить {comp_info['name']}")
            
    def stop_component(self, component_id):
        """Остановить компонент"""
        comp_info = self.components[component_id]
        self.log(f"⏹️ Останавливаю {comp_info['name']}...")
        
        if component_id in self.processes:
            try:
                self.processes[component_id].terminate()
                del self.processes[component_id]
            except:
                pass
                
        # Убиваем процессы на сервере
        if comp_info['cmd'].startswith('npm'):
            kill_cmd = f"pkill -f 'npm run dev' || pkill -f 'next'"
        else:
            kill_cmd = f"pkill -f '{comp_info['cmd']}'"
            
        subprocess.run(f'ssh -i {self.ssh_key} {self.server} "{kill_cmd}"', shell=True)
        
        self.update_component_status(component_id, False)
        self.log(f"⏹️ {comp_info['name']} остановлен")
        
    def update_component_status(self, component_id, is_running):
        """Обновить статус компонента"""
        comp_info = self.components[component_id]
        btn = self.component_buttons[component_id]
        label = self.status_labels[component_id]
        
        if is_running:
            btn.config(text=f"⏹️ {comp_info['name']}", bg="#e74c3c")
            label.config(text=f"🟢 Работает (:{comp_info['port']})", fg="#2ecc71")
        else:
            btn.config(text=f"▶️ {comp_info['name']}", bg=comp_info['color'])
            label.config(text=f"💤 Остановлен (:{comp_info['port']})", fg="#95a5a6")
            
        self.update_status_bar()
        
    def update_status_bar(self):
        """Обновить статус бар"""
        running_count = len(self.processes)
        total_count = len(self.components)
        
        if running_count == 0:
            self.status_bar.config(text="🔴 Все компоненты остановлены", fg="#e74c3c")
        elif running_count == total_count:
            self.status_bar.config(text="🟢 Все компоненты запущены", fg="#2ecc71")
        else:
            self.status_bar.config(text=f"🟡 Запущено {running_count}/{total_count} компонентов", fg="#f39c12")
            
    def start_all(self):
        """Запустить все компоненты"""
        self.log("🚀 Запускаю ВСЕ компоненты...")
        for component_id in self.components:
            if component_id not in self.processes:
                self.start_component(component_id)
                
    def stop_all(self):
        """Остановить все компоненты"""
        self.log("⏹️ Останавливаю ВСЕ компоненты...")
        
        # Остановим все процессы на сервере
        kill_all_cmd = "pkill -f npm; pkill -f node; pkill -f python3; pkill -f next"
        subprocess.run(f'ssh -i {self.ssh_key} {self.server} "{kill_all_cmd}"', shell=True)
        
        # Остановим локальные процессы
        for component_id in list(self.processes.keys()):
            self.stop_component(component_id)
            
        self.log("⏹️ Все компоненты остановлены")
        
    def clear_ports(self):
        """Очистить все занятые порты"""
        self.log("🧹 Начинаю очистку портов...")
        
        try:
            # Остановим все наши процессы сначала
            self.stop_all()
            
            # Команды для очистки портов
            clear_commands = [
                "pkill -f npm || true",
                "pkill -f node || true", 
                "pkill -f python3 || true",
                "pkill -f next || true",
                "pkill -f uvicorn || true"
            ]
            
            for cmd in clear_commands:
                full_command = f'ssh -i {self.ssh_key} {self.server} "{cmd}"'
                self.log(f"🔧 Выполняю: {cmd}")
                result = subprocess.run(full_command, shell=True, capture_output=True, text=True)
                
            # Убиваем процессы по портам
            port_commands = [
                "lsof -ti:3000 | xargs -r kill -9 || true",
                "lsof -ti:3001 | xargs -r kill -9 || true", 
                "lsof -ti:8000 | xargs -r kill -9 || true"
            ]
            
            for cmd in port_commands:
                full_command = f'ssh -i {self.ssh_key} {self.server} "{cmd}"'
                self.log(f"🔧 Освобождаю порт: {cmd}")
                result = subprocess.run(full_command, shell=True, capture_output=True, text=True)
                
            # Проверяем результат
            check_cmd = f'ssh -i {self.ssh_key} {self.server} "netstat -tlnp | grep -E \':(3000|3001|8000)\'"'
            result = subprocess.run(check_cmd, shell=True, capture_output=True, text=True)
            
            if result.returncode != 0 or not result.stdout.strip():
                self.log("✅ Все порты успешно очищены!")
                self.log("🟢 Порты 3000, 3001, 8000 свободны")
                self.status_bar.config(text="🧹 Порты очищены - готов к запуску", fg="#2ecc71")
            else:
                self.log("⚠️ Некоторые порты могут быть еще заняты")
                self.log(f"📋 Активные порты: {result.stdout.strip()}")
                
        except Exception as e:
            self.log(f"❌ Ошибка очистки портов: {str(e)}")
            
        self.log("🧹 Очистка портов завершена")
        
    def on_closing(self):
        """Обработка закрытия окна"""
        if messagebox.askokcancel("Выход", "Остановить все процессы и выйти?"):
            self.stop_all()
            self.root.destroy()

def main():
    # Проверка SSH ключа
    if not os.path.exists("teleshop-deploy-key"):
        messagebox.showerror(
            "Ошибка", 
            "SSH ключ 'teleshop-deploy-key' не найден!\n\n"
            "Убедитесь, что лаунчер запущен из папки:\n"
            "C:\\Users\\GTX\\Desktop\\sitetest"
        )
        return
        
    root = tk.Tk()
    launcher = TeleShopLauncher(root)
    
    # Обработка закрытия
    root.protocol("WM_DELETE_WINDOW", launcher.on_closing)
    
    try:
        root.mainloop()
    except KeyboardInterrupt:
        launcher.stop_all()

if __name__ == "__main__":
    main() 