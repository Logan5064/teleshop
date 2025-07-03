# Shared Models
# Общие модели данных для всех модулей 

# Импорт всех моделей для удобства
from .user import User
from .shop import Shop
from .auth_models import AuthCode, UserSession, TelegramUserProfile

# Модели из других модулей будут импортироваться по необходимости
# Избегаем циклических импортов

__all__ = ["User", "Shop"] 