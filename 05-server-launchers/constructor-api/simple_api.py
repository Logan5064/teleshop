# -*- coding: utf-8 -*-
"""
Simple Constructor API
Упрощенная версия без SQLAlchemy для тестирования
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from datetime import datetime
from typing import Dict, Any, List

app = FastAPI(title="Constructor API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Временное хранилище в памяти
designs_storage: Dict[int, Dict[str, Any]] = {}
next_id = 1

@app.get("/")
def root():
    return {
        "service": "Constructor API Simple",
        "version": "1.0.0",
        "status": "running",
        "port": 8001,
        "storage": "memory"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "designs_count": len(designs_storage)
    }

@app.post("/api/designs")
def create_design(data: Dict[str, Any]):
    """Создать дизайн"""
    global next_id
    
    design = {
        "id": next_id,
        "name": data.get("name", f"Design {next_id}"),
        "telegram_id": data.get("telegram_id", "test_user"),
        "blocks": data.get("blocks", []),
        "metadata": data.get("metadata", {}),
        "created_at": datetime.now().isoformat()
    }
    
    designs_storage[next_id] = design
    current_id = next_id
    next_id += 1
    
    return {
        "design_id": current_id,
        "message": "Дизайн создан",
        "status": "success"
    }

@app.get("/api/designs/{design_id}")
def get_design(design_id: int):
    """Получить дизайн"""
    if design_id not in designs_storage:
        return {"error": "Design not found"}, 404
    
    return designs_storage[design_id]

@app.get("/api/designs/user/{telegram_id}")
def get_user_designs(telegram_id: str):
    """Дизайны пользователя"""
    user_designs = [
        design for design in designs_storage.values()
        if design["telegram_id"] == telegram_id
    ]
    
    return {
        "telegram_id": telegram_id,
        "count": len(user_designs),
        "designs": user_designs
    }

@app.get("/api/stats")
def get_stats():
    """Статистика"""
    return {
        "total_designs": len(designs_storage),
        "api_version": "1.0.0",
        "storage": "memory"
    }

if __name__ == "__main__":
    print("🎨 Starting Simple Constructor API...")
    print("📍 Port: 8001")
    print("💾 Storage: In-Memory")
    
    uvicorn.run(app, host="0.0.0.0", port=8001) 