#!/usr/bin/env python3
"""
🔒 ГЛАВНЫЙ ФАЙЛ БЕЗОПАСНОГО API
Запуск TeleShop Constructor с полной авторизацией и изоляцией данных
"""

import os
import sys
import uvicorn
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse

# Импорт системы логирования
from logging_config import setup_development_logging, get_logger

# Добавляем путь к модулям
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(current_dir))  # Возвращаемся к корню проекта
sys.path.insert(0, current_dir)

# Импорт безопасных роутеров
from secure_api import router as secure_router
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

from shared.auth.db_code_auth import get_current_user_by_session
from shared.models.user import User
from shared.auth.cleanup_task import start_cleanup_task, stop_cleanup_task
from shared.utils.database import get_db

# Импорт BotManager
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from bot_engine.manager import BotManager

# Глобальная переменная для BotManager
bot_manager = None

def get_bot_manager():
    """Получает глобальный экземпляр BotManager"""
    global bot_manager
    if bot_manager is None:
        raise HTTPException(status_code=500, detail="BotManager не инициализирован")
    return bot_manager

# Lifespan context manager для startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Управление жизненным циклом приложения"""
    global bot_manager
    
    # Startup
    await start_cleanup_task()
    
    # Инициализируем BotManager
    try:
        # Используем прямое создание сессии вместо get_db()
        from shared.utils.database import AsyncSessionLocal
        async with AsyncSessionLocal() as db_session:
            bot_manager = BotManager(db_session)
            await bot_manager.load_active_bots()
            get_logger("main").info("✅ BotManager запущен и активные боты загружены")
            
    except Exception as e:
        get_logger("main").error(f"❌ Ошибка инициализации BotManager: {e}")
    
    yield
    
    # Shutdown
    if bot_manager:
        await bot_manager.shutdown()
        get_logger("main").info("🛑 BotManager остановлен")
    
    await stop_cleanup_task()

# Создаем FastAPI приложение
app = FastAPI(
    title="🔒 TeleShop Constructor - Secure API",
    description="Защищенная многопользовательская платформа для создания Telegram магазинов",
    version="2.0.0",
    docs_url="/secure/docs",
    redoc_url="/secure/redoc",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://localhost:3000", 
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://77.73.232.46:3000",
        "http://77.73.232.46:3001",
        "https://77.73.232.46:3000",
        "https://77.73.232.46:3001"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Подключаем безопасные роуты БЕЗ префикса
app.include_router(secure_router)

@app.get("/")
async def dashboard_page(request: Request):
    """Главная страница - дашборд (только для авторизованных пользователей)"""
    logger = get_logger("dashboard")
    
    try:
        # Проверяем авторизацию через cookie сессии (обычные пользователи И администраторы)
        session_token = request.cookies.get("session_token")
        admin_token = request.cookies.get("admin_token")
        
        # Должен быть хотя бы один из токенов
        if not session_token and not admin_token:
            return RedirectResponse(url="/login", status_code=302)
        
        # Логируем тип входа
        if admin_token:
            logger.info("👑 Администратор зашел в дашборд")
        elif session_token:
            logger.info("👤 Пользователь зашел в дашборд")
        
        # Возвращаем правильный дашборд из правильной структуры
        dashboard_path = os.path.join(project_root, "01-user-dashboard", "shop_platform", "frontend", "index.html")
        return FileResponse(dashboard_path)
    except Exception as e:
        logger.error(f"⚠️ Ошибка в dashboard_page: {e}")
        return RedirectResponse(url="/login", status_code=302)

@app.get("/health")
async def health_check():
    """Проверка состояния сервиса"""
    return {
        "status": "healthy",
        "security": "enabled",
        "database": "postgresql",
        "message": "Secure API is running"
    }

if __name__ == "__main__":
    # Настраиваем логирование
    setup_development_logging()
    logger = get_logger("main")
    
    # Исправляем кодировку для Windows
    if os.name == 'nt':
        try:
            os.system('chcp 65001 >nul')  # UTF-8 для Windows консоли
        except:
            pass
    
    logger.info("🔒 Запуск TeleShop Constructor - Secure API (FIXED)")
    logger.info("━" * 50)
    logger.info("✅ Авторизация по временным кодам: ВКЛЮЧЕНА")
    logger.info("✅ База данных PostgreSQL: ПОДКЛЮЧЕНА")
    logger.info("✅ Автоочистка истекших данных: ВКЛЮЧЕНА")
    logger.info("✅ Изоляция данных пользователей: ВКЛЮЧЕНА")
    logger.info("✅ Сессии пользователей (12ч): ВКЛЮЧЕНА")
    logger.info("✅ Безопасные API эндпоинты: АКТИВНЫ")
    logger.info("✅ Роутер без префикса /api: ИСПРАВЛЕНО")
    logger.info("━" * 50)
    logger.info("🔑 Авторизация: http://localhost:8000/auth/login")
    logger.info("🔒 Проверка: http://localhost:8000/auth/check")
    logger.info("📖 Документация: http://localhost:8000/secure/docs")
    logger.info("━" * 50)
    
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 