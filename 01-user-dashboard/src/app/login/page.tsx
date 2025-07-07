'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  KeyIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { ButtonSpinner } from '@/components/LoadingStates';

// Добавляем типы для Telegram WebApp API
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            username?: string;
            first_name?: string;
            last_name?: string;
          };
        };
      };
    };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  // Временно отключаем автоматическую проверку авторизации
  useEffect(() => {
    console.log('🔄 LoginPage mounted');
    
    return () => {
      console.log('🔄 LoginPage unmounted');
    };
  }, []);

  // Проверяем, авторизован ли пользователь ТОЛЬКО по клику
  const checkAuthManually = async () => {
    try {
      console.log('🔄 Manual auth check...');
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        console.log('✅ Пользователь уже авторизован');
        router.push('/');
      } else {
        console.log('🔒 Пользователь не авторизован');
      }
    } catch (error) {
      console.log('🔒 Ошибка проверки авторизации:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.trim() })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Авторизация успешна');
        router.push('/');
      } else {
        const error = await response.json();
        alert(error.detail || error.message || 'Неверный код');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Ошибка проверки кода');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ts-page-bg min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Логотип и заголовок */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-300/60"
          >
            <SparklesIcon className="w-10 h-10 text-gray-700" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-semibold text-gray-800 tracking-tight mb-3"
          >
            TeleShop
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-lg"
          >
            Введите код для входа
          </motion.p>
        </div>

        {/* Форма входа */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 border border-gray-300/60 shadow-sm"
        >
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Код авторизации
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Введите ваш код"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100/70 rounded-2xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800 placeholder-gray-500 text-lg transition-all duration-200"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !code.trim()}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gray-700 text-white rounded-2xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md text-lg"
            >
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <>
                  <span>Войти</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            Код можно получить у администратора системы
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
