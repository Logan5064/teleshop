'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Декларация типов для Telegram WebApp API
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
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'code' | 'telegram' | 'credentials'>('code');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    code: ''
  });

  // Проверяем, авторизован ли пользователь
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Проверяем сессию на сервере через API
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Включаем cookies
        });
        
        if (response.ok) {
          // Пользователь уже авторизован, перенаправляем
          console.log('✅ Пользователь уже авторизован');
          router.push('/');
        }
      } catch (error) {
        // Ошибка проверки - остаемся на странице логина
        console.log('🔍 Проверка авторизации: пользователь не авторизован');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleTelegramLogin = async () => {
    setIsLoading(true);
    try {
      // Интеграция с Telegram WebApp API
      if ((window as any).Telegram?.WebApp) {
        const tgData = (window as any).Telegram.WebApp.initDataUnsafe;
        if (tgData && tgData.user) {
          // Отправляем данные на сервер для авторизации
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              telegram_id: tgData.user.id,
              username: tgData.user.username,
              first_name: tgData.user.first_name,
              last_name: tgData.user.last_name
            })
          });

          if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('auth_token', token);
            router.push('/');
          }
        }
      } else {
        // Fallback для тестирования без Telegram
        console.log('Telegram WebApp not available, redirecting...');
        router.push('/');
      }
    } catch (error) {
      console.error('Telegram login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Используем правильный API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: formData.code })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Авторизация успешна:', data.message);
        
        // Cookie автоматически устанавливается в API route
        // Перенаправляем на главную страницу
        router.push('/');
      } else {
        const error = await response.json();
        alert(error.detail || error.message || 'Неверный код');
      }
    } catch (error) {
      console.error('Code verification error:', error);
      alert('Ошибка проверки кода');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.username, 
          password: formData.password 
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Админская авторизация успешна:', data.message);
        
        // Cookie автоматически устанавливается в API route
        router.push('/');
      } else {
        const error = await response.json();
        alert(error.detail || error.message || 'Неверные учетные данные');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Логотип и заголовок */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <span className="text-white font-bold text-2xl">T</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TeleShop</h1>
          <p className="text-gray-600">Войдите в административную панель</p>
        </div>

        {/* Главная карточка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8"
        >
          {/* Переключатель методов входа */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setLoginMethod('code')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'code'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Код
            </button>
            <button
              onClick={() => setLoginMethod('telegram')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'telegram'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Telegram
            </button>
            <button
              onClick={() => setLoginMethod('credentials')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'credentials'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Админ
            </button>
          </div>

          {/* Форма входа по коду */}
          {loginMethod === 'code' && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleCodeLogin}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Код авторизации</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Получите код в боте @TeleShopBot<br />
                  Напишите боту <strong>/login</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Код из бота (6 цифр)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-2xl font-mono tracking-wider"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Код действует 15 минут
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || formData.code.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Войти
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.form>
          )}

          {/* Форма Telegram входа */}
          {loginMethod === 'telegram' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.379 2.655-1.407 3.119-2.841 1.961l-1.957-1.584-1.584 1.319c-.569.465-1.033.18-1.033-.553v-2.331l6.104-5.511c.266-.235-.058-.365-.414-.129l-7.552 4.734-2.262-.706s-.498-.175-.546-.553c-.049-.378.553-.582.553-.582l9.177-3.545c.746-.313 1.37.184 1.139 1.252z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Вход через Telegram</h3>
                <p className="text-gray-600 text-sm mb-6">Быстрый и безопасный вход через ваш Telegram аккаунт</p>
                
                <button
                  onClick={handleTelegramLogin}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      Войти через Telegram
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Форма входа по логину/паролю */}
          {loginMethod === 'credentials' && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleCredentialsLogin}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя пользователя
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="admin"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Войти
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            Возникли проблемы с входом?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Свяжитесь с поддержкой
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-400/5 to-blue-400/5 rounded-full"
        />
      </div>
    </div>
  );
}
