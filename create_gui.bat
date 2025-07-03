@echo off
chcp 65001 > nul

del simple_gui.py 2>nul

echo import tkinter as tk > simple_gui.py
echo from tkinter import messagebox >> simple_gui.py
echo import subprocess >> simple_gui.py
echo. >> simple_gui.py
echo class TeleShopGUI: >> simple_gui.py
echo     def __init__(self, root): >> simple_gui.py
echo         self.root = root >> simple_gui.py
echo         self.root.title("TeleShop Tunnel Manager") >> simple_gui.py
echo         self.root.geometry("600x400") >> simple_gui.py
echo         self.root.configure(bg="#2d2d30") >> simple_gui.py
echo. >> simple_gui.py
echo         tk.Label( >> simple_gui.py
echo             self.root, >> simple_gui.py
echo             text="TeleShop Tunnel Manager", >> simple_gui.py
echo             font=("Arial", 16, "bold"), >> simple_gui.py
echo             fg="#4CAF50", >> simple_gui.py
echo             bg="#2d2d30" >> simple_gui.py
echo         ^).pack(pady=20) >> simple_gui.py
echo. >> simple_gui.py
echo         tk.Button( >> simple_gui.py
echo             self.root, >> simple_gui.py
echo             text="Создать туннель", >> simple_gui.py
echo             command=self.create_tunnel, >> simple_gui.py
echo             bg="#4CAF50", >> simple_gui.py
echo             fg="white", >> simple_gui.py
echo             font=("Arial", 12), >> simple_gui.py
echo             padx=20, >> simple_gui.py
echo             pady=10 >> simple_gui.py
echo         ^).pack(pady=10) >> simple_gui.py
echo. >> simple_gui.py
echo         tk.Button( >> simple_gui.py
echo             self.root, >> simple_gui.py
echo             text="Запустить Auth Bot", >> simple_gui.py
echo             command=self.start_auth_bot, >> simple_gui.py
echo             bg="#FF9800", >> simple_gui.py
echo             fg="white", >> simple_gui.py
echo             width=20 >> simple_gui.py
echo         ^).pack(pady=5) >> simple_gui.py
echo. >> simple_gui.py
echo         tk.Button( >> simple_gui.py
echo             self.root, >> simple_gui.py
echo             text="Запустить Backend", >> simple_gui.py
echo             command=self.start_backend, >> simple_gui.py
echo             bg="#9C27B0", >> simple_gui.py
echo             fg="white", >> simple_gui.py
echo             width=20 >> simple_gui.py
echo         ^).pack(pady=5) >> simple_gui.py
echo. >> simple_gui.py
echo         tk.Button( >> simple_gui.py
echo             self.root, >> simple_gui.py
echo             text="Запустить Frontend", >> simple_gui.py
echo             command=self.start_frontend, >> simple_gui.py
echo             bg="#2196F3", >> simple_gui.py
echo             fg="white", >> simple_gui.py
echo             width=20 >> simple_gui.py
echo         ^).pack(pady=5) >> simple_gui.py
echo. >> simple_gui.py
echo     def create_tunnel(self): >> simple_gui.py
echo         messagebox.showinfo("Туннель", "Создание туннеля...") >> simple_gui.py
echo         try: >> simple_gui.py
echo             subprocess.Popen(["npx", "localtunnel", "--port", "3000"]) >> simple_gui.py
echo             messagebox.showinfo("Успех", "Туннель создается!") >> simple_gui.py
echo         except Exception as e: >> simple_gui.py
echo             messagebox.showerror("Ошибка", f"Ошибка создания туннеля: {e}") >> simple_gui.py
echo. >> simple_gui.py
echo     def start_auth_bot(self): >> simple_gui.py
echo         try: >> simple_gui.py
echo             subprocess.Popen(["python", "simple_auth_bot.py"], cwd="auth-bot") >> simple_gui.py
echo             messagebox.showinfo("Успех", "Auth Bot запущен!") >> simple_gui.py
echo         except Exception as e: >> simple_gui.py
echo             messagebox.showerror("Ошибка", f"Ошибка запуска Auth Bot: {e}") >> simple_gui.py
echo. >> simple_gui.py
echo     def start_backend(self): >> simple_gui.py
echo         try: >> simple_gui.py
echo             subprocess.Popen(["python", "main_secure_fixed.py"], cwd="05-server-launchers/main") >> simple_gui.py
echo             messagebox.showinfo("Успех", "Backend запущен!") >> simple_gui.py
echo         except Exception as e: >> simple_gui.py
echo             messagebox.showerror("Ошибка", f"Ошибка запуска Backend: {e}") >> simple_gui.py
echo. >> simple_gui.py
echo     def start_frontend(self): >> simple_gui.py
echo         try: >> simple_gui.py
echo             subprocess.Popen(["npm", "run", "dev"], cwd="01-user-dashboard") >> simple_gui.py
echo             messagebox.showinfo("Успех", "Frontend запущен!") >> simple_gui.py
echo         except Exception as e: >> simple_gui.py
echo             messagebox.showerror("Ошибка", f"Ошибка запуска Frontend: {e}") >> simple_gui.py
echo. >> simple_gui.py
echo if __name__ == "__main__": >> simple_gui.py
echo     root = tk.Tk() >> simple_gui.py
echo     app = TeleShopGUI(root) >> simple_gui.py
echo     root.mainloop() >> simple_gui.py

echo GUI файл создан!
python simple_gui.py 