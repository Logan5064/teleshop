'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import { authApi } from '@/lib/api'

const LoginPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/'
  
  const [formData, setFormData] = useState({
    code: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 USEEFFECT: Starting auth check...');
      console.log('🔍 USEEFFECT: redirectPath:', redirectPath);
      
      try {
        console.log('🔍 USEEFFECT: Calling authApi.checkAuth()...');
        const result = await authApi.checkAuth()
        console.log('🔍 USEEFFECT: Auth check result:', result);
        
        if (result.authenticated) {
          console.log('✅ USEEFFECT: User is authenticated, redirecting to:', redirectPath);
          router.push(redirectPath)
          console.log('🔄 USEEFFECT: router.push called');
        } else {
          console.log('❌ USEEFFECT: User not authenticated, showing login form');
          setIsCheckingAuth(false)
        }
      } catch (error) {
        console.error('💥 USEEFFECT: Auth check error:', error)
        setIsCheckingAuth(false)
      }
    }

    // Добавляем таймаут для проверки авторизации
    const timeoutId = setTimeout(() => {
      console.log('⏰ USEEFFECT: Timeout reached, stopping auth check');
      setIsCheckingAuth(false)
    }, 2000)

    console.log('🚀 USEEFFECT: Starting auth check process...');
    checkAuth()

    return () => {
      console.log('🧹 USEEFFECT: Cleanup, clearing timeout');
      clearTimeout(timeoutId)
    }
  }, [router, redirectPath])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log('🚀 HANDLE SUBMIT START | Code:', formData.code, '| Redirect path:', redirectPath);

    try {
      // Авторизация через PostgreSQL API
      console.log('📡 CALLING authApi.login...');
      const result = await authApi.login(formData.code)
      console.log('📋 LOGIN RESULT:', result);

      if (result.success) {
        console.log('✅ LOGIN SUCCESS - attempting redirect to:', redirectPath);
        // Токен уже сохранен в authApi.login
        console.log('🔄 USING WINDOW.LOCATION instead of router.push');
        // Небольшая задержка чтобы cookie успел установиться
        setTimeout(() => {
          window.location.href = redirectPath;
        }, 100);
      } else {
        console.log('❌ LOGIN FAILED:', result.message);
        // Безопасная обработка ошибок - гарантируем что setError получает строку
        const errorMessage = typeof result.message === 'string' 
          ? result.message 
          : 'Неверный код авторизации';
        setError(errorMessage)
      }
    } catch (err: any) {
      console.error('💥 LOGIN CATCH ERROR:', err)
      // Безопасная обработка ошибок catch блока
      let errorMessage = 'Ошибка подключения к серверу';
      
      // Если err это объект с response.data.detail
      if (err?.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (typeof detail === 'string') {
          errorMessage = detail;
        } else if (Array.isArray(detail)) {
          errorMessage = detail.map(e => e.msg || 'Ошибка валидации').join(', ');
        }
      }
      
      setError(errorMessage)
    } finally {
      console.log('🏁 HANDLE SUBMIT FINALLY');
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Показываем загрузку пока проверяем авторизацию
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"
          />
          <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
            Проверяем авторизацию...
          </h3>
          <p className="text-white/60 text-sm">
            Подключение к PostgreSQL...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Logo и заголовок */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              T
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-2"
          >
            TeleShop Constructor
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-indigo-200"
          >
            Введите код для входа в систему
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-xs text-white/50"
          >
            Powered by PostgreSQL 🐘
          </motion.div>
        </div>

        {/* Форма входа */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Поле для кода */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-white mb-2">
                Код авторизации
              </label>
              <div className="relative">
                <input
                  id="code"
                  name="code"
                  type={showCode ? "text" : "password"}
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Введите 6-значный код"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showCode ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Ошибка */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
              >
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Кнопка входа */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || formData.code.length !== 6}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Проверяем код...
                </div>
              ) : (
                'Войти в систему'
              )}
            </motion.button>
          </form>

          {/* Инфо о коде */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className="text-white/70 text-sm">
              Код отправляется в Telegram боте 
            </p>
            <p className="text-indigo-300 text-sm font-medium mt-1">
              @odnorazki_by_bot - команда /start
            </p>
            <p className="text-white/50 text-xs mt-1">
              Код действует 15 минут
            </p>
          </motion.div>

          {/* Кнопка экстренной очистки */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-4 text-center"
          >
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                  // Очищаем cookies
                  document.cookie.split(";").forEach(function(c) { 
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                  });
                  console.log('🧹 ALL TOKENS CLEARED');
                  alert('Токены очищены! Обновите страницу.');
                } catch (e) {
                  console.error('Error clearing tokens:', e);
                }
              }}
              className="text-white/50 hover:text-white/70 text-xs underline transition-colors"
            >
              🧹 Очистить все токены (для отладки)
            </button>
          </motion.div>

          {/* Статус подключения */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-xs">PostgreSQL Connected</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Дополнительные ссылки */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <a
            href="https://t.me/odnorazki_by_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300 hover:text-white text-sm transition-colors"
          >
            Получить код в Telegram боте →
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-white/30 text-xs">
            TeleShop Constructor v2.0 • PostgreSQL Backend
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage
