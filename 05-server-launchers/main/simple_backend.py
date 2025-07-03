#!/usr/bin/env python3
"""
🚀 ПРОСТОЙ BACKEND API для TeleShop Constructor
Без сложных импортов и зависимостей
"""

import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Создаем FastAPI приложение
app = FastAPI(
    title="🚀 TeleShop Constructor - Simple API",
    description="Простой Backend API для TeleShop Constructor",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Главная страница API"""
    return {
        "message": "🚀 TeleShop Constructor Backend API",
        "status": "online",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "auth": "/auth/*"
        }
    }

@app.get("/health")
async def health_check():
    """Проверка состояния сервиса"""
    return {
        "status": "healthy",
        "message": "Backend API is running",
        "port": 8000
    }

@app.get("/auth/status")
async def auth_status():
    """Статус системы авторизации"""
    return {
        "auth_system": "telegram_bot",
        "bot": "@odnorazki_by_bot",
        "status": "active"
    }

@app.get("/api/users")
async def get_users():
    """Получить список пользователей"""
    return {
        "users": [],
        "total": 0,
        "message": "API endpoint working"
    }

@app.get("/api/shops")
async def get_shops():
    """Получить список магазинов"""
    return {
        "shops": [],
        "total": 0,
        "message": "API endpoint working"
    }

if __name__ == "__main__":
    print("🚀 Запуск TeleShop Constructor - Simple Backend API")
    print("━" * 50)
    print("✅ Простой Backend API")
    print("✅ CORS настроен")
    print("✅ Health check доступен")
    print("━" * 50)
    print("🌐 API: http://localhost:8000")
    print("📖 Документация: http://localhost:8000/docs")
    print("━" * 50)
    
    uvicorn.run(
        "simple_backend:app",
        host="0.0.0.0",
        port=8000,
        reload=False
    ) 