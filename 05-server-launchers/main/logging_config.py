#!/usr/bin/env python3
"""
📊 Конфигурация логирования для TeleShop Constructor
Централизованное управление логами backend API
"""

import logging
import sys
from datetime import datetime
from typing import Optional

class ColoredFormatter(logging.Formatter):
    """Цветной форматтер для логов в консоли"""
    
    # Цветовые коды ANSI
    COLORS = {
        'DEBUG': '\033[36m',     # Cyan
        'INFO': '\033[32m',      # Green  
        'WARNING': '\033[33m',   # Yellow
        'ERROR': '\033[31m',     # Red
        'CRITICAL': '\033[35m',  # Magenta
        'RESET': '\033[0m'       # Reset
    }
    
    def format(self, record):
        # Получаем цвет для уровня логирования
        color = self.COLORS.get(record.levelname, self.COLORS['RESET'])
        reset = self.COLORS['RESET']
        
        # Форматируем запись
        log_message = super().format(record)
        return f"{color}{log_message}{reset}"

def setup_logging(
    level: str = "INFO",
    log_to_file: bool = False,
    log_file: Optional[str] = None,
    colored_output: bool = True
):
    """
    Настраивает логирование для всего приложения
    
    Args:
        level: Уровень логирования (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        log_to_file: Сохранять ли логи в файл
        log_file: Путь к файлу логов (по умолчанию автогенерация)
        colored_output: Использовать ли цветной вывод в консоли
    """
    
    # Очищаем существующие хендлеры
    logging.getLogger().handlers.clear()
    
    # Устанавливаем уровень логирования
    log_level = getattr(logging, level.upper(), logging.INFO)
    logging.getLogger().setLevel(log_level)
    
    # Формат логов
    log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    date_format = '%Y-%m-%d %H:%M:%S'
    
    # Консольный хендлер
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    
    if colored_output:
        console_formatter = ColoredFormatter(log_format, date_format)
    else:
        console_formatter = logging.Formatter(log_format, date_format)
    
    console_handler.setFormatter(console_formatter)
    logging.getLogger().addHandler(console_handler)
    
    # Файловый хендлер (опционально)
    if log_to_file:
        if not log_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            log_file = f"logs/teleshop_api_{timestamp}.log"
        
        # Создаем директорию если нужно
        import os
        os.makedirs(os.path.dirname(log_file), exist_ok=True)
        
        file_handler = logging.FileHandler(log_file, encoding='utf-8')
        file_handler.setLevel(log_level)
        file_formatter = logging.Formatter(log_format, date_format)
        file_handler.setFormatter(file_formatter)
        logging.getLogger().addHandler(file_handler)
        
        print(f"📄 Логи сохраняются в файл: {log_file}")
    
    # Настройки для конкретных логгеров
    configure_specific_loggers(log_level)
    
    print(f"📊 Логирование настроено | Уровень: {level} | Цветной вывод: {colored_output} | Файл: {log_to_file}")

def configure_specific_loggers(log_level):
    """Настраивает специфичные логгеры для разных компонентов"""
    
    # Логгер для API
    api_logger = logging.getLogger("secure_api")
    api_logger.setLevel(log_level)
    
    # Логгер для авторизации
    auth_logger = logging.getLogger("auth_system")
    auth_logger.setLevel(log_level)
    
    # Логгер для Telegram бота
    bot_logger = logging.getLogger("telegram_bot")
    bot_logger.setLevel(log_level)
    
    # Логгер для базы данных
    db_logger = logging.getLogger("database")
    db_logger.setLevel(log_level)
    
    # Отключаем излишне подробные логи от сторонних библиотек
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("asyncpg").setLevel(logging.WARNING)

def get_logger(name: str) -> logging.Logger:
    """Получает логгер с заданным именем"""
    return logging.getLogger(name)

# Предустановленные конфигурации
PRODUCTION_CONFIG = {
    "level": "WARNING",
    "log_to_file": True,
    "colored_output": False
}

DEVELOPMENT_CONFIG = {
    "level": "INFO", 
    "log_to_file": False,
    "colored_output": True
}

DEBUG_CONFIG = {
    "level": "DEBUG",
    "log_to_file": True,
    "colored_output": True
}

def setup_production_logging():
    """Настройка логирования для продакшена"""
    setup_logging(**PRODUCTION_CONFIG)

def setup_development_logging():
    """Настройка логирования для разработки"""
    setup_logging(**DEVELOPMENT_CONFIG)

def setup_debug_logging():
    """Настройка логирования для отладки"""
    setup_logging(**DEBUG_CONFIG) 