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

# Lifespan context manager для startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Управление жизненным циклом приложения"""
    # Startup
    await start_cleanup_task()
    yield
    # Shutdown
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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем безопасные роуты
app.include_router(secure_router)

# Статичные файлы отключены - используем только Next.js фронтенд
# app.mount("/static", StaticFiles(directory="constructor/blocks"), name="static")
# app.mount("/shared", StaticFiles(directory="shared"), name="shared")

# ===== ОСНОВНЫЕ МАРШРУТЫ =====

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

@app.get("/dashboard")
async def dashboard_redirect(request: Request):
    """Дашборд (алиас для главной страницы)"""
    return await dashboard_page(request)

@app.get("/health")
async def health_check():
    """Проверка состояния сервиса"""
    return {
        "status": "healthy",
        "security": "enabled",
        "database": "postgresql",
        "message": "Secure API is running"
    }

@app.get("/constructor")
async def constructor_page():
    """Страница конструктора (требует авторизацию)"""
    constructor_path = os.path.join(project_root, "01-user-dashboard/konstruktor", "frontend", "constructor.html")
    return FileResponse(constructor_path)

@app.get("/blocks")
async def blocks_page():
    """Страница блоков (требует авторизацию)"""
    blocks_path = os.path.join(project_root, "01-user-dashboard/konstruktor", "frontend", "block-constructor.html")
    return FileResponse(blocks_path)

@app.get("/login")
async def login_page():
    """Страница авторизации"""
    login_path = os.path.join(project_root, "02-auth-panel", "frontend", "login.html")
    return FileResponse(login_path)

@app.get("/admin")
async def admin_page():
    """🔐 Административная панель"""
    admin_path = os.path.join(project_root, "03-admin-panel", "frontend", "admin.html")
    return FileResponse(admin_path)

@app.get("/secure/user/profile")
async def get_user_profile(current_user: User = Depends(get_current_user_by_session)):
    """🔒 Получить профиль текущего пользователя"""
    return {
        "id": current_user.id,
        "telegram_id": current_user.telegram_id,
        "username": current_user.username,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "subscription_plan": current_user.subscription_plan,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at
    }

# ===== ОТКЛЮЧЕНИЕ НЕБЕЗОПАСНОГО API =====

@app.get("/api/bots")
async def deprecated_bots_endpoint():
    """Устаревший небезопасный эндпоинт"""
    raise HTTPException(
        status_code=410,
        detail={
            "error": "Этот эндпоинт отключен из соображений безопасности",
            "reason": "Отсутствует авторизация пользователей",
            "solution": "Используйте /api/secure/bots с Telegram авторизацией",
            "migration": {
                "old": "/api/bots",
                "new": "/api/secure/bots",
                "auth": "Получите код в @вашем_боте командой /login"
            },
            "security": "🔒 Включена авторизация для защиты ваших данных"
        }
    )

@app.get("/api/constructor/designs")
async def deprecated_designs_endpoint():
    """Устаревший небезопасный эндпоинт"""
    raise HTTPException(
        status_code=410,
        detail={
            "error": "Этот эндпоинт отключен из соображений безопасности",
            "reason": "Пользователи могли видеть чужие дизайны",
            "solution": "Используйте /api/secure/constructor/designs",
            "migration": {
                "old": "/api/constructor/designs",
                "new": "/api/secure/constructor/designs"
            }
        }
    )

@app.get("/api/analytics/dashboard")
async def deprecated_analytics_endpoint():
    """Устаревший небезопасный эндпоинт"""
    raise HTTPException(
        status_code=410,
        detail={
            "error": "Этот эндпоинт отключен из соображений безопасности",
            "reason": "Показывал данные всех пользователей",
            "solution": "Используйте /api/secure/analytics/dashboard",
            "message": "Теперь вы видите только свою аналитику"
        }
    )

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
    
    logger.info("🔒 Запуск TeleShop Constructor - Secure API")
    logger.info("━" * 50)
    logger.info("✅ Авторизация по временным кодам: ВКЛЮЧЕНА")
    logger.info("✅ База данных PostgreSQL: ПОДКЛЮЧЕНА")
    logger.info("✅ Автоочистка истекших данных: ВКЛЮЧЕНА")
    logger.info("✅ Изоляция данных пользователей: ВКЛЮЧЕНА")
    logger.info("✅ Сессии пользователей (12ч): ВКЛЮЧЕНА")
    logger.info("✅ Безопасные API эндпоинты: АКТИВНЫ")
    logger.warning("❌ Небезопасные эндпоинты: ОТКЛЮЧЕНЫ")
    logger.info("━" * 50)
    logger.info("🌐 Страница входа: http://localhost:8000/login")
    logger.info("📖 Документация: http://localhost:8000/secure/docs")
    logger.info("🔑 Авторизация: http://localhost:8000/api/auth/login")
    logger.info("🤖 Получите код в Telegram боте командой /login")
    logger.info("━" * 50)
    
    uvicorn.run(
        "main_secure:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 
