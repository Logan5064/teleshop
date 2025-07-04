'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { logout, getUserData } from '@/lib/auth';
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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      }
    };
    loadUser();
  }, []);

  // Статистика пользователя
  const userStats = [
    {
      title: 'Дней в системе',
      value: '45',
      change: null,
      icon: CalendarIcon,
      color: 'blue'
    },
    {
      title: 'Созданных магазинов',
      value: '3',
      change: null,
      icon: ShoppingBagIcon,
      color: 'emerald'
    },
    {
      title: 'Активное время',
      value: '2ч 15м',
      change: null,
      icon: ClockIcon,
      color: 'violet'
    },
    {
      title: 'Текущий тариф',
      value: user?.subscription_plan === 'enterprise' ? 'Enterprise' : 
             user?.subscription_plan === 'pro' ? 'Pro' : 'Free',
      change: null,
      icon: CurrencyDollarIcon,
      color: 'orange'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'навсегда',
      current: user?.subscription_plan === 'free',
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
      current: user?.subscription_plan === 'pro',
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
      current: user?.subscription_plan === 'enterprise',
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

  const handleLogout = () => {
    logout();
  };

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
                      {user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'А'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
                      {user?.first_name || user?.username || 'Пользователь'}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      @{user?.username || user?.telegram_id || 'username'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Telegram ID: {user?.telegram_id || 'не указан'}
                    </p>
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user?.subscription_plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                        user?.subscription_plan === 'pro' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user?.subscription_plan === 'enterprise' ? '👑 Enterprise' :
                         user?.subscription_plan === 'pro' ? '⭐ Pro' :
                         '🆓 Free'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Subscription Plans */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm mb-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Тарифные планы</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, index) => {
                    const Icon = plan.icon;
                    return (
                      <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${getColorClasses(plan.color, plan.current)}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-6 h-6 ${getIconColor(plan.color)}`} />
                            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                          </div>
                          {plan.current && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckIcon className="w-3 h-3 mr-1" />
                              Текущий
                            </span>
                          )}
                        </div>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-gray-900">{plan.price}₽</span>
                          <span className="text-gray-600 ml-1">/{plan.period}</span>
                        </div>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {!plan.current && (
                          <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                            plan.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                            plan.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                            'bg-gray-600 hover:bg-gray-700 text-white'
                          }`}>
                            Перейти на {plan.name}
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Действия с аккаунтом</h2>
                <div className="space-y-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-between w-full p-4 bg-gray-100/60 hover:bg-gray-200/60 rounded-xl transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Выйти из системы</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center justify-between w-full p-4 bg-red-50/60 hover:bg-red-100/60 rounded-xl transition-colors border border-red-200/60"
                  >
                    <div className="flex items-center space-x-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-900">Удалить аккаунт</span>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Удалить аккаунт</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Вы уверены, что хотите удалить свой аккаунт? Все данные будут безвозвратно удалены.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-900 font-medium transition-colors"
                      >
                        Отмена
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
                      >
                        Удалить
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
