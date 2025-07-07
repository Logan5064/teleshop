'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bot } from '@/services/bots';

interface BotContextType {
  selectedBot: Bot | null;
  setSelectedBot: (bot: Bot | null) => void;
  loading: boolean;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

export function BotProvider({ children }: { children: ReactNode }) {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем первого бота при инициализации
    fetchFirstBot();
  }, []);

  const fetchFirstBot = async () => {
    try {
      const response = await fetch('/api/secure/bots');
      if (response.ok) {
        const bots = await response.json();
        if (bots.length > 0) {
          setSelectedBot(bots[0]);
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки ботов:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BotContext.Provider value={{ selectedBot, setSelectedBot, loading }}>
      {children}
    </BotContext.Provider>
  );
}

export function useBot() {
  const context = useContext(BotContext);
  if (context === undefined) {
    throw new Error('useBot must be used within a BotProvider');
  }
  return context;
} 
