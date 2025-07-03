#!/usr/bin/env python3
"""
📊 Схемы для API аналитики ботов
"""

from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

# ===== СХЕМЫ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ БОТОВ =====

class BotUserCreate(BaseModel):
    """Создание нового пользователя бота"""
    telegram_id: str
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    language_code: Optional[str] = None

class BotUserResponse(BaseModel):
    """Ответ с данными пользователя бота"""
    id: int
    shop_id: int
    telegram_id: str
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    language_code: Optional[str]
    first_seen: datetime
    last_seen: datetime
    total_sessions: int
    total_messages: int
    is_blocked: bool
    
    class Config:
        from_attributes = True

# ===== СХЕМЫ ДЛЯ СЕССИЙ =====

class BotSessionCreate(BaseModel):
    """Создание новой сессии"""
    user_telegram_id: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    device_type: Optional[str] = None

class BotSessionUpdate(BaseModel):
    """Обновление сессии (завершение)"""
    ended_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    messages_count: Optional[int] = None
    commands_used: Optional[List[str]] = None
    pages_visited: Optional[List[str]] = None

class BotSessionResponse(BaseModel):
    """Ответ с данными сессии"""
    id: int
    user_id: int
    shop_id: int
    started_at: datetime
    ended_at: Optional[datetime]
    duration_seconds: int
    ip_address: Optional[str]
    country: Optional[str]
    country_code: Optional[str]
    city: Optional[str]
    device_type: Optional[str]
    messages_count: int
    
    class Config:
        from_attributes = True

# ===== СХЕМЫ ДЛЯ АКТИВНОСТИ =====

class BotActivityCreate(BaseModel):
    """Создание записи активности"""
    user_telegram_id: str
    session_id: Optional[int] = None
    event_type: str  # message, command, button_click, etc.
    event_data: Optional[Dict[str, Any]] = None
    command: Optional[str] = None
    message_text: Optional[str] = None
    button_data: Optional[str] = None

class BotActivityResponse(BaseModel):
    """Ответ с данными активности"""
    id: int
    user_id: int
    session_id: int
    shop_id: int
    timestamp: datetime
    event_type: str
    command: Optional[str]
    message_text: Optional[str]
    
    class Config:
        from_attributes = True

# ===== АНАЛИТИКА =====

class CountryStats(BaseModel):
    """Статистика по стране"""
    country: str
    country_code: str
    users_count: int
    percentage: float

class HourlyStats(BaseModel):
    """Статистика по часам"""
    hour: int
    users_count: int
    messages_count: int

class DailyStats(BaseModel):
    """Статистика по дням"""
    date: str
    users_count: int
    new_users: int
    messages_count: int
    sessions_count: int

class TopUser(BaseModel):
    """Топ пользователь"""
    telegram_id: str
    username: Optional[str]
    first_name: Optional[str]
    messages_count: int
    sessions_count: int
    last_seen: datetime

class ShopAnalyticsResponse(BaseModel):
    """Полная аналитика магазина"""
    # Основная статистика
    total_users: int
    active_users_today: int
    active_users_week: int
    active_users_month: int
    total_sessions: int
    total_messages: int
    average_session_duration: float
    
    # География
    top_countries: List[CountryStats]
    
    # Активность по времени
    hourly_stats: List[HourlyStats]
    daily_stats: List[DailyStats]
    
    # Топ пользователи
    top_users: List[TopUser]
    
    # Метаданные
    updated_at: datetime

class AnalyticsFilter(BaseModel):
    """Фильтры для аналитики"""
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    country: Optional[str] = None
    limit: Optional[int] = 100

# ===== БЫСТРЫЕ СТАТИСТИКИ =====

class QuickStats(BaseModel):
    """Быстрая статистика для дашборда"""
    users_online_now: int
    users_today: int
    messages_today: int
    new_users_today: int
    top_country: Optional[str]
    growth_percentage: float  # Рост пользователей относительно вчера 