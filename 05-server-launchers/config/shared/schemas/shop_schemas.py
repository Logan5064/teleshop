from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class ShopBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None

class ShopCreate(ShopBase):
    pass

class ShopUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    bot_token: Optional[str] = None
    bot_username: Optional[str] = None
    domain_slug: Optional[str] = None
    is_published: Optional[bool] = None
    currency: Optional[str] = None
    language: Optional[str] = None
    seo_settings: Optional[Dict[str, Any]] = None
    integrations: Optional[Dict[str, Any]] = None

class Shop(ShopBase):
    id: int
    user_id: int
    bot_token: Optional[str] = None
    bot_username: Optional[str] = None
    is_bot_active: bool
    domain_slug: Optional[str] = None
    is_published: bool
    currency: str
    language: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Дополнительные схемы для API ботов
class BotCreate(BaseModel):
    bot_token: str = Field(..., min_length=40, max_length=50, description="Токен бота от @BotFather")
    shop_name: str = Field(..., min_length=1, max_length=100, description="Название магазина")
    description: Optional[str] = Field(None, max_length=500, description="Описание магазина")
    bot_username: Optional[str] = Field(None, max_length=50, description="Username бота")

class BotResponse(BaseModel):
    id: int
    shop_name: str
    description: Optional[str]
    bot_token: str
    bot_username: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class ShopResponse(ShopBase):
    id: int
    user_id: int
    bot_token: Optional[str]
    bot_username: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True 