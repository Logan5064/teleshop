import json
import requests
from typing import Optional, Dict, List, Any
from datetime import datetime, timedelta

class AnalyticsService:
    """Сервис для работы с аналитикой ботов"""
    
    @staticmethod
    async def get_geolocation(ip_address: Optional[str]) -> Dict[str, Any]:
        """Получить геолокацию по IP адресу"""
        
        if not ip_address or ip_address in ['127.0.0.1', 'localhost']:
            return {
                'country': 'Local',
                'country_code': 'LOC',
                'city': 'localhost',
                'latitude': None,
                'longitude': None
            }
        
        try:
            response = requests.get(
                f"http://ipapi.co/{ip_address}/json/",
                timeout=5
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'country': data.get('country_name', 'Unknown'),
                    'country_code': data.get('country_code', 'UNK'),
                    'city': data.get('city', 'Unknown'),
                    'latitude': data.get('latitude'),
                    'longitude': data.get('longitude')
                }
        except Exception as e:
            print(f"Ошибка геолокации для {ip_address}: {e}")
        
        return {
            'country': 'Unknown',
            'country_code': 'UNK',
            'city': 'Unknown',
            'latitude': None,
            'longitude': None
        }

    @staticmethod
    def detect_device_type(user_agent: Optional[str]) -> str:
        """Определить тип устройства по User-Agent"""
        
        if not user_agent:
            return 'unknown'
        
        user_agent = user_agent.lower()
        
        if 'mobile' in user_agent or 'android' in user_agent or 'iphone' in user_agent:
            return 'mobile'
        elif 'tablet' in user_agent or 'ipad' in user_agent:
            return 'tablet'
        else:
            return 'desktop'

    @staticmethod
    async def track_bot_user(
        shop_id: int,
        telegram_id: str,
        username: Optional[str] = None,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> Dict[str, Any]:
        """Отследить пользователя бота"""
        
        geo_data = await AnalyticsService.get_geolocation(ip_address)
        device_type = AnalyticsService.detect_device_type(user_agent)
        
        user_data = {
            'shop_id': shop_id,
            'telegram_id': telegram_id,
            'username': username,
            'first_name': first_name,
            'last_name': last_name,
            'ip_address': ip_address,
            'device_type': device_type,
            'timestamp': datetime.utcnow().isoformat(),
            'geo': geo_data
        }
        
        print(f"Отслежен пользователь {telegram_id} из {geo_data['country']}")
        
        return user_data

    @staticmethod
    async def get_demo_analytics(shop_id: int) -> Dict[str, Any]:
        """Демо-аналитика для тестирования"""
        
        demo_countries = [
            {'name': 'Russia', 'code': 'RU', 'users': 156, 'percentage': 45.2},
            {'name': 'Ukraine', 'code': 'UA', 'users': 89, 'percentage': 25.8},
            {'name': 'Belarus', 'code': 'BY', 'users': 34, 'percentage': 9.9},
            {'name': 'Kazakhstan', 'code': 'KZ', 'users': 28, 'percentage': 8.1},
            {'name': 'Germany', 'code': 'DE', 'users': 18, 'percentage': 5.2},
        ]
        
        demo_users = [
            {
                'telegram_id': '123456789',
                'username': 'john_doe',
                'first_name': 'John',
                'messages': 147,
                'sessions': 23,
                'last_seen': '2024-01-15 14:30:00'
            },
            {
                'telegram_id': '987654321', 
                'username': 'maria_shop',
                'first_name': 'Maria',
                'messages': 98,
                'sessions': 15,
                'last_seen': '2024-01-15 13:45:00'
            },
            {
                'telegram_id': '456789123',
                'username': 'alex_buyer',
                'first_name': 'Alexander',
                'messages': 67,
                'sessions': 12,
                'last_seen': '2024-01-15 12:20:00'
            }
        ]
        
        return {
            'shop_id': shop_id,
            'total_users': 345,
            'active_users_today': 89,
            'active_users_week': 234,
            'active_users_month': 345,
            'total_sessions': 1247,
            'total_messages': 4589,
            'average_session_duration': 12.5,
            'countries': demo_countries,
            'top_users': demo_users,
            'quick_stats': {
                'users_online_now': 23,
                'users_today': 89,
                'messages_today': 267,
                'new_users_today': 15,
                'top_country': 'Russia',
                'growth_percentage': 12.5
            },
            'updated_at': datetime.utcnow().isoformat()
        } 