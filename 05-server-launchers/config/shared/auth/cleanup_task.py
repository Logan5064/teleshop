#!/usr/bin/env python3
"""
🧹 Фоновая задача для очистки истекших кодов и сессий
Запускается автоматически и очищает БД каждые 5 минут
"""

import asyncio
from datetime import datetime

# Добавляем путь к shared модулям
import sys
import os

# Добавляем путь к shared модулям
import sys
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = current_dir
for _ in range(10):  # Ищем корень проекта
    if os.path.exists(os.path.join(project_root, "main_launcher.py")):
        break
    project_root = os.path.dirname(project_root)
shared_path = os.path.join(project_root, "05-server-launchers", "config")
sys.path.insert(0, shared_path)

from shared.auth.db_code_auth import DatabaseCodeAuth
from shared.utils.database import AsyncSessionLocal

class AuthCleanupTask:
    """Задача для автоматической очистки авторизации"""
    
    def __init__(self, interval_minutes: int = 5):
        self.interval_minutes = interval_minutes
        self.is_running = False
        self.task = None
    
    async def cleanup_loop(self):
        """Основной цикл очистки"""
        try:
            print(f"🧹 Запущена задача очистки авторизации (каждые {self.interval_minutes} мин)")
        except UnicodeEncodeError:
            print(f"Zapushchena zadacha ochistki avtorizacii (kazhdye {self.interval_minutes} min)")
        
        while self.is_running:
            try:
                async with AsyncSessionLocal() as db:
                    await DatabaseCodeAuth.cleanup_expired(db)
                
                # Ждем до следующей очистки
                await asyncio.sleep(self.interval_minutes * 60)
                
            except Exception as e:
                try:
                    print(f"❌ Ошибка в задаче очистки: {e}")
                except UnicodeEncodeError:
                    print(f"Oshibka v zadache ochistki: {e}")
                await asyncio.sleep(60)  # Ждем минуту при ошибке
    
    async def start(self):
        """Запускает задачу очистки"""
        if not self.is_running:
            self.is_running = True
            self.task = asyncio.create_task(self.cleanup_loop())
            try:
                print("✅ Фоновая очистка авторизации запущена")
            except UnicodeEncodeError:
                print("Fonovaya ochistka avtorizacii zapushchena")
    
    async def stop(self):
        """Останавливает задачу очистки"""
        if self.is_running:
            self.is_running = False
            if self.task:
                self.task.cancel()
                try:
                    await self.task
                except asyncio.CancelledError:
                    pass
            try:
                print("🛑 Фоновая очистка авторизации остановлена")
            except UnicodeEncodeError:
                print("Fonovaya ochistka avtorizacii ostanovlena")

# Глобальный экземпляр задачи
cleanup_task = AuthCleanupTask()

async def start_cleanup_task():
    """Запускает фоновую очистку"""
    await cleanup_task.start()

async def stop_cleanup_task():
    """Останавливает фоновую очистку"""
    await cleanup_task.stop() 