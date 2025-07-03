#!/usr/bin/env python3
"""
🔐 Модели для системы авторизации в БД
"""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime, timedelta, timezone

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

from shared.utils.database import Base

class AuthCode(Base):
    """
    🔑 Таблица временных кодов авторизации
    Коды действуют 30 минут
    """
    __tablename__ = "auth_codes"
    
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(6), unique=True, index=True, nullable=False)
    telegram_id = Column(String, nullable=False)
    user_id = Column(Integer, nullable=True)  # Связь с пользователем после создания
    
    # Данные пользователя из Telegram
    telegram_username = Column(String, nullable=True)
    telegram_first_name = Column(String, nullable=True) 
    telegram_last_name = Column(String, nullable=True)
    
    # Временные метки
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    used_at = Column(DateTime(timezone=True), nullable=True)
    is_used = Column(Boolean, default=False)
    
    def __repr__(self):
        return f"<AuthCode(code={self.code}, telegram_id={self.telegram_id}, expires_at={self.expires_at})>"
    
    @property
    def is_expired(self):
        """Проверяет истек ли код"""
        return datetime.now(timezone.utc) > self.expires_at
    
    @property
    def is_valid(self) -> bool:
        """Проверяет валидность кода"""
        if self.is_used:
            return False
        return datetime.now(timezone.utc) < self.expires_at


class UserSession(Base):
    """
    🎫 Таблица активных сессий пользователей
    Сессии действуют 12 часов
    """
    __tablename__ = "user_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    session_token = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    telegram_id = Column(String, nullable=False)
    
    # IP и User-Agent для безопасности
    ip_address = Column(String, nullable=True)
    user_agent = Column(Text, nullable=True)
    
    # Временные метки
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_activity = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Связь с пользователем
    user = relationship("User", back_populates="sessions")
    
    def __repr__(self):
        return f"<UserSession(token={self.session_token[:8]}..., user_id={self.user_id}, expires_at={self.expires_at})>"
    
    @property
    def is_expired(self):
        """Проверяет истекла ли сессия"""
        return datetime.now(timezone.utc) > self.expires_at
    
    @property
    def is_valid(self) -> bool:
        """Проверяет валидность сессии"""
        if not self.is_active:
            return False
        return datetime.now(timezone.utc) < self.expires_at
    
    def extend_session(self, hours=12):
        """Продлевает сессию на указанное количество часов"""
        self.expires_at = datetime.now(timezone.utc) + timedelta(hours=hours)
        self.last_activity = datetime.now(timezone.utc)


class AdminSession(Base):
    """Модель временных админских сессий"""
    __tablename__ = "admin_sessions"

    id = Column(Integer, primary_key=True, index=True)
    admin_token = Column(String, unique=True, index=True, nullable=False)
    ip_address = Column(String, nullable=True)
    user_agent = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_activity = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Дополнительная информация
    login_method = Column(String, default="password")  # password, emergency, etc.
    session_info = Column(Text, nullable=True)  # JSON с дополнительной информацией

    @property
    def is_valid(self) -> bool:
        """Проверяет валидность админской сессии"""
        if not self.is_active:
            return False
        return datetime.now(timezone.utc) < self.expires_at
    
    @property
    def time_left_hours(self) -> float:
        """Возвращает оставшееся время в часах"""
        if not self.is_valid:
            return 0
        delta = self.expires_at - datetime.now(timezone.utc)
        return delta.total_seconds() / 3600


class TelegramUserProfile(Base):
    """
    👤 Профили пользователей из Telegram
    Данные обновляются при каждом входе
    """
    __tablename__ = "telegram_user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, unique=True)
    telegram_id = Column(String, nullable=False)
    
    # Данные профиля Telegram
    username = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    language_code = Column(String(10), nullable=True)
    is_premium = Column(Boolean, default=False, nullable=False)
    
    # Дополнительные данные
    photo_url = Column(Text, nullable=True)  # URL фото профиля
    bio = Column(Text, nullable=True)  # Описание профиля
    
    # Статистика
    first_seen = Column(DateTime(timezone=True), server_default=func.now())
    last_seen = Column(DateTime(timezone=True), server_default=func.now())
    total_logins = Column(Integer, default=1, nullable=False)
    
    # Связь с пользователем
    user = relationship("User", back_populates="telegram_profile")
    
    def __repr__(self):
        return f"<TelegramUserProfile(telegram_id={self.telegram_id}, username={self.username})>"
    
    def update_profile(self, telegram_data: dict):
        """Обновляет профиль данными из Telegram"""
        self.username = telegram_data.get('username')
        self.first_name = telegram_data.get('first_name')
        self.last_name = telegram_data.get('last_name')
        self.language_code = telegram_data.get('language_code')
        self.is_premium = telegram_data.get('is_premium', False)
        self.last_seen = datetime.now(timezone.utc)
        # Увеличиваем счетчик входов только если он уже существует
        if self.total_logins is not None:
            self.total_logins += 1
        else:
            self.total_logins = 1 