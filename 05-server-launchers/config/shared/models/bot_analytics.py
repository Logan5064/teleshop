#!/usr/bin/env python3
"""
📊 Модели для аналитики и мониторинга ботов
Отслеживание пользователей, их активности, геолокации
"""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class BotUser(Base):
    """👤 Пользователи ботов (покупатели)"""
    __tablename__ = "bot_users"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Связь с магазином (чей это пользователь)
    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=False)
    
    # Данные пользователя Telegram
    telegram_id = Column(String(50), nullable=False, index=True)  # ID пользователя в Telegram
    username = Column(String(100), nullable=True, index=True)     # @username
    first_name = Column(String(100), nullable=True)              # Имя
    last_name = Column(String(100), nullable=True)               # Фамилия
    language_code = Column(String(10), nullable=True)            # Язык (ru, en, etc.)
    
    # Первый контакт
    first_seen = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_seen = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Статистика
    total_sessions = Column(Integer, default=1, nullable=False)   # Сколько раз заходил
    total_messages = Column(Integer, default=0, nullable=False)   # Сколько сообщений отправил
    is_blocked = Column(Boolean, default=False, nullable=False)   # Заблокировал ли бота
    
    # Связи
    sessions = relationship("BotSession", back_populates="user")
    
    def __repr__(self):
        return f"<BotUser {self.telegram_id} @{self.username}>"


class BotSession(Base):
    """📱 Сессии пользователей в боте"""
    __tablename__ = "bot_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Связи
    user_id = Column(Integer, ForeignKey("bot_users.id"), nullable=False)
    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=False)
    
    # Данные сессии
    started_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    ended_at = Column(DateTime, nullable=True)
    duration_seconds = Column(Integer, default=0, nullable=False)
    
    # Техническая информация
    ip_address = Column(String(45), nullable=True)               # IPv4/IPv6
    user_agent = Column(Text, nullable=True)                     # User-Agent браузера
    device_type = Column(String(20), nullable=True)              # mobile, desktop, tablet
    
    # Геолокация
    country = Column(String(100), nullable=True)                 # Страна
    country_code = Column(String(3), nullable=True)              # RU, US, DE
    city = Column(String(100), nullable=True)                    # Город
    latitude = Column(Float, nullable=True)                      # Широта
    longitude = Column(Float, nullable=True)                     # Долгота
    
    # Активность в сессии
    messages_count = Column(Integer, default=0, nullable=False)  # Сообщений в сессии
    commands_used = Column(Text, nullable=True)                  # JSON список команд
    pages_visited = Column(Text, nullable=True)                  # JSON страниц
    
    # Связи
    user = relationship("BotUser", back_populates="sessions")
    
    def __repr__(self):
        return f"<BotSession {self.user_id} from {self.country}>"


class BotActivity(Base):
    """📊 Детальная активность в боте"""
    __tablename__ = "bot_activity"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Связи
    user_id = Column(Integer, ForeignKey("bot_users.id"), nullable=False)
    session_id = Column(Integer, ForeignKey("bot_sessions.id"), nullable=False)
    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=False)
    
    # Событие
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    event_type = Column(String(50), nullable=False)              # message, command, button_click, etc.
    event_data = Column(Text, nullable=True)                     # JSON с деталями события
    
    # Контекст
    command = Column(String(100), nullable=True)                 # Команда (/start, /help)
    message_text = Column(Text, nullable=True)                   # Текст сообщения
    button_data = Column(String(200), nullable=True)             # Данные кнопки
    
    def __repr__(self):
        return f"<BotActivity {self.event_type} at {self.timestamp}>"


class ShopAnalytics(Base):
    """📈 Аналитика магазина (сводная статистика)"""
    __tablename__ = "shop_analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Связь с магазином
    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=False, unique=True)
    
    # Статистика пользователей
    total_users = Column(Integer, default=0, nullable=False)      # Всего пользователей
    active_users_today = Column(Integer, default=0, nullable=False)
    active_users_week = Column(Integer, default=0, nullable=False)
    active_users_month = Column(Integer, default=0, nullable=False)
    
    # Статистика сессий
    total_sessions = Column(Integer, default=0, nullable=False)
    average_session_duration = Column(Float, default=0.0, nullable=False)  # В минутах
    
    # Статистика сообщений
    total_messages = Column(Integer, default=0, nullable=False)
    messages_today = Column(Integer, default=0, nullable=False)
    
    # География
    top_countries = Column(Text, nullable=True)                   # JSON топ стран
    top_cities = Column(Text, nullable=True)                     # JSON топ городов
    
    # Время обновления
    updated_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<ShopAnalytics shop_id={self.shop_id}, users={self.total_users}>" 