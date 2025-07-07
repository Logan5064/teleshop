'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '@/lib/api';
import type { User, TelegramProfile } from '@/types';

interface UserContextType {
  user: User | null;
  profile: TelegramProfile | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<TelegramProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loadUserData = async () => {
    try {
      console.log('🔄 UserContext: Loading user data...');
      setLoading(true);
      setError(null);
      
      console.log('🔄 UserContext: Making API calls...');
      const [userData, profileData] = await Promise.all([
        authApi.getCurrentUser(),
        authApi.getTelegramProfile()
      ]);
      
      console.log('✅ UserContext: User data loaded:', { userData, profileData });
      setUser(userData);
      setProfile(profileData);
    } catch (err: any) {
      console.error('❌ UserContext: Error loading user data:', err);
      console.error('❌ UserContext: Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      // Если ошибка авторизации - очищаем состояние
      if (err.response?.status === 401) {
        console.log('❌ UserContext: Unauthorized - clearing user state');
        setUser(null);
        setProfile(null);
        setError('Необходима авторизация');
      } else {
        setError(`Ошибка загрузки данных: ${err.message}`);
      }
    } finally {
      setLoading(false);
      console.log('🔄 UserContext: Loading finished');
    }
  };

  useEffect(() => {
    // Не загружаем данные пользователя на странице логина и других публичных страницах
    if (pathname === '/login' || pathname === '/auth') {
      console.log('🔄 UserContext: Skipping user data loading on login page');
      setLoading(false);
      return;
    }
    
    console.log('🔄 UserContext: Component mounted, loading user data...');
    loadUserData();
  }, [pathname]);

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        profile,
        loading,
        error,
        refreshUser: loadUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 
