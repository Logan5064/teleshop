import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import subprocess
import threading
import re
import os
import sys
from datetime import datetime

class AdvancedTeleShopGUI:
    def __init__(self, root):
        self.root = root
        self.root.title('TeleShop Advanced Manager v2.0')
        self.root.geometry('950x750')
        self.root.configure(bg='#2d2d30')
        
        # Переменные для отслеживания состояния
        self.processes = {}
        self.tunnel_url = None
        self.tunnel_process = None
        
        self.setup_ui()
        self.log("🚀 TeleShop Advanced Manager v2.0 запущен!")
        self.log(f"📁 Рабочая папка: {os.getcwd()}")
        self.log(f"🐍 Python: {sys.version.split()[0]}")
        
    def setup_ui(self):
        # Главный фрейм
        main_frame = tk.Frame(self.root, bg='#2d2d30')
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Заголовок
        title_label = tk.Label(
            main_frame, 
            text='🚀 TeleShop Advanced Manager v2.0', 
            font=('Arial', 18, 'bold'),
            fg='#4CAF50', 
            bg='#2d2d30'
        )
        title_label.pack(pady=(0, 20))
        
        # Фрейм для статуса и URL
        status_frame = tk.LabelFrame(
            main_frame, 
            text="📊 Статус системы", 
            font=('Arial', 12, 'bold'),
            fg='white', 
            bg='#2d2d30'
        )
        status_frame.pack(fill=tk.X, pady=(0, 10))
        
        # URL туннеля
        url_frame = tk.Frame(status_frame, bg='#2d2d30')
        url_frame.pack(fill=tk.X, padx=10, pady=5)
        
        tk.Label(url_frame, text='🌐 Публичный URL:', 
                font=('Arial', 10, 'bold'), fg='#2196F3', bg='#2d2d30').pack(side=tk.LEFT)
        
        self.url_var = tk.StringVar(value="Туннель не создан")
        self.url_entry = tk.Entry(
            url_frame, 
            textvariable=self.url_var, 
            font=('Arial', 10),
            state='readonly', 
            bg='#3c3c3c', 
            fg='#4CAF50',
            width=60
        )
        self.url_entry.pack(side=tk.LEFT, padx=(10, 5), fill=tk.X, expand=True)
        
        self.copy_btn = tk.Button(
            url_frame, 
            text='📋 Копировать', 
            command=self.copy_url,
            bg='#2196F3', 
            fg='white', 
            state='disabled'
        )
        self.copy_btn.pack(side=tk.RIGHT, padx=(5, 0))
        
        # Конструктор URL
        constructor_frame = tk.Frame(status_frame, bg='#2d2d30')
        constructor_frame.pack(fill=tk.X, padx=10, pady=5)
        
        tk.Label(constructor_frame, text='🎨 URL Конструктора:', 
                font=('Arial', 10, 'bold'), fg='#FF9800', bg='#2d2d30').pack(side=tk.LEFT)
        
        self.constructor_url_var = tk.StringVar(value="localhost:3001")
        self.constructor_url_entry = tk.Entry(
            constructor_frame, 
            textvariable=self.constructor_url_var, 
            font=('Arial', 10),
            state='readonly', 
            bg='#3c3c3c', 
            fg='#FF9800',
            width=60
        )
        self.constructor_url_entry.pack(side=tk.LEFT, padx=(10, 5), fill=tk.X, expand=True)
        
        self.copy_constructor_btn = tk.Button(
            constructor_frame, 
            text='📋 Копировать', 
            command=self.copy_constructor_url,
            bg='#FF9800', 
            fg='white', 
            state='normal'
        )
        self.copy_constructor_btn.pack(side=tk.RIGHT, padx=(5, 0))
        
        # Статусы компонентов
        components_frame = tk.Frame(status_frame, bg='#2d2d30')
        components_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.status_labels = {}
        components = [
            ('🤖 Auth Bot', 'auth_bot'),
            ('⚙️ Backend API', 'backend'),
            ('🌐 Frontend', 'frontend'),
            ('🎨 Constructor', 'constructor'),
            ('🚀 Туннель', 'tunnel')
        ]
        
        for i, (text, key) in enumerate(components):
            frame = tk.Frame(components_frame, bg='#2d2d30')
            frame.pack(side=tk.LEFT, padx=(0, 15))
            
            tk.Label(frame, text=text, font=('Arial', 9), 
                    fg='white', bg='#2d2d30').pack()
            
            status_label = tk.Label(frame, text='⭕ Остановлен', 
                                  font=('Arial', 8), fg='#f44336', bg='#2d2d30')
            status_label.pack()
            self.status_labels[key] = status_label
        
        # Кнопки управления
        buttons_frame = tk.LabelFrame(
            main_frame, 
            text="🎮 Управление компонентами", 
            font=('Arial', 12, 'bold'),
            fg='white', 
            bg='#2d2d30'
        )
        buttons_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Ряд 1 - Основные компоненты
        row1 = tk.Frame(buttons_frame, bg='#2d2d30')
        row1.pack(fill=tk.X, padx=10, pady=5)
        
        tk.Button(row1, text='🤖 Auth Bot', command=self.start_auth_bot,
                bg='#FF9800', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=(0, 5))
        
        tk.Button(row1, text='⚙️ Backend API', command=self.start_backend,
                bg='#9C27B0', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        tk.Button(row1, text='🌐 Frontend', command=self.start_frontend,
                bg='#2196F3', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        # Ряд 2 - Конструктор и туннель
        row2 = tk.Frame(buttons_frame, bg='#2d2d30')
        row2.pack(fill=tk.X, padx=10, pady=5)
        
        tk.Button(row2, text='🎨 Constructor', command=self.start_constructor,
                bg='#FF5722', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=(0, 5))
        
        tk.Button(row2, text='🚀 Создать туннель', command=self.create_tunnel,
                bg='#4CAF50', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        tk.Button(row2, text='🌐 Открыть дашборд', command=self.open_dashboard,
                bg='#2196F3', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        # Ряд 3 - Утилиты
        row3 = tk.Frame(buttons_frame, bg='#2d2d30')
        row3.pack(fill=tk.X, padx=10, pady=5)
        
        tk.Button(row3, text='🔄 Обновить статус', command=self.refresh_status,
                bg='#607D8B', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=(0, 5))
        
        tk.Button(row3, text='🧹 Очистить логи', command=self.clear_logs,
                bg='#795548', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        tk.Button(row3, text='🗑️ Очистить кэш', command=self.clear_next_cache,
                bg='#FF5722', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        tk.Button(row3, text='🌍 Открыть конструктор', command=self.open_constructor,
                bg='#795548', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        tk.Button(row3, text='🚀 Запустить все', command=self.start_all_components,
                bg='#8BC34A', fg='white', font=('Arial', 10), width=15).pack(side=tk.LEFT, padx=5)
        
        # Логи
        logs_frame = tk.LabelFrame(
            main_frame, 
            text="📝 Логи системы", 
            font=('Arial', 12, 'bold'),
            fg='white', 
            bg='#2d2d30'
        )
        logs_frame.pack(fill=tk.BOTH, expand=True)
        
        self.log_text = scrolledtext.ScrolledText(
            logs_frame,
            height=20,
            bg='#1e1e1e',
            fg='#ffffff',
            font=('Consolas', 9),
            wrap=tk.WORD
        )
        self.log_text.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Автообновление статуса каждые 5 секунд - ОТКЛЮЧЕНО
        self.refresh_status()
    
    def log(self, message):
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.log_text.see(tk.END)
        print(f"[{timestamp}] {message}")  # Дублируем в консоль
    
    def clear_logs(self):
        self.log_text.delete(1.0, tk.END)
        self.log("🧹 Логи очищены")
    
    def copy_url(self):
        if self.tunnel_url:
            self.root.clipboard_clear()
            self.root.clipboard_append(self.tunnel_url)
            self.log(f"📋 URL скопирован: {self.tunnel_url}")
            messagebox.showinfo("✅ Успех", "URL скопирован в буфер обмена!")
    
    def copy_constructor_url(self):
        constructor_url = "http://localhost:3001"
        self.root.clipboard_clear()
        self.root.clipboard_append(constructor_url)
        self.log(f"📋 URL конструктора скопирован: {constructor_url}")
        messagebox.showinfo("✅ Успех", "URL конструктора скопирован!")
    
    def update_status(self, component, status, color='#4CAF50'):
        if component in self.status_labels:
            self.status_labels[component].config(text=status, fg=color)
    
    def refresh_status(self):
        """Обновляет статус всех компонентов"""
        try:
            # Auth Bot
            if self.is_process_running('auth-bot', 'simple_auth_bot.py'):
                self.update_status('auth_bot', '✅ Работает', '#4CAF50')
            else:
                self.update_status('auth_bot', '⭕ Остановлен', '#f44336')
            
            # Backend API
            if self.is_port_listening(8000):
                self.update_status('backend', '✅ Порт 8000', '#4CAF50')
            else:
                self.update_status('backend', '⭕ Остановлен', '#f44336')
            
            # Frontend
            if self.is_port_listening(3000):
                self.update_status('frontend', '✅ Порт 3000', '#4CAF50')
            else:
                self.update_status('frontend', '⭕ Остановлен', '#f44336')
            
            # Constructor
            if self.is_port_listening(3001):
                self.update_status('constructor', '✅ Порт 3001', '#4CAF50')
            else:
                self.update_status('constructor', '⭕ Остановлен', '#f44336')
            
            # Туннель
            if self.tunnel_process and self.tunnel_process.poll() is None:
                self.update_status('tunnel', '✅ Активен', '#4CAF50')
            else:
                self.update_status('tunnel', '⭕ Остановлен', '#f44336')
                
        except Exception as e:
            self.log(f"❌ Ошибка обновления статуса: {e}")
    
    def is_port_listening(self, port):
        try:
            result = subprocess.run(['netstat', '-an'], capture_output=True, text=True)
            return f":{port}" in result.stdout and "LISTENING" in result.stdout
        except:
            return False
    
    def is_process_running(self, cwd_contains, script_name):
        try:
            result = subprocess.run(['tasklist', '/V'], capture_output=True, text=True)
            return script_name in result.stdout
        except:
            return False
    
    def start_auth_bot(self):
        self.log("🤖 === ЗАПУСК AUTH BOT ===")
        if not os.path.exists('auth-bot/simple_auth_bot.py'):
            self.log("❌ Файл auth-bot/simple_auth_bot.py не найден!")
            return
        
        try:
            process = subprocess.Popen(
                ['python', 'simple_auth_bot.py'], 
                cwd='auth-bot',
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.processes['auth_bot'] = process
            self.log(f"✅ Auth Bot запущен (PID: {process.pid})")
            self.update_status('auth_bot', '✅ Работает', '#4CAF50')
        except Exception as e:
            self.log(f"❌ Ошибка запуска Auth Bot: {e}")
    
    def start_backend(self):
        self.log("⚙️ === ЗАПУСК BACKEND API ===")
        if not os.path.exists('05-server-launchers/main/main_secure_fixed.py'):
            self.log("❌ Файл main_secure_fixed.py не найден!")
            return
        
        try:
            process = subprocess.Popen(
                ['python', 'main_secure_fixed.py'],
                cwd='05-server-launchers/main',
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.processes['backend'] = process
            self.log(f"✅ Backend API запущен (PID: {process.pid})")
            self.update_status('backend', '✅ Порт 8000', '#4CAF50')
        except Exception as e:
            self.log(f"❌ Ошибка запуска Backend: {e}")
    
    def start_frontend(self):
        self.log("🌐 === ЗАПУСК FRONTEND ===")
        if not os.path.exists('01-user-dashboard/package.json'):
            self.log("❌ Файл package.json не найден!")
            return
        
        try:
            process = subprocess.Popen(
                ['npm', 'run', 'dev'],
                cwd='01-user-dashboard',
                creationflags=subprocess.CREATE_NEW_CONSOLE,
                shell=True
            )
            self.processes['frontend'] = process
            self.log(f"✅ Frontend запущен (PID: {process.pid})")
            self.update_status('frontend', '✅ Порт 3000', '#4CAF50')
        except Exception as e:
            self.log(f"❌ Ошибка запуска Frontend: {e}")
    
    def start_constructor(self):
        self.log("🎨 === ЗАПУСК CONSTRUCTOR ===")
        if not os.path.exists('offconstryktor/package.json'):
            self.log("❌ Файл offconstryktor/package.json не найден!")
            return
        
        try:
            process = subprocess.Popen(
                ['npm', 'run', 'dev'],
                cwd='offconstryktor',
                creationflags=subprocess.CREATE_NEW_CONSOLE,
                shell=True
            )
            self.processes['constructor'] = process
            self.log(f"✅ Constructor запущен (PID: {process.pid}) на порту 3001")
            self.update_status('constructor', '✅ Порт 3001', '#4CAF50')
        except Exception as e:
            self.log(f"❌ Ошибка запуска Constructor: {e}")
    
    def create_tunnel(self):
        if self.tunnel_process and self.tunnel_process.poll() is None:
            self.log("⚠️ Туннель уже запущен!")
            return
        
        self.log("🚀 === СОЗДАНИЕ ТУННЕЛЯ ДЛЯ ПОРТА 3000 ===")
        self.update_status('tunnel', '🔄 Создание...', '#FF9800')
        
        def tunnel_thread():
            try:
                self.tunnel_process = subprocess.Popen(
                    ['npx', 'localtunnel', '--port', '3000'],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    shell=True
                )
                
                # Читаем вывод туннеля
                while True:
                    line = self.tunnel_process.stdout.readline()
                    if not line:
                        break
                    
                    self.root.after(0, lambda l=line: self.log(f"📡 Tunnel: {l.strip()}"))
                    
                    # Ищем URL
                    match = re.search(r'your url is: (https://[^\s]+)', line)
                    if match:
                        url = match.group(1)
                        self.tunnel_url = url
                        self.root.after(0, lambda: self.tunnel_created(url))
                        break
                        
            except Exception as e:
                self.root.after(0, lambda: self.tunnel_error(str(e)))
        
        threading.Thread(target=tunnel_thread, daemon=True).start()
    
    def tunnel_created(self, url):
        self.log(f"🎉 Туннель создан: {url}")
        self.log(f"🎨 Конструктор доступен: localhost:3001")
        
        self.url_var.set(url)
        self.constructor_url_var.set("localhost:3001")
        
        self.copy_btn.config(state='normal')
        
        self.update_status('tunnel', '✅ Активен', '#4CAF50')
        
        messagebox.showinfo("🎉 Туннель готов!", 
                           f"Дашборд:\n{url}\n\nКонструктор:\nlocalhost:3001")
    
    def tunnel_error(self, error):
        self.log(f"❌ Ошибка туннеля: {error}")
        self.update_status('tunnel', '❌ Ошибка', '#f44336')
        self.tunnel_process = None
    
    def open_dashboard(self):
        if self.tunnel_url:
            self.log(f"🌐 Открытие дашборда: {self.tunnel_url}")
            try:
                import webbrowser
                webbrowser.open(self.tunnel_url)
            except:
                subprocess.run(['start', self.tunnel_url], shell=True)
        else:
            self.log("❌ Сначала создайте туннель!")
            messagebox.showwarning("⚠️ Предупреждение", "Сначала создайте туннель!")
    
    def open_constructor(self):
        constructor_url = "http://localhost:3001"
        self.log(f"🌍 Открытие конструктора: {constructor_url}")
        try:
            import webbrowser
            webbrowser.open(constructor_url)
        except:
            subprocess.run(['start', constructor_url], shell=True)
    
    def clear_next_cache(self):
        """Очищает кэш Next.js из обоих проектов"""
        self.log("🗑️ === ОЧИСТКА КЭША NEXT.JS ===")
        
        try:
            # Останавливаем Node.js процессы
            self.log("🛑 Остановка Node.js процессов...")
            result = subprocess.run(['taskkill', '/F', '/IM', 'node.exe'], 
                                   capture_output=True, text=True)
            if "Успешно" in result.stdout:
                self.log("✅ Node.js процессы остановлены")
            else:
                self.log("⚠️ Node.js процессы уже остановлены")
            
            # Очищаем кэш Frontend
            frontend_cache = "01-user-dashboard\\.next"
            if os.path.exists(frontend_cache):
                subprocess.run(['Remove-Item', '-Recurse', '-Force', frontend_cache], 
                              shell=True, capture_output=True)
                self.log("🧹 Кэш Frontend очищен")
            else:
                self.log("💡 Кэш Frontend уже чист")
            
            # Очищаем кэш Constructor
            constructor_cache = "offconstryktor\\.next"
            if os.path.exists(constructor_cache):
                subprocess.run(['Remove-Item', '-Recurse', '-Force', constructor_cache], 
                              shell=True, capture_output=True)
                self.log("🧹 Кэш Constructor очищен")
            else:
                self.log("💡 Кэш Constructor уже чист")
            
            # Обновляем статусы
            self.update_status('frontend', '⭕ Остановлен', '#f44336')
            self.update_status('constructor', '⭕ Остановлен', '#f44336')
            
            self.log("✅ Кэш Next.js полностью очищен!")
            self.log("💡 Теперь можно перезапустить Frontend и Constructor")
            
            messagebox.showinfo("🗑️ Кэш очищен!", 
                               "Кэш Next.js очищен!\n\nТеперь запустите:\n• 🌐 Frontend\n• 🎨 Constructor")
                               
        except Exception as e:
            self.log(f"❌ Ошибка очистки кэша: {e}")
            messagebox.showerror("❌ Ошибка", f"Не удалось очистить кэш:\n{e}")
    
    def start_all_components(self):
        self.log("🚀 === ЗАПУСК ВСЕХ КОМПОНЕНТОВ ===")
        
        # Запускаем по очереди с небольшими задержками
        def start_sequence():
            self.start_auth_bot()
            self.root.after(2000, self.start_backend)
            self.root.after(4000, self.start_frontend)
            self.root.after(6000, self.start_constructor)
            self.root.after(8000, lambda: self.log("✅ Все компоненты запущены! Создайте туннели для внешнего доступа."))
        
        start_sequence()

if __name__ == '__main__':
    root = tk.Tk()
    app = AdvancedTeleShopGUI(root)
    root.mainloop() 