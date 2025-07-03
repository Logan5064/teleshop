@echo off
echo 🌐 TeleShop Tunnel GUI Launcher
echo ==============================

:: Проверяем что simple_gui.py существует
if not exist "simple_gui.py" (
    echo Создание GUI файла...
    goto CREATE_GUI
) else (
    echo GUI файл найден, запускаем...
    goto RUN_GUI
)

:CREATE_GUI
:: Создаем GUI файл через PowerShell
powershell -Command "$content='import tkinter as tk`nfrom tkinter import messagebox`nimport subprocess`nimport os`n`nclass TeleShopGUI:`n    def __init__(self, root):`n        self.root = root`n        self.root.title(\"TeleShop Tunnel Manager\")`n        self.root.geometry(\"600x400\")`n        self.root.configure(bg=\"#2d2d30\")`n        self.setup_ui()`n`n    def setup_ui(self):`n        tk.Label(`n            self.root,`n            text=\"TeleShop Tunnel Manager\",`n            font=(\"Arial\", 16, \"bold\"),`n            fg=\"#4CAF50\",`n            bg=\"#2d2d30\"`n        ).pack(pady=20)`n`n        tk.Button(`n            self.root,`n            text=\"Создать туннель\",`n            command=self.create_tunnel,`n            bg=\"#4CAF50\",`n            fg=\"white\",`n            width=20`n        ).pack(pady=10)`n`n        tk.Button(`n            self.root,`n            text=\"Запустить Auth Bot\",`n            command=self.start_auth_bot,`n            bg=\"#FF9800\",`n            fg=\"white\",`n            width=20`n        ).pack(pady=5)`n`n        tk.Button(`n            self.root,`n            text=\"Запустить Backend\",`n            command=self.start_backend,`n            bg=\"#9C27B0\",`n            fg=\"white\",`n            width=20`n        ).pack(pady=5)`n`n        tk.Button(`n            self.root,`n            text=\"Запустить Frontend\",`n            command=self.start_frontend,`n            bg=\"#2196F3\",`n            fg=\"white\",`n            width=20`n        ).pack(pady=5)`n`n    def create_tunnel(self):`n        try:`n            result = subprocess.run([\"cmd\", \"/c\", \"npx localtunnel --port 3000\"], shell=True)`n            messagebox.showinfo(\"Туннель\", \"Команда туннеля выполнена\")`n        except Exception as e:`n            messagebox.showerror(\"Ошибка\", f\"Ошибка: {e}\")`n`n    def start_auth_bot(self):`n        try:`n            if os.path.exists(\"auth-bot/simple_auth_bot.py\"):`n                subprocess.Popen([\"python\", \"auth-bot/simple_auth_bot.py\"])`n                messagebox.showinfo(\"Успех\", \"Auth Bot запущен!\")`n            else:`n                messagebox.showerror(\"Ошибка\", \"Файл не найден!\")`n        except Exception as e:`n            messagebox.showerror(\"Ошибка\", f\"Ошибка: {e}\")`n`n    def start_backend(self):`n        try:`n            if os.path.exists(\"05-server-launchers/main/main_secure_fixed.py\"):`n                subprocess.Popen([\"python\", \"05-server-launchers/main/main_secure_fixed.py\"])`n                messagebox.showinfo(\"Успех\", \"Backend запущен!\")`n            else:`n                messagebox.showerror(\"Ошибка\", \"Файл не найден!\")`n        except Exception as e:`n            messagebox.showerror(\"Ошибка\", f\"Ошибка: {e}\")`n`n    def start_frontend(self):`n        try:`n            if os.path.exists(\"01-user-dashboard\"):`n                subprocess.Popen([\"npm\", \"run\", \"dev\"], cwd=\"01-user-dashboard\", shell=True)`n                messagebox.showinfo(\"Успех\", \"Frontend запущен!\")`n            else:`n                messagebox.showerror(\"Ошибка\", \"Папка не найдена!\")`n        except Exception as e:`n            messagebox.showerror(\"Ошибка\", f\"Ошибка: {e}\")`n`nif __name__ == \"__main__\":`n    root = tk.Tk()`n    app = TeleShopGUI(root)`n    root.mainloop()'; [System.IO.File]::WriteAllText('simple_gui.py', $content, [System.Text.UTF8Encoding]::new($false))"

echo GUI файл создан!

:RUN_GUI
echo Запуск TeleShop Tunnel GUI...
python simple_gui.py

pause 