import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from dotenv import load_dotenv

# Добавляем путь к shared модулям (только если запускаем не из своей папки)
if 'shared' not in __file__:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = current_dir
    for _ in range(10):  # Ищем корень проекта
        if os.path.exists(os.path.join(project_root, "main_launcher.py")):
            break
        project_root = os.path.dirname(project_root)
    shared_path = os.path.join(project_root, "05-server-launchers", "config")
    if shared_path not in sys.path:
        sys.path.insert(0, shared_path)

# Загружаем переменные окружения с правильным путем
config_path = os.path.join(os.path.dirname(__file__), "..", "auth_config.env")
load_dotenv(config_path)

# URL базы данных - если не найден в env, используем внешнюю БД напрямую
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Прямое подключение к внешней PostgreSQL БД
    DATABASE_URL = "postgresql+asyncpg://cloud_user:u61e&ke&!Ty1@ladixoofilad.beget.app:5432/default_db"
    print("⚠️ Используем прямое подключение к внешней БД")

print(f"🔗 Подключение к базе данных: {DATABASE_URL.split('://')[0]}://...")

# Настройки для PostgreSQL
engine_kwargs = {
    "echo": False, 
    "future": True,
    "pool_pre_ping": True,
    "pool_recycle": 300,
    "pool_size": 5,
    "max_overflow": 10
}

# Преобразуем URL для PostgreSQL с asyncpg
if DATABASE_URL.startswith("postgresql://"):
    ASYNC_DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
else:
    ASYNC_DATABASE_URL = DATABASE_URL

# Создаем асинхронный движок
engine = create_async_engine(ASYNC_DATABASE_URL, **engine_kwargs)

# Создаем фабрику сессий
AsyncSessionLocal = sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

# Базовый класс для моделей
Base = declarative_base()

# Функция для получения сессии базы данных
async def get_database():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            raise
        finally:
            await session.close()

# Алиас для FastAPI Depends
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            raise
        finally:
            await session.close()

# Функция для создания таблиц
async def create_tables():
    # Импортируем модели для создания таблиц
    from shared.models.user import User
    from shared.models.shop import Shop
    from shared.models.auth_models import AuthCode, UserSession, TelegramUserProfile
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("✅ Таблицы в внешней БД созданы успешно")

# Функция для проверки подключения
async def check_database_connection():
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SELECT 1"))
            result.fetchone()
            print("✅ Подключение к внешней PostgreSQL БД успешно!")
            return True
    except Exception as e:
        print(f"❌ Ошибка подключения к внешней БД: {e}")
        return False 