"""
📋 Template Models  
SQLAlchemy модели для готовых шаблонов
"""

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Template(Base):
    """Модель для готовых шаблонов конструктора"""
    __tablename__ = "constructor_templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)  # e-commerce, landing, etc
    description = Column(Text, nullable=True)
    
    # JSON данные
    blocks_json = Column(Text, nullable=False)  # Массив блоков шаблона
    metadata_json = Column(Text, default="{}")  # Настройки шаблона
    
    # Дополнительно
    preview_url = Column(String(500), nullable=True)  # URL превью
    
    # Временные метки
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<Template(id={self.id}, name='{self.name}', category='{self.category}')>" 