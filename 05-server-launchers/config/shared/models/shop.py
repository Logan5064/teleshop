from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

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

class Shop(Base):
    """Основная модель магазина"""
    __tablename__ = "shops"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    
    # Telegram Bot настройки
    bot_token = Column(String, nullable=True)
    bot_username = Column(String, nullable=True)
    bot_webhook_url = Column(String, nullable=True)
    is_bot_active = Column(Boolean, default=False)
    bot_settings = Column(JSON, nullable=True)
    
    # Настройки магазина
    domain_slug = Column(String, unique=True, nullable=True)
    is_published = Column(Boolean, default=False)
    published_at = Column(DateTime)
    currency = Column(String, default="USD")
    language = Column(String, default="ru")
    seo_settings = Column(JSON)
    integrations = Column(JSON)
    blocks_structure = Column(JSON)  # Блочная структура
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="shops")
    # Временно закомментированы до исправления импортов
    # design = relationship("ShopDesign", back_populates="shop", uselist=False)
    # banners = relationship("ShopBanner", back_populates="shop")
    # categories = relationship("ShopCategory", back_populates="shop")
    # products = relationship("Product", back_populates="shop")
    # navigation = relationship("ShopNavigation", back_populates="shop")
    # orders = relationship("Order", back_populates="shop")
    # subscribers = relationship("BotSubscriber", back_populates="shop") 