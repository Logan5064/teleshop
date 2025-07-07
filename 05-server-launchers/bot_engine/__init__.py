"""
🤖 BotManager - Система управления пользовательскими Telegram ботами
Управляет множественными ботами клиентов SaaS платформы
"""

from .manager import BotManager
from .bot_instance import TelegramBotInstance

__all__ = ['BotManager', 'TelegramBotInstance'] 