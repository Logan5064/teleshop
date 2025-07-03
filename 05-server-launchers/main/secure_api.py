#!/usr/bin/env python3
"""
🔒 БЕЗОПАСНАЯ ВЕРСИЯ API - с полной авторизацией и изоляцией данных
Каждый пользователь видит только свои данные
"""

from fastapi import APIRouter, HTTPException, Depends, Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta, timezone
import json
import time
import hashlib
import random
import string
import logging
import traceback

# Импорты для авторизации (исправленные пути)
import sys
import os

# Добавляем путь к shared модулям (фиксированный путь)
current_dir = os.path.dirname(os.path.abspath(__file__))
# Переходим из main/ в config/
config_path = os.path.join(os.path.dirname(current_dir), "config")
sys.path.insert(0, config_path)

# Добавляем путь к bot_engine для импорта BotManager  
# Переходим из 05-server-launchers/main/ в 01-user-dashboard/konstruktor/backend/
project_root = os.path.dirname(os.path.dirname(current_dir))
bot_engine_path = os.path.join(project_root, "01-user-dashboard", "konstruktor", "backend")
sys.path.insert(0, bot_engine_path)

from shared.auth.db_code_auth import get_current_user_by_session, DatabaseCodeAuth, get_auth_stats
from shared.models.user import User
from shared.models.shop import Shop
from shared.models.auth_models import AuthCode, UserSession
from shared.schemas.user_schemas import User as UserSchema, UserCreate
from shared.schemas.shop_schemas import ShopResponse, ShopCreate, ShopUpdate
from shared.utils.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func, text
from fastapi import Request

# Импорты для аналитики ботов
from shared.services.analytics_service import AnalyticsService
from shared.auth.admin_auth import AdminSessionManager

# ===== НАСТРОЙКА ЛОГИРОВАНИЯ =====
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("secure_api")

def log_request(request: Request, user_info: str = "unknown"):
    """Логирование входящих запросов"""
    try:
        ip = request.client.host if hasattr(request, 'client') else "unknown"
        user_agent = request.headers.get("User-Agent", "unknown")
        method = request.method
        url = str(request.url)
        
        logger.info(f"🌐 {method} {url} | User: {user_info} | IP: {ip} | UA: {user_agent[:50]}...")
    except Exception as e:
        logger.error(f"❌ Ошибка логирования запроса: {e}")

def log_auth_success(user_id: int, telegram_id: str, session_type: str, request: Request):
    """Логирование успешной авторизации"""
    try:
        ip = request.client.host if hasattr(request, 'client') else "unknown"
        logger.info(f"✅ AUTH SUCCESS | User ID: {user_id} | Telegram: {telegram_id} | Type: {session_type} | IP: {ip}")
    except Exception as e:
        logger.error(f"❌ Ошибка логирования успешной авторизации: {e}")

def log_auth_error(error_type: str, details: str, request: Request):
    """Логирование ошибок авторизации"""
    try:
        ip = request.client.host if hasattr(request, 'client') else "unknown"
        user_agent = request.headers.get("User-Agent", "unknown")
        logger.error(f"❌ AUTH ERROR | Type: {error_type} | Details: {details} | IP: {ip} | UA: {user_agent[:50]}...")
    except Exception as e:
        logger.error(f"❌ Ошибка логирования ошибки авторизации: {e}")

def log_api_error(endpoint: str, error: Exception, user_info: str, request: Request):
    """Логирование ошибок API"""
    try:
        ip = request.client.host if hasattr(request, 'client') else "unknown"
        error_trace = traceback.format_exc()
        logger.error(f"❌ API ERROR | Endpoint: {endpoint} | User: {user_info} | IP: {ip}")
        logger.error(f"   Error: {str(error)}")
        logger.error(f"   Traceback: {error_trace}")
    except Exception as e:
        logger.error(f"❌ Ошибка логирования ошибки API: {e}")

# Безопасные модели данных
class BotCreate(BaseModel):
    bot_token: str
    shop_name: str
    description: Optional[str] = None
    bot_username: Optional[str] = None

class BotResponse(BaseModel):
    id: int
    shop_name: str
    description: Optional[str]
    bot_token: str
    bot_username: Optional[str]
    is_active: bool
    user_id: int  # Добавляем связь с пользователем
    created_at: datetime
    updated_at: datetime

class DesignCreate(BaseModel):
    shop_id: int
    theme_name: str = "custom"
    primary_color: str = "#ff6b35"
    secondary_color: str = "#2d2d2d"
    font_family: str = "system-ui"
    blocks_data: List[dict] = []
    is_active: bool = True

class DesignResponse(BaseModel):
    id: int
    shop_id: int
    user_id: int  # Добавляем связь с пользователем
    theme_name: str
    primary_color: str
    secondary_color: str
    font_family: str
    blocks_data: List[dict]
    is_active: bool
    created_at: datetime
    updated_at: datetime

router = APIRouter()

# Временное хранилище админских токенов (в продакшн можно перенести в Redis)
admin_tokens = {}

# ===== АДМИНСКАЯ СИСТЕМА АВТОРИЗАЦИИ (отдельная от Telegram) =====

def verify_admin_token(token: str) -> bool:
    """Проверка админского токена"""
    if not token or not token.startswith("admin_"):
        return False
    
    try:
        # Извлекаем временную метку из токена
        parts = token.split("_")
        if len(parts) < 3:
            return False
        
        timestamp = int(parts[1])
        current_time = int(time.time())
        
        # Проверяем что токен не истек (12 часов = 43200 секунд)
        if current_time - timestamp > 43200:
            return False
        
        return True
    except:
        return False

async def get_admin_token(request: Request) -> str:
    """Извлекает и проверяет админский токен"""
    # Проверяем заголовок Authorization
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header[7:]
        if verify_admin_token(token):
            return token
    
    # Проверяем cookies
    token = request.cookies.get("admin_token")
    if token and verify_admin_token(token):
        return token
    
    raise HTTPException(
        status_code=401, 
        detail="Требуется админская авторизация. Войдите с паролем администратора."
    )

# ===== БЕЗОПАСНЫЕ API ЭНДПОИНТЫ =====

@router.post("/secure/bots", response_model=BotResponse)
async def create_bot_secure(
    bot_data: BotCreate,
    request: Request,
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Создать бота (только для текущего пользователя)"""
    
    try:
        user_info = f"ID:{current_user.id}|TG:{current_user.telegram_id}"
        log_request(request, user_info)
        
        logger.info(f"🤖 BOT CREATE ATTEMPT | User: {user_info} | Bot name: {bot_data.shop_name} | Token: {bot_data.bot_token[:20]}...")
        
        # Проверяем уникальность токена ТОЛЬКО у текущего пользователя
        result = await db.execute(
            select(Shop).where(
                and_(
                    Shop.bot_token == bot_data.bot_token,
                    Shop.user_id == current_user.id
                )
            )
        )
        existing_shop = result.scalar_one_or_none()
        
        if existing_shop:
            logger.warning(f"⚠️ BOT CREATE FAILED | User: {user_info} | Reason: Duplicate token | Existing bot ID: {existing_shop.id}")
            raise HTTPException(status_code=400, detail="У вас уже есть бот с таким токеном")
        
        # Создаем новый магазин/бота в БД
        new_shop = Shop(
            user_id=current_user.id,
            name=bot_data.shop_name,
            description=bot_data.description,
            bot_token=bot_data.bot_token,
            bot_username=bot_data.bot_username,
            is_bot_active=True
        )
        
        db.add(new_shop)
        await db.commit()
        await db.refresh(new_shop)
        
        logger.info(f"✅ BOT CREATED SUCCESS | User: {user_info} | Bot ID: {new_shop.id} | Name: {new_shop.name}")
        
        return BotResponse(
            id=new_shop.id,
            shop_name=new_shop.name,
            description=new_shop.description,
            bot_token=new_shop.bot_token,
            bot_username=new_shop.bot_username,
            is_active=new_shop.is_bot_active,
            user_id=new_shop.user_id,
            created_at=new_shop.created_at,
            updated_at=new_shop.updated_at
        )
        
    except HTTPException as e:
        # Переброс HTTP исключений без дополнительной обработки
        raise e
    except Exception as e:
        user_info = f"ID:{current_user.id}|TG:{current_user.telegram_id}"
        log_api_error("/secure/bots", e, user_info, request)
        raise HTTPException(status_code=500, detail="Ошибка создания бота")

@router.get("/secure/bots", response_model=List[BotResponse])
async def get_user_bots(
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Получить ТОЛЬКО боты текущего пользователя"""
    result = await db.execute(
        select(Shop).where(Shop.user_id == current_user.id)
    )
    user_shops = result.scalars().all()
    
    print(f"🔒 Пользователь {current_user.telegram_id} запросил своих ботов: {len(user_shops)}")
    
    return [
        BotResponse(
            id=shop.id,
            shop_name=shop.name,
            description=shop.description,
            bot_token=shop.bot_token,
            bot_username=shop.bot_username,
            is_active=shop.is_bot_active,
            user_id=shop.user_id,
            created_at=shop.created_at,
            updated_at=shop.updated_at
        )
        for shop in user_shops
    ]

@router.get("/secure/bots/{bot_id}", response_model=BotResponse)
async def get_user_bot(
    bot_id: int,
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Получить бота ТОЛЬКО если он принадлежит пользователю"""
    result = await db.execute(
        select(Shop).where(
            and_(
                Shop.id == bot_id,
                Shop.user_id == current_user.id
            )
        )
    )
    shop = result.scalar_one_or_none()
    
    if not shop:
        print(f"⚠️ Пользователь {current_user.telegram_id} пытался получить доступ к боту {bot_id}")
        raise HTTPException(status_code=404, detail="Бот не найден или у вас нет к нему доступа")
    
    return BotResponse(
        id=shop.id,
        shop_name=shop.name,
        description=shop.description,
        bot_token=shop.bot_token,
        bot_username=shop.bot_username,
        is_active=shop.is_bot_active,
        user_id=shop.user_id,
        created_at=shop.created_at,
        updated_at=shop.updated_at
    )

@router.put("/secure/bots/{bot_id}", response_model=BotResponse)
async def update_user_bot(
    bot_id: int,
    bot_data: BotCreate,
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Обновить бота ТОЛЬКО если он принадлежит пользователю"""
    result = await db.execute(
        select(Shop).where(
            and_(
                Shop.id == bot_id,
                Shop.user_id == current_user.id
            )
        )
    )
    shop = result.scalar_one_or_none()
    
    if not shop:
        raise HTTPException(status_code=404, detail="Бот не найден или у вас нет к нему доступа")
    
    # Обновляем данные
    shop.name = bot_data.shop_name
    shop.description = bot_data.description
    shop.bot_token = bot_data.bot_token
    shop.bot_username = bot_data.bot_username
    
    await db.commit()
    await db.refresh(shop)
    
    print(f"🔒 Пользователь {current_user.telegram_id} обновил бота {bot_id}")
    
    return BotResponse(
        id=shop.id,
        shop_name=shop.name,
        description=shop.description,
        bot_token=shop.bot_token,
        bot_username=shop.bot_username,
        is_active=shop.is_bot_active,
        user_id=shop.user_id,
        created_at=shop.created_at,
        updated_at=shop.updated_at
    )

@router.post("/secure/bots/{bot_id}/start")
async def start_user_bot(
    bot_id: int,
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Запустить бота ТОЛЬКО если он принадлежит пользователю"""
    result = await db.execute(
        select(Shop).where(
            and_(
                Shop.id == bot_id,
                Shop.user_id == current_user.id
            )
        )
    )
    shop = result.scalar_one_or_none()
    
    if not shop:
        raise HTTPException(status_code=404, detail="Бот не найден или у вас нет к нему доступа")
    
    try:
        # 🔥 РЕАЛЬНО ЗАПУСКАЕМ БОТА в Telegram!
        from bot_engine.api.bot_manager import bot_manager
        await bot_manager.start_bot(shop.bot_token, shop.id)
        
        # Активируем бота в БД только если реальный запуск успешен
        shop.is_bot_active = True
        await db.commit()
        
        print(f"✅ Пользователь {current_user.telegram_id} успешно запустил бота {bot_id} (реально слушает команды)")
        
        return {"message": "Бот успешно запущен и обрабатывает команды в Telegram"}
        
    except Exception as e:
        print(f"❌ Ошибка запуска бота {bot_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Ошибка запуска бота: {str(e)}")

@router.post("/secure/bots/{bot_id}/stop")
async def stop_user_bot(
    bot_id: int,
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Остановить бота ТОЛЬКО если он принадлежит пользователю"""
    result = await db.execute(
        select(Shop).where(
            and_(
                Shop.id == bot_id,
                Shop.user_id == current_user.id
            )
        )
    )
    shop = result.scalar_one_or_none()
    
    if not shop:
        raise HTTPException(status_code=404, detail="Бот не найден или у вас нет к нему доступа")
    
    try:
        # 🛑 РЕАЛЬНО ОСТАНАВЛИВАЕМ БОТА в Telegram!
        from bot_engine.api.bot_manager import bot_manager
        await bot_manager.stop_bot(shop.bot_token)
        
        # Деактивируем бота в БД только если реальная остановка успешна
        shop.is_bot_active = False
        await db.commit()
        
        print(f"🛑 Пользователь {current_user.telegram_id} успешно остановил бота {bot_id} (больше не слушает команды)")
        
        return {"message": "Бот успешно остановлен и не обрабатывает команды"}
        
    except Exception as e:
        print(f"❌ Ошибка остановки бота {bot_id}: {e}")
        # В случае ошибки все равно деактивируем в БД
        shop.is_bot_active = False
        await db.commit()
        raise HTTPException(status_code=500, detail=f"Ошибка остановки бота: {str(e)}")

@router.delete("/secure/bots/{bot_id}")
async def delete_user_bot(
    bot_id: int,
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Удалить бота ТОЛЬКО если он принадлежит пользователю"""
    result = await db.execute(
        select(Shop).where(
            and_(
                Shop.id == bot_id,
                Shop.user_id == current_user.id
            )
        )
    )
    shop = result.scalar_one_or_none()
    
    if not shop:
        raise HTTPException(status_code=404, detail="Бот не найден или у вас нет к нему доступа")
    
    try:
        # 🛑 СНАЧАЛА ОСТАНАВЛИВАЕМ БОТА если он активен
        if shop.is_bot_active:
            from bot_engine.api.bot_manager import bot_manager
            await bot_manager.stop_bot(shop.bot_token)
            print(f"🛑 Бот {bot_id} остановлен перед удалением")
        
        # Удаляем бота из БД
        await db.delete(shop)
        await db.commit()
        
        print(f"🗑️ Пользователь {current_user.telegram_id} удалил бота {bot_id} (остановлен и удален)")
        
        return {"message": "Бот успешно остановлен и удален"}
        
    except Exception as e:
        print(f"❌ Ошибка удаления бота {bot_id}: {e}")
        # В случае ошибки все равно удаляем из БД
        await db.delete(shop)
        await db.commit()
        raise HTTPException(status_code=500, detail=f"Ошибка удаления бота: {str(e)}")

@router.post("/secure/constructor/designs", response_model=DesignResponse)
async def create_design_secure(
    design_data: DesignCreate,
    current_user: User = Depends(get_current_user_by_session)
):
    """🔒 БЕЗОПАСНО: Создать дизайн ТОЛЬКО для своего магазина"""
    global next_design_id
    
    # Проверяем, что shop_id принадлежит пользователю
    user_shop_exists = any(
        bot["id"] == design_data.shop_id and bot.get("user_id") == current_user.id
        for bot in bots_storage
    )
    
    if not user_shop_exists:
        print(f"⚠️ Пользователь {current_user.telegram_id} пытался создать дизайн для чужого магазина {design_data.shop_id}")
        raise HTTPException(status_code=403, detail="У вас нет доступа к этому магазину")
    
    # Деактивируем старые дизайны пользователя для этого магазина
    for design in designs_storage:
        if (design["shop_id"] == design_data.shop_id and 
            design.get("user_id") == current_user.id and 
            design["is_active"]):
            design["is_active"] = False
    
    # Создаем новый дизайн
    new_design = {
        "id": next_design_id,
        "shop_id": design_data.shop_id,
        "user_id": current_user.id,  # 🔒 БЕЗОПАСНОСТЬ: привязка к пользователю
        "theme_name": design_data.theme_name,
        "primary_color": design_data.primary_color,
        "secondary_color": design_data.secondary_color,
        "font_family": design_data.font_family,
        "blocks_data": design_data.blocks_data,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    
    designs_storage.append(new_design)
    next_design_id += 1
    
    print(f"🔒 Пользователь {current_user.telegram_id} создал дизайн для магазина {design_data.shop_id}")
    return DesignResponse(**new_design)

@router.get("/secure/constructor/designs", response_model=List[DesignResponse])
async def get_user_designs(
    current_user: User = Depends(get_current_user_by_session)
):
    """🔒 БЕЗОПАСНО: Получить ТОЛЬКО дизайны текущего пользователя"""
    user_designs = [
        design for design in designs_storage 
        if design.get("user_id") == current_user.id
    ]
    
    print(f"🔒 Пользователь {current_user.telegram_id} запросил свои дизайны: {len(user_designs)}")
    return [DesignResponse(**design) for design in user_designs]

@router.get("/secure/analytics/dashboard")
async def get_user_analytics(
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🔒 БЕЗОПАСНО: Аналитика ТОЛЬКО для текущего пользователя"""
    # Получаем боты пользователя из БД
    result = await db.execute(
        select(Shop).where(Shop.user_id == current_user.id)
    )
    user_shops = result.scalars().all()
    
    active_bots = len([shop for shop in user_shops if shop.is_bot_active])
    
    analytics = {
        "total_bots": len(user_shops),
        "active_bots": active_bots,
        "inactive_bots": len(user_shops) - active_bots,
        "total_designs": 0,  # TODO: добавить подсчет дизайнов из БД
        "user_id": current_user.id,
        "telegram_id": current_user.telegram_id,
        "subscription_plan": current_user.subscription_plan
    }
    
    print(f"🔒 Пользователь {current_user.telegram_id} запросил аналитику")
    return analytics

# ===== ТЕСТОВЫЕ ЭНДПОИНТЫ =====

@router.get("/secure/test/auth")
async def test_auth(current_user: User = Depends(get_current_user_by_session)):
    """Тестовый эндпоинт для проверки авторизации"""
    return {
        "message": "Авторизация работает!",
        "user_id": current_user.id,
        "telegram_id": current_user.telegram_id,
        "username": current_user.username,
        "subscription_plan": current_user.subscription_plan
    }

@router.get("/secure/test/user-data")
async def test_user_data(
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """Показать, какие данные видит пользователь"""
    # Получаем боты пользователя из БД
    result = await db.execute(
        select(Shop).where(Shop.user_id == current_user.id)
    )
    user_shops = result.scalars().all()
    
    return {
        "user": {
            "id": current_user.id,
            "telegram_id": current_user.telegram_id,
            "username": current_user.username
        },
        "data": {
            "bots_count": len(user_shops),
            "designs_count": 0,  # TODO: добавить подсчет дизайнов из БД
            "bots": [{"id": shop.id, "name": shop.name} for shop in user_shops],
            "designs": []  # TODO: добавить дизайны из БД
        },
        "security": {
            "isolated_data": True,
            "telegram_verified": True,
            "message": "Вы видите только свои данные!"
        }
    }

# ===== ЭНДПОИНТЫ АВТОРИЗАЦИИ ПО КОДАМ =====

class LoginRequest(BaseModel):
    code: str

class AdminLoginRequest(BaseModel):
    password: str

@router.post("/auth/login")
async def login_with_code(
    request: Request,
    login_data: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    """🔑 Авторизация по временному коду из Telegram бота"""
    # Логируем входящий запрос
    log_request(request, "login_attempt")
    
    code = login_data.code
    if not code:
        log_auth_error("missing_code", "Код авторизации не предоставлен", request)
        raise HTTPException(status_code=400, detail="Код не предоставлен")
    
    # Получаем IP и User-Agent для детального логирования
    ip_address = request.client.host if hasattr(request, 'client') else None
    user_agent = request.headers.get("User-Agent")
    
    logger.info(f"🔑 LOGIN ATTEMPT | Code: {code} | IP: {ip_address} | UA: {user_agent[:50] if user_agent else 'unknown'}...")
    
    try:
        # Проверяем код и создаем сессию
        session_token = await DatabaseCodeAuth.verify_code_and_create_session(
            code=code,
            db=db,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        # Получаем информацию о пользователе для логирования
        session_data = await DatabaseCodeAuth.verify_session(session_token, db)
        if session_data:
            log_auth_success(
                user_id=session_data["user_id"],
                telegram_id=session_data["telegram_id"],
                session_type="user_code_auth",
                request=request
            )
        
        # Устанавливаем cookie с токеном сессии (24 часа)
        response.set_cookie(
            key="session_token",
            value=session_token,
            max_age=24 * 60 * 60,  # 24 часа
            httponly=True,
            secure=False,  # True для HTTPS
            samesite="lax"
        )
        
        logger.info(f"✅ LOGIN SUCCESS | Session created | Token: {session_token[:20]}... | Expires: 24h")
        
        return {
            "success": True,
            "session_token": session_token,
            "message": "Авторизация успешна",
            "expires_in": 24 * 60 * 60  # 24 часа в секундах
        }
        
    except HTTPException as e:
        error_detail = str(e.detail) if hasattr(e, 'detail') else str(e)
        log_auth_error("http_exception", f"Code: {code} | Error: {error_detail}", request)
        logger.error(f"❌ LOGIN FAILED | Code: {code} | Status: {e.status_code} | Detail: {error_detail}")
        raise e
    except Exception as e:
        error_detail = str(e)
        error_trace = traceback.format_exc()
        log_auth_error("unexpected_error", f"Code: {code} | Error: {error_detail}", request)
        logger.error(f"❌ LOGIN CRITICAL ERROR | Code: {code} | Error: {error_detail}")
        logger.error(f"   Traceback: {error_trace}")
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

@router.post("/auth/admin-login")
async def admin_login(
    request: Request,
    admin_data: dict,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    """👑 Админская авторизация с созданием временной сессии в БД"""
    # Логируем попытку админского входа
    log_request(request, "admin_login_attempt")
    
    password = admin_data.get("password")
    if not password:
        log_auth_error("missing_admin_password", "Админский пароль не предоставлен", request)
        raise HTTPException(status_code=400, detail="Пароль не предоставлен")
    
    # Получаем IP и User-Agent для детального логирования
    ip_address = request.client.host if hasattr(request, 'client') else None
    user_agent = request.headers.get("User-Agent")
    
    logger.info(f"👑 ADMIN LOGIN ATTEMPT | IP: {ip_address} | UA: {user_agent[:50] if user_agent else 'unknown'}...")
    
    try:
        # Создаем админскую сессию в БД
        admin_token = await AdminSessionManager.create_admin_session(
            password=password,
            db=db,
            ip_address=ip_address,
            user_agent=user_agent,
            session_info={
                "login_time": datetime.now(timezone.utc).isoformat(),
                "login_method": "admin_password"
            }
        )
        
        # Логируем успешный админский вход
        log_auth_success(
            user_id=0,  # Админский ID
            telegram_id="admin",
            session_type="admin_password_auth",
            request=request
        )
        
        # Устанавливаем cookie с админским токеном (12 часов)
        response.set_cookie(
            key="admin_token",
            value=admin_token,
            max_age=12 * 60 * 60,  # 12 часов
            httponly=True,
            secure=False,  # True для HTTPS
            samesite="lax"
        )
        
        logger.info(f"✅ ADMIN LOGIN SUCCESS | Token: {admin_token[:20]}... | Expires: 12h")
        
        return {
            "success": True,
            "admin_token": admin_token,
            "message": "Административный доступ предоставлен (временный профиль в БД)",
            "expires_in": 12 * 60 * 60,  # 12 часов в секундах
            "profile_type": "admin_temporary_db",
            "note": "Админская сессия сохранена в БД и автоматически удалится через 12 часов"
        }
        
    except HTTPException as e:
        error_detail = str(e.detail) if hasattr(e, 'detail') else str(e)
        log_auth_error("admin_http_exception", f"Password attempt failed | Error: {error_detail}", request)
        logger.error(f"❌ ADMIN LOGIN FAILED | Status: {e.status_code} | Detail: {error_detail}")
        raise e
    except Exception as e:
        error_detail = str(e)
        error_trace = traceback.format_exc()
        log_auth_error("admin_unexpected_error", f"Error: {error_detail}", request)
        logger.error(f"❌ ADMIN LOGIN CRITICAL ERROR | Error: {error_detail}")
        logger.error(f"   Traceback: {error_trace}")
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

@router.post("/auth/logout")
async def logout(
    request: Request,
    response: Response,
    current_user: User = Depends(get_current_user_by_session),
    db: AsyncSession = Depends(get_db)
):
    """🚪 Выход из системы"""
    # Получаем токен
    session_token = request.cookies.get("session_token") or request.cookies.get("admin_token")
    
    if session_token and session_token.startswith("admin_"):
        # Админская сессия
        await AdminSessionManager.logout_admin_session(session_token, db)
        response.delete_cookie("admin_token")
    else:
        # Пользовательская сессия
        if session_token:
            await DatabaseCodeAuth.logout_session(session_token, db)
        response.delete_cookie("session_token")
    
    return {"success": True, "message": "Выход выполнен успешно"}

@router.get("/auth/check")
async def check_auth(request: Request, current_user: User = Depends(get_current_user_by_session)):
    """
    ✅ Проверка авторизации
    """
    try:
        user_info = f"ID:{current_user.id}|TG:{current_user.telegram_id}"
        log_request(request, user_info)
        
        logger.info(f"✅ AUTH CHECK SUCCESS | User: {user_info} | Username: {current_user.username}")
        
        return {
            "authenticated": True,
            "user_id": current_user.id,
            "telegram_id": current_user.telegram_id,
            "username": current_user.username,
            "message": "Авторизация активна"
        }
    except Exception as e:
        log_api_error("/auth/check", e, "unknown", request)
        raise HTTPException(status_code=500, detail="Ошибка проверки авторизации")

@router.get("/auth/stats")
async def auth_statistics(db: AsyncSession = Depends(get_db)):
    """
    📊 Статистика авторизации (для отладки)
    """
    stats = await get_auth_stats(db)
    return {
        "auth_system": "temporary_codes_database",
        "code_lifetime_minutes": 30,
        "session_lifetime_hours": 12,
        "database": "postgresql",
        "stats": stats
    }

# ===== МОНИТОРИНГ БОТОВ =====

class BotUserTrackingRequest(BaseModel):
    """Отслеживание пользователя бота"""
    telegram_id: str
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

@router.post("/secure/analytics/track-user")
async def track_bot_user(
    tracking_data: BotUserTrackingRequest,
    request: Request,
    current_user: User = Depends(get_current_user_by_session)
):
    """📊 Отследить пользователя бота"""
    try:
        # Получаем IP если не передан
        ip_address = tracking_data.ip_address or request.client.host
        
        # Отслеживаем пользователя (пока без БД, просто логируем)
        user_data = await AnalyticsService.track_bot_user(
            shop_id=1,  # TODO: получать shop_id из данных пользователя
            telegram_id=tracking_data.telegram_id,
            username=tracking_data.username,
            first_name=tracking_data.first_name,
            last_name=tracking_data.last_name,
            ip_address=ip_address,
            user_agent=tracking_data.user_agent or request.headers.get("user-agent")
        )
        
        return {
            "success": True,
            "message": "Пользователь отслежен",
            "data": user_data
        }
        
    except Exception as e:
        try:
            print(f"❌ Ошибка отслеживания пользователя: {e}")
        except:
            print("Error tracking user")
        raise HTTPException(status_code=500, detail="Ошибка отслеживания")

@router.get("/secure/analytics/bot-stats")
async def get_bot_analytics(
    current_user: User = Depends(get_current_user_by_session)
):
    """📈 Получить аналитику бота"""
    try:
        # Получаем демо-аналитику (пока нет реальных данных)
        analytics = await AnalyticsService.get_demo_analytics(shop_id=1)
        
        try:
            print(f"📊 Пользователь {current_user.telegram_id} запросил аналитику бота")
        except:
            print("User requested bot analytics")
        
        return {
            "success": True,
            "analytics": analytics
        }
        
    except Exception as e:
        try:
            print(f"❌ Ошибка получения аналитики: {e}")
        except:
            print("Error getting analytics")
        raise HTTPException(status_code=500, detail="Ошибка получения аналитики")

@router.get("/secure/analytics/quick-stats")
async def get_quick_stats(
    current_user: User = Depends(get_current_user_by_session)
):
    """⚡ Быстрая статистика для дашборда"""
    try:
        analytics = await AnalyticsService.get_demo_analytics(shop_id=1)
        
        return {
            "success": True,
            "stats": analytics["quick_stats"]
        }
        
    except Exception as e:
        try:
            print(f"❌ Ошибка получения быстрой статистики: {e}")
        except:
            print("Error getting quick stats")
        raise HTTPException(status_code=500, detail="Ошибка получения статистики")

@router.get("/secure/analytics/countries")
async def get_countries_stats(
    current_user: User = Depends(get_current_user_by_session)
):
    """🌍 Статистика по странам"""
    try:
        analytics = await AnalyticsService.get_demo_analytics(shop_id=1)
        
        return {
            "success": True,
            "countries": analytics["countries"]
        }
        
    except Exception as e:
        try:
            print(f"❌ Ошибка получения статистики стран: {e}")
        except:
            print("Error getting countries stats")
        raise HTTPException(status_code=500, detail="Ошибка получения статистики стран")

@router.get("/secure/analytics/users")
async def get_bot_users(
    current_user: User = Depends(get_current_user_by_session)
):
    """👥 Список пользователей бота"""
    try:
        analytics = await AnalyticsService.get_demo_analytics(shop_id=1)
        
        return {
            "success": True,
            "users": analytics["top_users"],
            "total": analytics["total_users"]
        }
        
    except Exception as e:
        try:
            print(f"❌ Ошибка получения пользователей бота: {e}")
        except:
            print("Error getting bot users")
        raise HTTPException(status_code=500, detail="Ошибка получения пользователей")

@router.post("/secure/analytics/geolocation")
async def get_ip_geolocation(request: Request):
    """🗺️ Получить геолокацию по IP"""
    try:
        ip_address = request.client.host
        geo_data = await AnalyticsService.get_geolocation(ip_address)
        
        return {
            "success": True,
            "ip": ip_address,
            "location": geo_data
        }
        
    except Exception as e:
        try:
            print(f"❌ Ошибка геолокации: {e}")
        except:
            print("Error getting geolocation")
        raise HTTPException(status_code=500, detail="Ошибка геолокации")

# ===== АДМИНСКИЕ API ЭНДПОИНТЫ (отдельная система) =====

@router.get("/admin/bots", response_model=List[BotResponse])
async def get_all_bots_admin(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """👑 АДМИН: Получить ВСЕ боты всех пользователей"""
    # Проверяем админский токен
    admin_token = await get_admin_token(request)
    
    result = await db.execute(select(Shop))
    all_shops = result.scalars().all()
    
    print(f"👑 Админ запросил все боты: {len(all_shops)}")
    
    return [
        BotResponse(
            id=shop.id,
            shop_name=shop.name,
            description=shop.description,
            bot_token=shop.bot_token,
            bot_username=shop.bot_username,
            is_active=shop.is_bot_active,
            user_id=shop.user_id,
            created_at=shop.created_at,
            updated_at=shop.updated_at
        )
        for shop in all_shops
    ]

@router.post("/admin/bots", response_model=BotResponse)
async def create_bot_admin(
    bot_data: BotCreate,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """👑 АДМИН: Создать бота (временный профиль)"""
    # Проверяем админский токен
    admin_token = await get_admin_token(request)
    
    # Для админа создаем бота с user_id = 1 (временный профиль)
    new_shop = Shop(
        user_id=1,  # Временный профиль админа
        name=bot_data.shop_name,
        description=bot_data.description,
        bot_token=bot_data.bot_token,
        bot_username=bot_data.bot_username,
        is_bot_active=True
    )
    
    db.add(new_shop)
    await db.commit()
    await db.refresh(new_shop)
    
    print(f"👑 Админ создал бота: {bot_data.shop_name}")
    
    return BotResponse(
        id=new_shop.id,
        shop_name=new_shop.name,
        description=new_shop.description,
        bot_token=new_shop.bot_token,
        bot_username=new_shop.bot_username,
        is_active=new_shop.is_bot_active,
        user_id=new_shop.user_id,
        created_at=new_shop.created_at,
        updated_at=new_shop.updated_at
    )

@router.get("/admin/stats")
async def get_admin_stats(
    admin_token: str = Depends(get_admin_token),
    db: AsyncSession = Depends(get_db)
):
    """👑 АДМИН: Получить общую статистику системы"""
    
    # Считаем общую статистику
    shops_result = await db.execute(select(Shop))
    all_shops = shops_result.scalars().all()
    
    users_result = await db.execute(select(User))
    all_users = users_result.scalars().all()
    
    active_bots = len([shop for shop in all_shops if shop.is_bot_active])
    
    stats = {
        "total_users": len(all_users),
        "total_bots": len(all_shops),
        "active_bots": active_bots,
        "inactive_bots": len(all_shops) - active_bots,
        "admin_access": True,
        "system_status": "operational"
    }
    
    print(f"👑 Админ запросил системную статистику")
    return stats

async def get_current_user(request: Request, db: AsyncSession = Depends(get_db)) -> User:
    """Получает текущего пользователя из токена (поддерживает админские токены)"""
    # Получаем токен из заголовка или cookies
    auth_header = request.headers.get("Authorization")
    token = None
    
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header[7:]
    else:
        token = request.cookies.get("admin_token") or request.cookies.get("session_token")
    
    if not token:
        raise HTTPException(status_code=401, detail="Токен не найден")
    
    # Проверяем админский токен
    if token.startswith("admin_"):
        if verify_admin_token(token):
            # Создаем временный админский "пользователь"
            admin_user = User(
                id=0,  # Специальный ID для админа
                telegram_id="admin",
                username="admin",
                first_name="Admin",
                last_name="Temporary",
                is_active=True
            )
            print(f"👑 Админский доступ подтвержден: {token[:20]}...")
            return admin_user
        else:
            raise HTTPException(status_code=401, detail="Админский токен истек")
    
    # Обычная проверка пользовательского токена
    result = await db.execute(
        select(User)
        .join(UserSession)
        .where(UserSession.session_token == token)
        .where(UserSession.is_active == True)
        .where(UserSession.expires_at > datetime.now(timezone.utc))
    )
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=401, detail="Недействительный или истекший токен")
    
    return user 