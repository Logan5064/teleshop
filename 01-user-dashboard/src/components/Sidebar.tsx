'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  RectangleGroupIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import UserCard from './UserCard';
import SelectedBotCard from './SelectedBotCard';

const navigation = [
  { name: 'Дашборд', href: '/', icon: HomeIcon },
  { name: 'Конструктор', href: '/constructor', icon: WrenchScrewdriverIcon },
  { name: 'Категории', href: '/categories', icon: RectangleGroupIcon },
  { name: 'Товары', href: '/products', icon: CubeIcon },
  { name: 'Заказы', href: '/orders', icon: ClipboardDocumentListIcon },
  { name: 'Пользователи', href: '/users', icon: UsersIcon },
  { name: 'Аналитика', href: '/analytics', icon: ChartBarIcon },
  { name: 'Настройки', href: '/settings', icon: Cog6ToothIcon },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          {isOpen ? (
            <XMarkIcon className="block h-6 w-6" />
          ) : (
            <Bars3Icon className="block h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className="lg:block lg:w-80 lg:pl-6">
        {/* Sidebar */}
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-72 bg-white/95 backdrop-blur-sm transform transition-transform duration-200 ease-in-out lg:relative lg:inset-auto lg:rounded-2xl lg:border lg:border-gray-400/50 lg:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:translate-x-0 lg:w-full lg:h-[calc(100vh-3rem)] lg:mt-6',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center h-20 px-8 border-b border-gray-300/60 lg:rounded-t-2xl bg-gradient-to-r from-gray-100/80 to-blue-50/50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-gray-900 text-xl font-semibold tracking-tight">TeleShop</h1>
                  <p className="text-gray-600 text-sm font-medium">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-8 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'group flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200 tracking-wide',
                      isActive
                        ? 'bg-gray-200/80 text-gray-900 border border-gray-300/60'
                        : 'text-gray-600 hover:bg-gray-100/60 hover:text-gray-900'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-4 h-5 w-5 transition-colors duration-200',
                        isActive ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-600'
                      )}
                    />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-gray-700 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Card */}
            <UserCard />
            
            {/* Selected Bot Card */}
            <SelectedBotCard />
          </div>
        </div>
      </div>
    </>
  );
} 
