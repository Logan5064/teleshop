"""
📝 Pydantic Schemas
Схемы для валидации данных Constructor API
"""

from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

# === DESIGN SCHEMAS ===

class DesignCreate(BaseModel):
    name: str
    user_id: Optional[str] = None
    telegram_id: str
    blocks: List[Dict[str, Any]]
    metadata: Optional[Dict[str, Any]] = {}
    is_published: Optional[bool] = False

class DesignResponse(BaseModel):
    id: int
    name: str
    user_id: Optional[str]
    telegram_id: str
    blocks: List[Dict[str, Any]]
    metadata: Dict[str, Any]
    is_published: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# === TEMPLATE SCHEMAS ===

class TemplateResponse(BaseModel):
    id: int
    name: str
    category: str
    description: Optional[str]
    blocks: List[Dict[str, Any]]
    metadata: Dict[str, Any]
    preview_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# === API RESPONSES ===

class APIResponse(BaseModel):
    message: str
    status: str
    data: Optional[Dict[str, Any]] = None

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    database: str

class StatsResponse(BaseModel):
    total_designs: int
    published_designs: int
    total_templates: int
    api_version: str 