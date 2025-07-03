import tkinter as tk 
from tkinter import messagebox 
import subprocess 
 
class TeleShopGUI: 
    def __init__(self, root): 
        self.root = root 
        self.root.title("TeleShop Tunnel Manager") 
        self.root.geometry("600x400") 
        self.root.configure(bg="#2d2d30") 
 
        tk.Label( 
            self.root, 
            text="TeleShop Tunnel Manager", 
            font=("Arial", 16, "bold"), 
            fg="#4CAF50", 
            bg="#2d2d30" 
        ).pack(pady=20) 
 
        tk.Button( 
            self.root, 
            text="Создать туннель", 
            command=self.create_tunnel, 
            bg="#4CAF50", 
            fg="white", 
            font=("Arial", 12), 
            padx=20, 
            pady=10 
        ).pack(pady=10) 
 
        tk.Button( 
            self.root, 
            text="Запустить Auth Bot", 
            command=self.start_auth_bot, 
            bg="#FF9800", 
            fg="white", 
            width=20 
        ).pack(pady=5) 
 
        tk.Button( 
            self.root, 
            text="Запустить Backend", 
            command=self.start_backend, 
            bg="#9C27B0", 
            fg="white", 
            width=20 
        ).pack(pady=5) 
 
        tk.Button( 
            self.root, 
            text="Запустить Frontend", 
            command=self.start_frontend, 
            bg="#2196F3", 
            fg="white", 
            width=20 
        ).pack(pady=5) 
 
    def create_tunnel(self): 
        messagebox.showinfo("Туннель", "Создание туннеля...") 
        try: 
            subprocess.Popen(["npx", "localtunnel", "--port", "3000"]) 
            messagebox.showinfo("Успех", "Туннель создается!") 
        except Exception as e: 
            messagebox.showerror("Ошибка", f"Ошибка создания туннеля: {e}") 
 
    def start_auth_bot(self): 
        try: 
            subprocess.Popen(["python", "simple_auth_bot.py"], cwd="auth-bot") 
            messagebox.showinfo("Успех", "Auth Bot запущен!") 
        except Exception as e: 
            messagebox.showerror("Ошибка", f"Ошибка запуска Auth Bot: {e}") 
 
    def start_backend(self): 
        try: 
            subprocess.Popen(["python", "main_secure_fixed.py"], cwd="05-server-launchers/main") 
            messagebox.showinfo("Успех", "Backend запущен!") 
        except Exception as e: 
            messagebox.showerror("Ошибка", f"Ошибка запуска Backend: {e}") 
 
    def start_frontend(self): 
        try: 
            subprocess.Popen(["npm", "run", "dev"], cwd="01-user-dashboard") 
            messagebox.showinfo("Успех", "Frontend запущен!") 
        except Exception as e: 
            messagebox.showerror("Ошибка", f"Ошибка запуска Frontend: {e}") 
 
if __name__ == "__main__": 
    root = tk.Tk() 
    app = TeleShopGUI(root) 
    root.mainloop() 
