'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/contexts/UserContext';
import Sidebar from '@/components/Sidebar';
import { StatsCardSkeleton, FormSkeleton, ContentLoader } from '@/components/LoadingStates';
import {
  UserIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  StarIcon,
  SparklesIcon,
  CalendarIcon,
  ShoppingBagIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { user, profile, loading } = useUser();

  // Имитируем загрузку страницы
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || pageLoading) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                {/* Заголовок скелетон */}
                <div className="h-9 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>

                {/* Статистика скелетоны */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full">
                  {[...Array(4)].map((_, i) => (
                    <StatsCardSkeleton key={i} />
                  ))}
                </div>

                {/* Заголовок тарифных планов скелетон */}
                <div className="h-7 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>

                {/* Тарифные планы скелетоны */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                      <div className="space-y-3">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        ))}
                      </div>
                      <div className="h-10 bg-gray-200 rounded-lg w-full mt-6 animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Форма настроек скелетон */}
                <FormSkeleton />

                {/* Центральный лоадер */}
                <div className="mt-12">
                  <ContentLoader text="Загружаем профиль..." />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Статистика пользователя
  const userStats = [
    {
      title: 'Дней в системе',
      value: '4',
      icon: CalendarIcon,
      color: 'blue'
    },
    {
      title: 'Входов в систему',
      value: '19',
      icon: ShoppingBagIcon,
      color: 'emerald'
    },
    {
      title: 'Активное время',
      value: '1ч 25м',
      icon: ClockIcon,
      color: 'violet'
    },
    {
      title: 'Текущий тариф',
      value: 'Free',
      icon: CurrencyDollarIcon,
      color: 'orange'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'навсегда',
      current: true,
      features: [
        '1 магазин',
        'До 10 товаров',
        'Базовая аналитика',
        'Email поддержка'
      ],
      icon: UserIcon,
      color: 'gray'
    },
    {
      name: 'Pro',
      price: 990,
      period: 'в месяц',
      current: false,
      features: [
        '5 магазинов',
        'До 500 товаров',
        'Расширенная аналитика',
        'Приоритетная поддержка',
        'Интеграции с платежами',
        'Кастомный дизайн'
      ],
      icon: StarIcon,
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: 2990,
      period: 'в месяц',
      current: false,
      features: [
        'Безлимитное количество магазинов',
        'Безлимитное количество товаров',
        'Полная аналитика и отчеты',
        'Персональный менеджер',
        'API доступ',
        'Белый лейбл',
        'Кастомные интеграции'
      ],
      icon: SparklesIcon,
      color: 'purple'
    }
  ];

  const handleDeleteAccount = () => {
    console.log('Удаление аккаунта');
    setShowDeleteConfirm(false);
  };

  const getColorClasses = (color: string, current: boolean) => {
    if (current) {
      switch (color) {
        case 'blue':
          return 'border-blue-500 bg-blue-50/80';
        case 'purple':
          return 'border-purple-500 bg-purple-50/80';
        default:
          return 'border-gray-500 bg-gray-50/80';
      }
    }
    return 'border-gray-300/60 bg-white/95';
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'purple':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatIconBg = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100/80 border-blue-300/50';
      case 'emerald':
        return 'bg-emerald-100/80 border-emerald-300/50';
      case 'violet':
        return 'bg-violet-100/80 border-violet-300/50';
      case 'orange':
        return 'bg-orange-100/80 border-orange-300/50';
      default:
        return 'bg-gray-100/80 border-gray-300/50';
    }
  };

  const getStatIconColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'emerald':
        return 'text-emerald-600';
      case 'violet':
        return 'text-violet-600';
      case 'orange':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            <div className="p-6 w-full">
              <h1 className="text-3xl font-semibold text-gray-800 tracking-tight mb-8">Профиль</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full">
                {userStats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">{stat.title}</p>
                        <p className="text-3xl font-semibold text-gray-800 tracking-tight">{stat.value}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${getStatIconBg(stat.color)}`}>
                        <stat.icon className={`w-7 h-7 ${getStatIconColor(stat.color)}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* User Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm mb-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Информация о пользователе</h2>
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">
                      {profile?.first_name?.charAt(0) || profile?.username?.charAt(0) || user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
                      {profile?.first_name || profile?.username || user?.first_name || user?.username || 'Max'}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      @{profile?.username || user?.username || 'max_5064'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Telegram ID: {user?.telegram_id || '422752975'}
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        🆓 Free
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Subscription Plans */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`rounded-2xl p-8 border ${getColorClasses(plan.color, plan.current)}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                      <plan.icon className={`w-6 h-6 ${getIconColor(plan.color)}`} />
                    </div>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}₽</span>
                      <span className="ml-2 text-gray-500">/{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                        plan.current
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Текущий тариф' : 'Выбрать тариф'}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Danger Zone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-red-50/50 backdrop-blur-sm rounded-2xl p-8 border border-red-200/60"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-1">Опасная зона</h3>
                    <p className="text-red-600">Удаление аккаунта приведет к потере всех данных</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
                  >
                    Удалить аккаунт
                  </button>
                </div>
              </motion.div>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                    <div className="flex items-center mb-6">
                      <ExclamationTriangleIcon className="w-8 h-8 text-red-500 mr-4" />
                      <h3 className="text-xl font-semibold text-gray-900">Подтвердите удаление</h3>
                    </div>
                    <p className="text-gray-600 mb-8">
                      Вы уверены, что хотите удалить свой аккаунт? Это действие необратимо и приведет к потере всех данных.
                    </p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        Отмена
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
