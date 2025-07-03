from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    telegram_id: str
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: Optional[bool] = None
    subscription_plan: Optional[str] = None

class UserResponse(UserBase):
    """Схема для ответа API с данными пользователя"""
    id: int
    is_active: bool
    subscription_plan: str
    created_at: datetime

    class Config:
        from_attributes = True

class User(UserBase):
    """Схема пользователя"""
    id: int
    is_active: bool
    subscription_plan: str
    created_at: datetime

    class Config:
        from_attributes = True 