from sqlalchemy import Column, Integer, String, Boolean, DateTime
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

class User(Base):
    """Модель пользователя платформы"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    subscription_plan = Column(String, default="free")  # free, pro, enterprise
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    shops = relationship("Shop", back_populates="owner")
    sessions = relationship("UserSession", back_populates="user")
    telegram_profile = relationship("TelegramUserProfile", back_populates="user", uselist=False) 