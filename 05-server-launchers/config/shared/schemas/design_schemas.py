from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime

class DesignBase(BaseModel):
    theme_name: str = Field(..., max_length=100)
    primary_color: str = Field("#ff6b35", max_length=7)
    secondary_color: str = Field("#2d2d2d", max_length=7)
    font_family: str = Field("system-ui", max_length=50)

class ShopDesignCreate(DesignBase):
    shop_id: int
    blocks_data: Optional[List[Dict[str, Any]]] = []
    is_active: bool = True

class ShopDesignUpdate(BaseModel):
    theme_name: Optional[str] = Field(None, max_length=100)
    primary_color: Optional[str] = Field(None, max_length=7)
    secondary_color: Optional[str] = Field(None, max_length=7)
    font_family: Optional[str] = Field(None, max_length=50)
    blocks_data: Optional[List[Dict[str, Any]]] = None
    is_active: Optional[bool] = None

class ShopDesignResponse(DesignBase):
    id: int
    shop_id: int
    blocks_data: List[Dict[str, Any]]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Схемы для блоков
class DesignBlock(BaseModel):
    type: str = Field(..., max_length=50)
    title: Optional[str] = Field(None, max_length=200)
    content: Optional[str] = None
    styles: Optional[Dict[str, Any]] = {}
    settings: Optional[Dict[str, Any]] = {}
    order: int = 0

class DesignBlockCreate(DesignBlock):
    pass

class DesignBlockUpdate(BaseModel):
    type: Optional[str] = Field(None, max_length=50)
    title: Optional[str] = Field(None, max_length=200)
    content: Optional[str] = None
    styles: Optional[Dict[str, Any]] = None
    settings: Optional[Dict[str, Any]] = None
    order: Optional[int] = None 