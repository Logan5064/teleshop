from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, JSON
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

class BotSubscriber(Base):
    """Подписчики/пользователи Telegram ботов"""
    __tablename__ = "bot_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=False)
    
    # Данные Telegram пользователя
    telegram_user_id = Column(String, nullable=False, index=True)
    username = Column(String, nullable=True)
    first_name = Column(String, nullable=True)  
    last_name = Column(String, nullable=True)
    language_code = Column(String, nullable=True)
    
    # Статус подписчика
    is_active = Column(Boolean, default=True)
    is_blocked = Column(Boolean, default=False)  # заблокировал ли бота
    
    # Взаимодействие с ботом
    last_interaction = Column(DateTime(timezone=True), nullable=True)
    interaction_count = Column(Integer, default=0)
    
    # Статистика покупок
    orders_count = Column(Integer, default=0)
    total_spent = Column(Integer, default=0)  # в копейках
    
    # Дополнительные данные
    source = Column(String, nullable=True)  # откуда пришел пользователь
    metadata = Column(JSON, nullable=True)  # дополнительная информация
    
    # Даты
    first_seen = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    shop = relationship("Shop", back_populates="subscribers")

    def __repr__(self):
        return f"<BotSubscriber {self.telegram_user_id} for shop {self.shop_id}>" 