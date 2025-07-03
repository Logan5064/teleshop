import tkinter as tk
from tkinter import messagebox
import subprocess
import os

class TeleShopGUI:
    def __init__(self, root):
        self.root = root
        self.root.title('TeleShop Manager')
        self.root.geometry('500x350')
        self.root.configure(bg='#2d2d30')
        
        tk.Label(self.root, text='TeleShop Manager', font=('Arial', 18, 'bold'), 
                fg='#4CAF50', bg='#2d2d30').pack(pady=20)
        
        tk.Button(self.root, text='🤖 Запустить Auth Bot', command=self.start_auth_bot,
                bg='#FF9800', fg='white', font=('Arial', 11), width=25, pady=8).pack(pady=5)
        
        tk.Button(self.root, text='⚙️ Запустить Backend API', command=self.start_backend,
                bg='#9C27B0', fg='white', font=('Arial', 11), width=25, pady=8).pack(pady=5)
        
        tk.Button(self.root, text='🌐 Запустить Frontend', command=self.start_frontend,
                bg='#2196F3', fg='white', font=('Arial', 11), width=25, pady=8).pack(pady=5)
        
        tk.Button(self.root, text='🚀 Создать туннель', command=self.create_tunnel,
                bg='#4CAF50', fg='white', font=('Arial', 11), width=25, pady=8).pack(pady=5)
        
        tk.Button(self.root, text='❌ Закрыть', command=self.root.quit,
                bg='#f44336', fg='white', font=('Arial', 11), width=25, pady=8).pack(pady=20)
    
    def start_auth_bot(self):
        try:
            subprocess.Popen(['python', 'simple_auth_bot.py'], cwd='auth-bot', 
                           creationflags=subprocess.CREATE_NEW_CONSOLE)
            messagebox.showinfo('✅ Успех', 'Auth Bot запущен в новом окне!')
        except Exception as e:
            messagebox.showerror('❌ Ошибка', f'Не удалось запустить Auth Bot:\n{e}')
    
    def start_backend(self):
        try:
            subprocess.Popen(['python', 'main_secure_fixed.py'], 
                           cwd='05-server-launchers/main',
                           creationflags=subprocess.CREATE_NEW_CONSOLE)
            messagebox.showinfo('✅ Успех', 'Backend API запущен в новом окне!')
        except Exception as e:
            messagebox.showerror('❌ Ошибка', f'Не удалось запустить Backend:\n{e}')
    
    def start_frontend(self):
        try:
            subprocess.Popen(['npm', 'run', 'dev'], cwd='01-user-dashboard',
                           creationflags=subprocess.CREATE_NEW_CONSOLE, shell=True)
            messagebox.showinfo('✅ Успех', 'Frontend запущен в новом окне!')
        except Exception as e:
            messagebox.showerror('❌ Ошибка', f'Не удалось запустить Frontend:\n{e}')
    
    def create_tunnel(self):
        try:
            subprocess.Popen(['npx', 'localtunnel', '--port', '3000'], 
                           creationflags=subprocess.CREATE_NEW_CONSOLE, shell=True)
            messagebox.showinfo('✅ Успех', 'Туннель запущен в новом окне!\nURL появится в консоли')
        except Exception as e:
            messagebox.showerror('❌ Ошибка', f'Не удалось создать туннель:\n{e}')

if __name__ == '__main__':
    root = tk.Tk()
    app = TeleShopGUI(root)
    root.mainloop()

