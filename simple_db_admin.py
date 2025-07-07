#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import sys
import os
from datetime import datetime

# Симуляция данных из базы (можно заменить на реальное подключение)
DATABASE_INFO = {
    "connection": {
        "host": "ladixoofilad.beget.app",
        "port": 5432,
        "database": "default_db", 
        "user": "cloud_user",
        "password": "u61e&ke&!Ty1"
    },
    "tables": {
        "users": {
            "count": 7,
            "structure": [
                {"name": "id", "type": "integer", "nullable": False},
                {"name": "telegram_id", "type": "varchar(50)", "nullable": False},
                {"name": "username", "type": "varchar(100)", "nullable": True},
                {"name": "first_name", "type": "varchar(100)", "nullable": True},
                {"name": "is_active", "type": "boolean", "nullable": True},
                {"name": "subscription_plan", "type": "varchar(20)", "nullable": True},
                {"name": "created_at", "type": "timestamp", "nullable": True}
            ],
            "sample_data": [
                {"id": 1, "telegram_id": "123456789", "username": "testuser", "first_name": "Test User", "is_active": True, "subscription_plan": "pro"},
                {"id": 24, "telegram_id": "test_user_123", "username": "test_user", "first_name": "Test", "is_active": True, "subscription_plan": "free"},
                {"id": 3, "telegram_id": "422752975", "username": None, "first_name": None, "is_active": True, "subscription_plan": "free"}
            ]
        },
        "shops": {
            "count": 1,
            "structure": [
                {"name": "id", "type": "integer", "nullable": False},
                {"name": "user_id", "type": "integer", "nullable": False},
                {"name": "name", "type": "varchar(255)", "nullable": False},
                {"name": "description", "type": "text", "nullable": True},
                {"name": "is_published", "type": "boolean", "nullable": True},
                {"name": "currency", "type": "varchar(10)", "nullable": True},
                {"name": "created_at", "type": "timestamp", "nullable": True}
            ],
            "sample_data": [
                {"id": 1, "user_id": 1, "name": "Тестовый магазин", "description": "Демо магазин для тестирования", "is_published": True, "currency": "RUB"}
            ]
        },
        "products": {
            "count": 3,
            "structure": [
                {"name": "id", "type": "integer", "nullable": False},
                {"name": "shop_id", "type": "integer", "nullable": False},
                {"name": "name", "type": "varchar(255)", "nullable": False},
                {"name": "description", "type": "text", "nullable": True},
                {"name": "price", "type": "numeric", "nullable": False},
                {"name": "is_available", "type": "boolean", "nullable": True}
            ],
            "sample_data": [
                {"id": 1, "shop_id": 1, "name": "iPhone 15", "description": "Новейший смартфон Apple", "price": "99999.00", "is_available": True},
                {"id": 2, "shop_id": 1, "name": "Футболка", "description": "Качественная хлопковая футболка", "price": "1999.00", "is_available": True},
                {"id": 3, "shop_id": 1, "name": "Книга по программированию", "description": "Изучение Python", "price": "2499.00", "is_available": True}
            ]
        },
        "shop_categories": {
            "count": 3,
            "structure": [
                {"name": "id", "type": "integer", "nullable": False},
                {"name": "shop_id", "type": "integer", "nullable": False},
                {"name": "name", "type": "varchar(255)", "nullable": False},
                {"name": "emoji", "type": "varchar(10)", "nullable": True},
                {"name": "position", "type": "integer", "nullable": True},
                {"name": "is_active", "type": "boolean", "nullable": True}
            ],
            "sample_data": [
                {"id": 1, "shop_id": 1, "name": "Электроника", "emoji": "📱", "position": 1, "is_active": True},
                {"id": 2, "shop_id": 1, "name": "Одежда", "emoji": "👕", "position": 2, "is_active": True},
                {"id": 3, "shop_id": 1, "name": "Книги", "emoji": "📚", "position": 3, "is_active": True}
            ]
        },
        "subscription_plans": {
            "count": 3,
            "structure": [
                {"name": "id", "type": "integer", "nullable": False},
                {"name": "name", "type": "varchar(100)", "nullable": False},
                {"name": "description", "type": "text", "nullable": True},
                {"name": "price", "type": "numeric", "nullable": False},
                {"name": "max_shops", "type": "integer", "nullable": True},
                {"name": "max_products", "type": "integer", "nullable": True}
            ],
            "sample_data": [
                {"id": 1, "name": "Free", "description": "Бесплатный план", "price": "0.00", "max_shops": 1, "max_products": 10},
                {"id": 2, "name": "Pro", "description": "Профессиональный план", "price": "990.00", "max_shops": 5, "max_products": -1},
                {"id": 3, "name": "Enterprise", "description": "Корпоративный план", "price": "2990.00", "max_shops": -1, "max_products": -1}
            ]
        },
        "user_sessions": {
            "count": 1,
            "structure": [
                {"name": "id", "type": "integer", "nullable": False},
                {"name": "session_token", "type": "varchar(64)", "nullable": False},
                {"name": "user_id", "type": "integer", "nullable": False},
                {"name": "telegram_id", "type": "varchar(50)", "nullable": False},
                {"name": "created_at", "type": "timestamp", "nullable": False},
                {"name": "expires_at", "type": "timestamp", "nullable": False},
                {"name": "is_active", "type": "boolean", "nullable": True}
            ],
            "sample_data": [
                {"id": 24, "session_token": "f899bc54e5deb6147e262187e5d36201b3d5c64b0c2856a560e15ae4e99630d7", "user_id": 3, "telegram_id": "422752975", "is_active": True}
            ]
        }
    }
}

class SimpleDBAdmin:
    def __init__(self):
        self.data = DATABASE_INFO
    
    def show_menu(self):
        """Показать главное меню"""
        print("\n" + "="*80)
        print("🗄️  ТЕЛЕШОП - АДМИН ПАНЕЛЬ БАЗЫ ДАННЫХ (ПРОСМОТР)")
        print("="*80)
        print("1. 📋 Показать все таблицы")
        print("2. 🔍 Просмотреть данные таблицы")
        print("3. 📊 Структура таблицы")
        print("4. 📈 Статистика по таблицам")
        print("5. 🔗 Информация о подключении")
        print("6. 🔍 Поиск по данным")
        print("0. 🚪 Выход")
        print("="*80)
    
    def show_all_tables(self):
        """Показать все таблицы"""
        tables = self.data["tables"]
        print(f"\n📋 Найдено таблиц: {len(tables)}")
        print("-"*80)
        
        for i, (table_name, table_info) in enumerate(tables.items(), 1):
            count = table_info["count"]
            structure_count = len(table_info["structure"])
            print(f"{i:2d}. 📊 {table_name:<25} | Записей: {count:>6} | Колонок: {structure_count:>2}")
    
    def show_table_data(self, table_name):
        """Показать данные таблицы"""
        if table_name not in self.data["tables"]:
            print(f"❌ Таблица '{table_name}' не найдена!")
            return
        
        table_info = self.data["tables"][table_name]
        sample_data = table_info["sample_data"]
        
        print(f"\n📊 ТАБЛИЦА: {table_name}")
        print(f"📈 Всего записей: {table_info['count']} | Показано: {len(sample_data)}")
        print("-"*120)
        
        if not sample_data:
            print("📭 Нет данных для отображения")
            return
        
        # Получаем названия колонок из первой записи
        columns = list(sample_data[0].keys())
        
        # Заголовки
        header = " | ".join([f"{col[:15]:<15}" for col in columns])
        print(f"🏷️  {header}")
        print("-"*120)
        
        # Данные
        for i, row in enumerate(sample_data, 1):
            formatted_row = []
            for col in columns:
                value = row.get(col)
                if value is None:
                    formatted_row.append("NULL".ljust(15))
                elif isinstance(value, bool):
                    formatted_row.append(str(value).ljust(15))
                elif isinstance(value, (dict, list)):
                    formatted_row.append(str(value)[:12].ljust(15) + "...")
                else:
                    formatted_row.append(str(value)[:15].ljust(15))
            
            row_str = " | ".join(formatted_row)
            print(f"{i:3d}. {row_str}")
    
    def show_table_structure(self, table_name):
        """Показать структуру таблицы"""
        if table_name not in self.data["tables"]:
            print(f"❌ Таблица '{table_name}' не найдена!")
            return
        
        structure = self.data["tables"][table_name]["structure"]
        
        print(f"\n🏗️  СТРУКТУРА ТАБЛИЦЫ: {table_name}")
        print("-"*80)
        print(f"{'Колонка':<25} | {'Тип':<20} | {'NULL':<8}")
        print("-"*80)
        
        for col in structure:
            nullable = "YES" if col["nullable"] else "NO"
            print(f"{col['name']:<25} | {col['type']:<20} | {nullable:<8}")
    
    def show_statistics(self):
        """Показать статистику"""
        tables = self.data["tables"]
        print(f"\n📈 СТАТИСТИКА ПО БАЗЕ ДАННЫХ")
        print("-"*60)
        
        total_records = 0
        non_empty_tables = 0
        
        for table_name, table_info in tables.items():
            count = table_info["count"]
            total_records += count
            if count > 0:
                non_empty_tables += 1
                print(f"📊 {table_name:<30} | {count:>8} записей")
        
        print("-"*60)
        print(f"📋 Всего таблиц: {len(tables)}")
        print(f"📊 Таблиц с данными: {non_empty_tables}")
        print(f"📈 Всего записей: {total_records}")
    
    def show_connection_info(self):
        """Показать информацию о подключении"""
        conn = self.data["connection"]
        print(f"\n🔗 ИНФОРМАЦИЯ О ПОДКЛЮЧЕНИИ")
        print("-"*50)
        print(f"🖥️  Хост: {conn['host']}")
        print(f"🔌 Порт: {conn['port']}")
        print(f"🗄️  База данных: {conn['database']}")
        print(f"👤 Пользователь: {conn['user']}")
        print(f"🔐 Пароль: {'*' * len(conn['password'])}")
    
    def search_data(self, search_term):
        """Поиск по данным"""
        print(f"\n🔍 ПОИСК: '{search_term}'")
        print("-"*60)
        
        found_count = 0
        for table_name, table_info in self.data["tables"].items():
            for i, row in enumerate(table_info["sample_data"]):
                for col, value in row.items():
                    if search_term.lower() in str(value).lower():
                        print(f"📊 {table_name}.{col}: {value}")
                        found_count += 1
                        break
        
        if found_count == 0:
            print("❌ Ничего не найдено")
        else:
            print(f"\n✅ Найдено совпадений: {found_count}")
    
    def run(self):
        """Запустить админ панель"""
        print("🚀 Запуск упрощенной админ панели TeleShop Database...")
        
        try:
            while True:
                self.show_menu()
                choice = input("\n🎯 Выберите действие: ").strip()
                
                if choice == "0":
                    break
                elif choice == "1":
                    self.show_all_tables()
                elif choice == "2":
                    print("\nДоступные таблицы:")
                    for i, table_name in enumerate(self.data["tables"].keys(), 1):
                        print(f"{i}. {table_name}")
                    table_name = input("\n📋 Введите название таблицы: ").strip()
                    if table_name:
                        self.show_table_data(table_name)
                elif choice == "3":
                    print("\nДоступные таблицы:")
                    for i, table_name in enumerate(self.data["tables"].keys(), 1):
                        print(f"{i}. {table_name}")
                    table_name = input("\n🏗️  Введите название таблицы: ").strip()
                    if table_name:
                        self.show_table_structure(table_name)
                elif choice == "4":
                    self.show_statistics()
                elif choice == "5":
                    self.show_connection_info()
                elif choice == "6":
                    search_term = input("\n🔍 Введите поисковый запрос: ").strip()
                    if search_term:
                        self.search_data(search_term)
                else:
                    print("❌ Неверный выбор!")
                
                input("\n⏸️  Нажмите Enter для продолжения...")
                
        except KeyboardInterrupt:
            print("\n\n👋 Работа прервана пользователем")
        except Exception as e:
            print(f"\n❌ Ошибка: {e}")

if __name__ == "__main__":
    admin = SimpleDBAdmin()
    admin.run() 