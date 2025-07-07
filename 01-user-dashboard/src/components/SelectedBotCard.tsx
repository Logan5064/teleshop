'use client';

import { useBot } from '@/lib/contexts/BotContext';

export default function SelectedBotCard() {
  const { selectedBot, loading } = useBot();

  if (loading) {
    return (
      <div className="p-6 border-t border-gray-300/60">
        <div className="animate-pulse flex items-center p-4 rounded-xl bg-gray-100/60 border border-gray-300/50">
          <div className="w-10 h-10 bg-gray-300 rounded-xl"></div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedBot) {
    return (
      <div className="p-6 border-t border-gray-300/60">
        <div className="flex items-center p-4 rounded-xl bg-gray-100/60 border border-gray-300/50">
          <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center">
            <span className="text-gray-500 text-sm">🤖</span>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-semibold text-gray-500">
              Нет выбранного бота
            </p>
            <p className="text-xs text-gray-400">
              Выберите бота в дашборде
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Определяем первую букву для аватара
  const avatarLetter = selectedBot.shop_name.charAt(0).toUpperCase();

  return (
    <div className="p-6 border-t border-gray-300/60">
      <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-100/60 to-purple-100/60 border border-blue-300/50 shadow-sm">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">
              {avatarLetter}
            </span>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-semibold text-gray-900 tracking-wide">
            {selectedBot.shop_name}
          </p>
          <p className="text-xs text-gray-600 font-medium">
            @{selectedBot.bot_username || 'username'}
          </p>
        </div>
        <div className="ml-2">
          <div className={`w-2 h-2 rounded-full ${selectedBot.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        </div>
      </div>
    </div>
  );
} 
