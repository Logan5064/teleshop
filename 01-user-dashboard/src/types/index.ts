// Экспорт всех типов проекта
export * from './blocks'
export * from './constructor'
export * from './api'

export interface User {
  id: string;
  username: string;
  first_name?: string;
  telegram_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TelegramProfile {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface UserSession {
  id: number;
  session_token: string;
  user_id: number;
  telegram_id: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  last_activity: string;
  expires_at: string;
  is_active: boolean;
}

export interface BotSubscriber {
  id: number;
  shop_id: number;
  telegram_user_id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
  is_active: boolean;
  is_blocked: boolean;
  last_interaction?: string;
  source?: string;
  first_seen?: string;
  updated_at?: string;
} 