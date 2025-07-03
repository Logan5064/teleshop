@echo off
chcp 65001 > nul

del fixed_gui.py 2>nul

echo import tkinter as tk > fixed_gui.py
echo from tkinter import messagebox, scrolledtext >> fixed_gui.py
echo import subprocess >> fixed_gui.py
echo import os >> fixed_gui.py
echo from datetime import datetime >> fixed_gui.py
echo import threading >> fixed_gui.py
echo. >> fixed_gui.py
echo class TeleShopGUI: >> fixed_gui.py
echo     def __init__(self, root): >> fixed_gui.py
echo         self.root = root >> fixed_gui.py
echo         self.root.title("TeleShop Tunnel Manager") >> fixed_gui.py
echo         self.root.geometry("700x500") >> fixed_gui.py
echo         self.root.configure(bg="#2d2d30") >> fixed_gui.py
echo         self.setup_ui() >> fixed_gui.py
echo. >> fixed_gui.py
echo     def setup_ui(self): >> fixed_gui.py
echo         tk.Label( >> fixed_gui.py
echo             self.root, >> fixed_gui.py
echo             text="TeleShop Tunnel Manager", >> fixed_gui.py
echo             font=("Arial", 16, "bold"), >> fixed_gui.py
echo             fg="#4CAF50", >> fixed_gui.py
echo             bg="#2d2d30" >> fixed_gui.py
echo         ^).pack(pady=20) >> fixed_gui.py
echo. >> fixed_gui.py
echo         tk.Button( >> fixed_gui.py
echo             self.root, >> fixed_gui.py
echo             text="Создать туннель (LocalTunnel)", >> fixed_gui.py
echo             command=self.create_tunnel, >> fixed_gui.py
echo             bg="#4CAF50", >> fixed_gui.py
echo             fg="white", >> fixed_gui.py
echo             font=("Arial", 10), >> fixed_gui.py
echo             width=25 >> fixed_gui.py
echo         ^).pack(pady=5) >> fixed_gui.py
echo. >> fixed_gui.py
echo         buttons_frame = tk.Frame(self.root, bg="#2d2d30") >> fixed_gui.py
echo         buttons_frame.pack(pady=10) >> fixed_gui.py
echo. >> fixed_gui.py
echo         tk.Button( >> fixed_gui.py
echo             buttons_frame, >> fixed_gui.py
echo             text="Auth Bot", >> fixed_gui.py
echo             command=self.start_auth_bot, >> fixed_gui.py
echo             bg="#FF9800", >> fixed_gui.py
echo             fg="white", >> fixed_gui.py
echo             width=12 >> fixed_gui.py
echo         ^).pack(side=tk.LEFT, padx=5) >> fixed_gui.py
echo. >> fixed_gui.py
echo         tk.Button( >> fixed_gui.py
echo             buttons_frame, >> fixed_gui.py
echo             text="Backend", >> fixed_gui.py
echo             command=self.start_backend, >> fixed_gui.py
echo             bg="#9C27B0", >> fixed_gui.py
echo             fg="white", >> fixed_gui.py
echo             width=12 >> fixed_gui.py
echo         ^).pack(side=tk.LEFT, padx=5) >> fixed_gui.py
echo. >> fixed_gui.py
echo         tk.Button( >> fixed_gui.py
echo             buttons_frame, >> fixed_gui.py
echo             text="Frontend", >> fixed_gui.py
echo             command=self.start_frontend, >> fixed_gui.py
echo             bg="#2196F3", >> fixed_gui.py
echo             fg="white", >> fixed_gui.py
echo             width=12 >> fixed_gui.py
echo         ^).pack(side=tk.LEFT, padx=5) >> fixed_gui.py
echo. >> fixed_gui.py
echo         tk.Label( >> fixed_gui.py
echo             self.root, >> fixed_gui.py
echo             text="Логи:", >> fixed_gui.py
echo             font=("Arial", 12), >> fixed_gui.py
echo             fg="white", >> fixed_gui.py
echo             bg="#2d2d30" >> fixed_gui.py
echo         ^).pack(anchor=tk.W, padx=20, pady=(20,5)) >> fixed_gui.py
echo. >> fixed_gui.py
echo         self.log_text = scrolledtext.ScrolledText( >> fixed_gui.py
echo             self.root, >> fixed_gui.py
echo             height=15, >> fixed_gui.py
echo             bg="#1e1e1e", >> fixed_gui.py
echo             fg="#ffffff", >> fixed_gui.py
echo             font=("Consolas", 9) >> fixed_gui.py
echo         ^) >> fixed_gui.py
echo         self.log_text.pack(fill=tk.BOTH, expand=True, padx=20, pady=(0,20)) >> fixed_gui.py
echo. >> fixed_gui.py
echo         self.log("GUI запущен!") >> fixed_gui.py
echo         self.log("Используйте кнопки для запуска компонентов") >> fixed_gui.py
echo. >> fixed_gui.py
echo     def log(self, message): >> fixed_gui.py
echo         timestamp = datetime.now().strftime("%%H:%%M:%%S") >> fixed_gui.py
echo         self.log_text.insert(tk.END, f"[{timestamp}] {message}\n") >> fixed_gui.py
echo         self.log_text.see(tk.END) >> fixed_gui.py
echo         self.root.update() >> fixed_gui.py
echo. >> fixed_gui.py
echo     def create_tunnel(self): >> fixed_gui.py
echo         def run_tunnel(): >> fixed_gui.py
echo             self.log("Попытка создания туннеля...") >> fixed_gui.py
echo             try: >> fixed_gui.py
echo                 result = subprocess.run(["npx", "localtunnel", "--port", "3000"], >> fixed_gui.py
echo                                        capture_output=True, text=True, timeout=30) >> fixed_gui.py
echo                 if result.returncode == 0: >> fixed_gui.py
echo                     self.log("Туннель создан успешно!") >> fixed_gui.py
echo                     self.log(result.stdout) >> fixed_gui.py
echo                 else: >> fixed_gui.py
echo                     self.log(f"Ошибка туннеля: {result.stderr}") >> fixed_gui.py
echo             except FileNotFoundError: >> fixed_gui.py
echo                 self.log("npx не найден! Установите Node.js") >> fixed_gui.py
echo             except subprocess.TimeoutExpired: >> fixed_gui.py
echo                 self.log("Таймаут создания туннеля") >> fixed_gui.py
echo             except Exception as e: >> fixed_gui.py
echo                 self.log(f"Ошибка: {e}") >> fixed_gui.py
echo         threading.Thread(target=run_tunnel, daemon=True).start() >> fixed_gui.py
echo. >> fixed_gui.py
echo     def start_auth_bot(self): >> fixed_gui.py
echo         self.log("Запуск Auth Bot...") >> fixed_gui.py
echo         try: >> fixed_gui.py
echo             if os.path.exists("auth-bot/simple_auth_bot.py"): >> fixed_gui.py
echo                 subprocess.Popen(["python", "simple_auth_bot.py"], >> fixed_gui.py
echo                                cwd="auth-bot", >> fixed_gui.py
echo                                creationflags=subprocess.CREATE_NEW_CONSOLE) >> fixed_gui.py
echo                 self.log("Auth Bot запущен в новом окне") >> fixed_gui.py
echo             else: >> fixed_gui.py
echo                 self.log("Файл auth-bot/simple_auth_bot.py не найден!") >> fixed_gui.py
echo         except Exception as e: >> fixed_gui.py
echo             self.log(f"Ошибка запуска Auth Bot: {e}") >> fixed_gui.py
echo. >> fixed_gui.py
echo     def start_backend(self): >> fixed_gui.py
echo         self.log("Запуск Backend API...") >> fixed_gui.py
echo         try: >> fixed_gui.py
echo             if os.path.exists("05-server-launchers/main/main_secure_fixed.py"): >> fixed_gui.py
echo                 subprocess.Popen(["python", "main_secure_fixed.py"], >> fixed_gui.py
echo                                cwd="05-server-launchers/main", >> fixed_gui.py
echo                                creationflags=subprocess.CREATE_NEW_CONSOLE) >> fixed_gui.py
echo                 self.log("Backend API запущен в новом окне") >> fixed_gui.py
echo             else: >> fixed_gui.py
echo                 self.log("Файл main_secure_fixed.py не найден!") >> fixed_gui.py
echo         except Exception as e: >> fixed_gui.py
echo             self.log(f"Ошибка запуска Backend: {e}") >> fixed_gui.py
echo. >> fixed_gui.py
echo     def start_frontend(self): >> fixed_gui.py
echo         self.log("Запуск Frontend...") >> fixed_gui.py
echo         try: >> fixed_gui.py
echo             if os.path.exists("01-user-dashboard/package.json"): >> fixed_gui.py
echo                 subprocess.Popen(["npm", "run", "dev"], >> fixed_gui.py
echo                                cwd="01-user-dashboard", >> fixed_gui.py
echo                                creationflags=subprocess.CREATE_NEW_CONSOLE) >> fixed_gui.py
echo                 self.log("Frontend запущен в новом окне") >> fixed_gui.py
echo             else: >> fixed_gui.py
echo                 self.log("Папка 01-user-dashboard не найдена!") >> fixed_gui.py
echo         except Exception as e: >> fixed_gui.py
echo             self.log(f"Ошибка запуска Frontend: {e}") >> fixed_gui.py
echo. >> fixed_gui.py
echo if __name__ == "__main__": >> fixed_gui.py
echo     root = tk.Tk() >> fixed_gui.py
echo     app = TeleShopGUI(root) >> fixed_gui.py
echo     root.mainloop() >> fixed_gui.py

echo Исправленный GUI создан!
python fixed_gui.py 