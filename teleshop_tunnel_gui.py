import tkinter as tk
from tkinter import messagebox, scrolledtext
import subprocess
import threading
import re
import os
from datetime import datetime

class TeleShopTunnelGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("TeleShop Tunnel Manager")
        self.root.geometry("800x600")
        self.root.configure(bg='#2d2d30')
        
        self.tunnel_process = None
        self.tunnel_url = None
        
        self.setup_ui()
        
    def setup_ui(self):
        main_frame = tk.Frame(self.root, bg='#2d2d30')
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        title_label = tk.Label(
            main_frame, 
            text="TeleShop Tunnel Manager",
            font=('Arial', 18, 'bold'),
            fg='#4CAF50',
            bg='#2d2d30'
        )
        title_label.pack(pady=(0, 20))
        
        self.tunnel_btn = tk.Button(
            main_frame,
            text="Создать туннель",
            command=self.create_tunnel,
            bg='#4CAF50',
            fg='white',
            font=('Arial', 12, 'bold'),
            padx=20,
            pady=10
        )
        self.tunnel_btn.pack(pady=10)
        
        self.url_var = tk.StringVar(value="Туннель не создан")
        self.url_entry = tk.Entry(
            main_frame,
            textvariable=self.url_var,
            font=('Arial', 11),
            state='readonly',
            width=70,
            bg='#3c3c3c',
            fg='#4CAF50'
        )
        self.url_entry.pack(pady=10)
        
        self.copy_btn = tk.Button(
            main_frame,
            text="опировать URL",
            command=self.copy_url,
            bg='#2196F3',
            fg='white',
            state='disabled'
        )
        self.copy_btn.pack(pady=5)
        
        buttons_frame = tk.Frame(main_frame, bg='#2d2d30')
        buttons_frame.pack(pady=20)
        
        tk.Button(
            buttons_frame,
            text="Auth Bot",
            command=self.start_auth_bot,
            bg='#FF9800',
            fg='white',
            width=12
        ).pack(side=tk.LEFT, padx=5)
        
        tk.Button(
            buttons_frame,
            text="Backend API",
            command=self.start_backend,
            bg='#9C27B0',
            fg='white',
            width=12
        ).pack(side=tk.LEFT, padx=5)
        
        tk.Button(
            buttons_frame,
            text="Frontend",
            command=self.start_frontend,
            bg='#2196F3',
            fg='white',
            width=12
        ).pack(side=tk.LEFT, padx=5)
        
        tk.Button(
            buttons_frame,
            text="апустить все",
            command=self.start_all,
            bg='#4CAF50',
            fg='white',
            width=12
        ).pack(side=tk.LEFT, padx=5)
        
        self.log_text = scrolledtext.ScrolledText(
            main_frame,
            height=15,
            bg='#1e1e1e',
            fg='#ffffff',
            font=('Consolas', 9)
        )
        self.log_text.pack(fill=tk.BOTH, expand=True, pady=(20, 0))
        
        self.log("TeleShop Tunnel Manager запущен!")
        self.log("ажмите 'Создать туннель' для начала")
    
    def log(self, message):
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.log_text.see(tk.END)
        self.root.update()
    
    def create_tunnel(self):
        if self.tunnel_process:
            self.log("Туннель уже запущен!")
            return
        
        self.log("Создание туннеля...")
        self.tunnel_btn.config(text="Создание...", state='disabled')
        
        def tunnel_thread():
            try:
                self.tunnel_process = subprocess.Popen(
                    ['npx', 'localtunnel', '--port', '3000'],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True
                )
                
                while True:
                    line = self.tunnel_process.stdout.readline()
                    if not line:
                        break
                    
                    match = re.search(r'your url is: (https://[^\s]+)', line)
                    if match:
                        self.tunnel_url = match.group(1)
                        self.root.after(0, self.tunnel_created)
                        break
                        
            except Exception as e:
                self.root.after(0, lambda: self.tunnel_error(str(e)))
        
        threading.Thread(target=tunnel_thread, daemon=True).start()
    
    def tunnel_created(self):
        self.log(f"Туннель создан: {self.tunnel_url}")
        self.url_var.set(self.tunnel_url)
        self.copy_btn.config(state='normal')
        self.tunnel_btn.config(text="Туннель активен")
        self.create_env_file()
        
    def tunnel_error(self, error):
        self.log(f"шибка: {error}")
        self.tunnel_btn.config(text="Создать туннель", state='normal')
        self.tunnel_process = None
    
    def create_env_file(self):
        try:
            env_path = os.path.join("01-user-dashboard", ".env.local")
            with open(env_path, 'w', encoding='utf-8') as f:
                f.write(f"NEXT_PUBLIC_TUNNEL_URL={self.tunnel_url}\n")
            self.log(f"онфигурация сохранена: {env_path}")
        except Exception as e:
            self.log(f"шибка сохранения: {e}")
    
    def copy_url(self):
        if self.tunnel_url:
            self.root.clipboard_clear()
            self.root.clipboard_append(self.tunnel_url)
            self.log("URL скопирован!")
            messagebox.showinfo("спех", "URL скопирован в буфер обмена!")
    
    def start_auth_bot(self):
        self.log("апуск Auth Bot...")
        try:
            subprocess.Popen(
                ['python', 'simple_auth_bot.py'],
                cwd='auth-bot',
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.log("Auth Bot запущен")
        except Exception as e:
            self.log(f"шибка Auth Bot: {e}")
    
    def start_backend(self):
        self.log("апуск Backend...")
        try:
            subprocess.Popen(
                ['python', 'main_secure_fixed.py'],
                cwd='05-server-launchers/main',
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.log("Backend запущен")
        except Exception as e:
            self.log(f"шибка Backend: {e}")
    
    def start_frontend(self):
        self.log("апуск Frontend...")
        try:
            subprocess.Popen(
                ['npm', 'run', 'dev'],
                cwd='01-user-dashboard',
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
            self.log("Frontend запущен")
        except Exception as e:
            self.log(f"шибка Frontend: {e}")
    
    def start_all(self):
        self.log("апуск всех компонентов...")
        if not self.tunnel_url:
            self.log("Сначала создайте туннель!")
            return
        
        self.start_auth_bot()
        self.root.after(3000, self.start_backend)
        self.root.after(6000, self.start_frontend)

if __name__ == "__main__":
    root = tk.Tk()
    app = TeleShopTunnelGUI(root)
    root.mainloop()