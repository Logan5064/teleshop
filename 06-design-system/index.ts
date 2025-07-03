/*
🎨 TeleShop Design System
Главный файл экспорта всех компонентов и стилей
*/

// Экспорт всех React компонентов
export { StatsCard } from './components/StatsCard';
export { ContentCard } from './components/ContentCard'; 
export { ListItem } from './components/ListItem';
export { EmptyState } from './components/EmptyState';
export { Button, IconButton } from './components/Button';

// Типы для TypeScript
export interface TeleShopTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: {
      blue: string;
      green: string;
      purple: string;
      orange: string;
    };
  };
  spacing: {
    card: string;
    section: string;
  };
}

// Готовые наборы данных для примеров
export const mockStatsData = [
  {
    title: "Всего ботов",
    value: 0,
    subtitle: "Создайте первого бота",
    iconColor: "blue" as const
  },
  {
    title: "Активных ботов", 
    value: 0,
    subtitle: "Нет активных",
    iconColor: "green" as const
  },
  {
    title: "Всего пользователей",
    value: 0, 
    subtitle: "Подписчики ботов",
    iconColor: "purple" as const
  },
  {
    title: "Активность сегодня",
    value: 0,
    subtitle: "Взаимодействия", 
    iconColor: "orange" as const
  }
];

// Хелперы для классов
export const getTsLayoutClasses = () => "ts-layout";
export const getTsMainClasses = () => "ts-main";
export const getTsContainerClasses = () => "ts-container";
export const getTsStatsGridClasses = () => "ts-stats-grid";

// Константы дизайн-системы
export const TELESHOP_COLORS = {
  blue: '#3B82F6',
  green: '#10B981',
  purple: '#8B5CF6', 
  orange: '#F59E0B',
  red: '#EF4444'
} as const;

export const TELESHOP_SPACING = {
  cardPadding: 'p-8',
  sectionMargin: 'mb-12',
  itemGap: 'gap-8'
} as const; 