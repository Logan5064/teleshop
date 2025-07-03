import tkinter as tk
from tkinter import messagebox
import subprocess
import os
import sys

def log(message):
    print(f"[GUI LOG] {message}")
    sys.stdout.flush()

class TeleShopGUI:
    def __init__(self, root):
        log("Инициализация GUI...")
        self.root = root
        self.root.title('TeleShop Manager with Logs')
        self.root.geometry('500x350')
        self.root.configure(bg='#2d2d30')
        
        log("Создание интерфейса...")
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
        
        tk.Button(self.root, text='❌ Закрыть', command=self.close_app,
                bg='#f44336', fg='white', font=('Arial', 11), width=25, pady=8).pack(pady=20)
        
        log("GUI готов к использованию!")
    
    def close_app(self):
        log("Закрытие приложения...")
        self.root.quit()
    
    def start_auth_bot(self):
        log("=== ЗАПУСК AUTH BOT ===")
        log("Проверка пути: auth-bot/simple_auth_bot.py")
        
        if os.path.exists('auth-bot/simple_auth_bot.py'):
            log("✅ Файл найден!")
        else:
            log("❌ Файл НЕ найден!")
            log(f"Текущая папка: {os.getcwd()}")
            log(f"Содержимое папки auth-bot: {os.listdir('auth-bot') if os.path.exists('auth-bot') else 'папка не существует'}")
        
        try:
            log("Выполнение команды: python simple_auth_bot.py в папке auth-bot")
            process = subprocess.Popen(['python', 'simple_auth_bot.py'], cwd='auth-bot', 
                                     creationflags=subprocess.CREATE_NEW_CONSOLE)
            log(f"✅ Процесс запущен с PID: {process.pid}")
            messagebox.showinfo('✅ Успех', 'Auth Bot запущен в новом окне!')
        except Exception as e:
            log(f"❌ ОШИБКА: {e}")
            messagebox.showerror('❌ Ошибка', f'Не удалось запустить Auth Bot:\n{e}')
    
    def start_backend(self):
        log("=== ЗАПУСК BACKEND API ===")
        log("Проверка пути: 05-server-launchers/main/main_secure_fixed.py")
        
        if os.path.exists('05-server-launchers/main/main_secure_fixed.py'):
            log("✅ Файл найден!")
        else:
            log("❌ Файл НЕ найден!")
            log(f"Содержимое 05-server-launchers/main: {os.listdir('05-server-launchers/main') if os.path.exists('05-server-launchers/main') else 'папка не существует'}")
        
        try:
            log("Выполнение команды: python main_secure_fixed.py в папке 05-server-launchers/main")
            process = subprocess.Popen(['python', 'main_secure_fixed.py'], 
                                     cwd='05-server-launchers/main',
                                     creationflags=subprocess.CREATE_NEW_CONSOLE)
            log(f"✅ Процесс запущен с PID: {process.pid}")
            messagebox.showinfo('✅ Успех', 'Backend API запущен в новом окне!')
        except Exception as e:
            log(f"❌ ОШИБКА: {e}")
            messagebox.showerror('❌ Ошибка', f'Не удалось запустить Backend:\n{e}')
    
    def start_frontend(self):
        log("=== ЗАПУСК FRONTEND ===")
        log("Проверка пути: 01-user-dashboard/")
        
        if os.path.exists('01-user-dashboard'):
            log("✅ Папка найдена!")
            if os.path.exists('01-user-dashboard/package.json'):
                log("✅ package.json найден!")
            else:
                log("❌ package.json НЕ найден!")
        else:
            log("❌ Папка НЕ найдена!")
        
        try:
            log("Выполнение команды: npm run dev в папке 01-user-dashboard")
            process = subprocess.Popen(['npm', 'run', 'dev'], cwd='01-user-dashboard',
                                     creationflags=subprocess.CREATE_NEW_CONSOLE, shell=True)
            log(f"✅ Процесс запущен с PID: {process.pid}")
            messagebox.showinfo('✅ Успех', 'Frontend запущен в новом окне!')
        except Exception as e:
            log(f"❌ ОШИБКА: {e}")
            messagebox.showerror('❌ Ошибка', f'Не удалось запустить Frontend:\n{e}')
    
    def create_tunnel(self):
        log("=== СОЗДАНИЕ ТУННЕЛЯ ===")
        try:
            log("Выполнение команды: npx localtunnel --port 3000")
            process = subprocess.Popen(['npx', 'localtunnel', '--port', '3000'], 
                                     creationflags=subprocess.CREATE_NEW_CONSOLE, shell=True)
            log(f"✅ Процесс запущен с PID: {process.pid}")
            messagebox.showinfo('✅ Успех', 'Туннель запущен в новом окне!\nURL появится в консоли')
        except Exception as e:
            log(f"❌ ОШИБКА: {e}")
            messagebox.showerror('❌ Ошибка', f'Не удалось создать туннель:\n{e}')

if __name__ == '__main__':
    log("Запуск TeleShop GUI с логированием...")
    log(f"Python версия: {sys.version}")
    log(f"Рабочая папка: {os.getcwd()}")
    
    root = tk.Tk()
    app = TeleShopGUI(root)
    
    log("Запуск главного цикла GUI...")
    root.mainloop()
    log("GUI завершен.") 