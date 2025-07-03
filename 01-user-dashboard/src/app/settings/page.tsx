'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import {
  Cog6ToothIcon,
  CurrencyDollarIcon,
  TruckIcon,
  BellIcon,
  KeyIcon,
  DocumentIcon,
  TrashIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const settingsSections = [
    {
      id: 'general',
      name: 'Общие настройки',
      icon: Cog6ToothIcon,
      description: 'Основные параметры магазина'
    },
    {
      id: 'payments',
      name: 'Способы оплаты',
      icon: CreditCardIcon,
      description: 'Настройка платежных систем'
    },
    {
      id: 'delivery',
      name: 'Способы доставки',
      icon: TruckIcon,
      description: 'Варианты доставки товаров'
    },
    {
      id: 'order-data',
      name: 'Данные в заказе',
      icon: ClipboardDocumentListIcon,
      description: 'Поля для сбора информации'
    },
    {
      id: 'notifications',
      name: 'Уведомления',
      icon: BellIcon,
      description: 'Настройки оповещений'
    },
    {
      id: 'tokens',
      name: 'Токены бота',
      icon: KeyIcon,
      description: 'API ключи и токены'
    },
    {
      id: 'documents',
      name: 'Документы',
      icon: DocumentIcon,
      description: 'Пользовательское соглашение'
    },
    {
      id: 'danger',
      name: 'Удалить проект',
      icon: TrashIcon,
      description: 'Опасная зона'
    }
  ];

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-800 tracking-tight mb-2">Настройки</h1>
              <p className="text-gray-600">Управление конфигурацией вашего Telegram магазина</p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {settingsSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={() => setActiveTab(section.id)}
                  className={`cursor-pointer bg-white/95 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 shadow-sm hover:shadow-md ${
                    activeTab === section.id
                      ? 'border-blue-400/70 bg-blue-50/50'
                      : 'border-gray-300/60 hover:border-gray-400/70'
                  } ${section.id === 'danger' ? 'border-red-300/60 hover:border-red-400/70' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      section.id === 'danger' 
                        ? 'bg-red-100/80 border border-red-300/50' 
                        : activeTab === section.id 
                        ? 'bg-blue-100/80 border border-blue-300/50' 
                        : 'bg-gray-100/80 border border-gray-300/50'
                    }`}>
                      <section.icon className={`w-6 h-6 ${
                        section.id === 'danger' 
                          ? 'text-red-600' 
                          : activeTab === section.id 
                          ? 'text-blue-600' 
                          : 'text-gray-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{section.name}</h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Settings Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
            >
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Общие настройки</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Название магазина</label>
                      <input
                        type="text"
                        defaultValue="Мой TeleShop"
                        className="w-full px-4 py-3 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Валюта</label>
                      <select className="w-full px-4 py-3 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800">
                        <option value="RUB">₽ Российский рубль</option>
                        <option value="USD">$ Доллар США</option>
                        <option value="EUR">€ Евро</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Описание магазина</label>
                      <textarea
                        rows={4}
                        defaultValue="Добро пожаловать в наш Telegram магазин!"
                        className="w-full px-4 py-3 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800"
                      />
                    </div>

                    <button className="inline-flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md">
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Способы оплаты</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Банковские карты', enabled: true, provider: 'ЮKassa' },
                      { name: 'СБП (Система быстрых платежей)', enabled: true, provider: 'Сбербанк' },
                      { name: 'Наличные при получении', enabled: false, provider: 'Курьер' },
                      { name: 'Криптовалюта', enabled: false, provider: 'CoinPayments' }
                    ].map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-100/70 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-gray-800">{method.name}</h4>
                          <p className="text-sm text-gray-600">{method.provider}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={method.enabled}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Способы доставки</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Курьерская доставка', price: 300, timeframe: '1-2 дня' },
                      { name: 'Пункт выдачи', price: 150, timeframe: '2-3 дня' },
                      { name: 'Почта России', price: 200, timeframe: '5-7 дней' },
                      { name: 'Самовывоз', price: 0, timeframe: 'В день заказа' }
                    ].map((method, index) => (
                      <div key={index} className="p-4 bg-gray-100/70 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{method.name}</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Стоимость</label>
                            <input
                              type="number"
                              defaultValue={method.price}
                              className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Сроки</label>
                            <input
                              type="text"
                              defaultValue={method.timeframe}
                              className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'danger' && (
                <div>
                  <h2 className="text-2xl font-semibold text-red-800 tracking-tight mb-6">Опасная зона</h2>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <TrashIcon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-red-800 mb-2">Удалить проект</h3>
                        <p className="text-red-700 mb-4">
                          Это действие нельзя отменить. Будут удалены все данные: товары, заказы, пользователи и настройки.
                        </p>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                          <TrashIcon className="w-4 h-4" />
                          Удалить проект навсегда
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {!['general', 'payments', 'delivery', 'danger'].includes(activeTab) && (
                <div className="text-center py-12">
                  <Cog6ToothIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Раздел "{settingsSections.find(s => s.id === activeTab)?.name}" в разработке
                  </h3>
                  <p className="text-gray-500">Настройки этого раздела будут добавлены в ближайшее время</p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 