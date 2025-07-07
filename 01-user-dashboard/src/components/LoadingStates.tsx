'use client';

import { motion } from 'framer-motion';

// Стильные точки для основной загрузки
export const LoadingDots = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2', 
    lg: 'w-3 h-3'
  };

  const dotVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} bg-blue-500 rounded-full`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Скелетон для карточек ботов
export const BotCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-400/80 p-6 space-y-4"
  >
    {/* Заголовок */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <motion.div 
          className="h-4 bg-gray-200 rounded w-24"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="h-3 bg-gray-200 rounded w-32"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </div>
      <motion.div 
        className="w-4 h-4 bg-gray-200 rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
    </div>

    {/* Кнопки */}
    <div className="flex space-x-2">
      <motion.div 
        className="h-8 bg-gray-200 rounded-lg flex-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.div 
        className="h-8 bg-gray-200 rounded-lg flex-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
    </div>

    {/* Дополнительная информация */}
    <div className="pt-2 border-t border-gray-100 space-y-1">
      <motion.div 
        className="h-3 bg-gray-200 rounded w-20"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div 
        className="h-3 bg-gray-200 rounded w-28"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
    </div>
  </motion.div>
);

// Скелетон для статистических карточек
export const StatsCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-400/80 p-6"
  >
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <motion.div 
          className="h-6 bg-gray-200 rounded w-16"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="h-4 bg-gray-200 rounded w-20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </div>
      <motion.div 
        className="w-8 h-8 bg-gray-200 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
    </div>
  </motion.div>
);

// Пульсирующие блоки для загрузки контента
export const PulseBlocks = ({ count = 3, className = '' }: { count?: number, className?: string }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="h-20 bg-gray-100 rounded-lg"
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
  </div>
);

// Элегантная загрузка для основного контента
export const ContentLoader = ({ text = 'Загружаем данные' }: { text?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-12 space-y-4"
  >
    <div className="relative">
      {/* Внешнее кольцо */}
      <motion.div
        className="w-16 h-16 border-2 border-gray-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {/* Внутренний индикатор */}
      <motion.div
        className="absolute top-1 left-1 w-14 h-14 border-2 border-transparent border-t-blue-500 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      {/* Центральная точка */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
    
    <div className="text-center">
      <motion.p
        className="text-gray-600 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
      <LoadingDots size="sm" className="mt-2 justify-center" />
    </div>
  </motion.div>
);

// Барная загрузка
export const ProgressBar = ({ progress = 0, className = '' }: { progress?: number, className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-1 ${className}`}>
    <motion.div
      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

// Минималистичный спиннер для кнопок
export const ButtonSpinner = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-current border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Скелетон для таблиц (товары, заказы, пользователи)
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-400/80 overflow-hidden"
  >
    {/* Заголовок таблицы */}
    <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 rounded"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
    
    {/* Строки таблицы */}
    {[...Array(rows)].map((_, rowIndex) => (
      <div key={rowIndex} className="px-6 py-4 border-b border-gray-100 grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, colIndex) => (
          <motion.div
            key={colIndex}
            className="h-4 bg-gray-100 rounded"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: (rowIndex * 0.1) + (colIndex * 0.05) 
            }}
          />
        ))}
      </div>
    ))}
  </motion.div>
);

// Скелетон для карточек товаров
export const ProductCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-400/80 p-4 space-y-4"
  >
    {/* Изображение товара */}
    <motion.div
      className="h-32 bg-gray-200 rounded-lg"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Название */}
    <motion.div
      className="h-4 bg-gray-200 rounded w-3/4"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
    />
    
    {/* Цена */}
    <motion.div
      className="h-6 bg-gray-200 rounded w-1/2"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
    />
    
    {/* Кнопки */}
    <div className="flex space-x-2">
      <motion.div
        className="h-8 bg-gray-200 rounded flex-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      <motion.div
        className="h-8 bg-gray-200 rounded w-8"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  </motion.div>
);

// Скелетон для аналитических графиков
export const ChartSkeleton = ({ height = 'h-64' }: { height?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-400/80 p-6 space-y-4"
  >
    {/* Заголовок графика */}
    <div className="flex items-center justify-between">
      <motion.div
        className="h-6 bg-gray-200 rounded w-32"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-4 bg-gray-200 rounded w-16"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
    </div>
    
    {/* График */}
    <motion.div
      className={`${height} bg-gray-100 rounded relative overflow-hidden`}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Имитация линий графика */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-200/50 to-transparent rounded"
        animate={{ 
          scaleY: [0.5, 1, 0.8, 1, 0.5],
          opacity: [0.3, 0.7, 0.5, 0.8, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
    
    {/* Легенда */}
    <div className="flex space-x-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="h-3 bg-gray-200 rounded w-20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  </motion.div>
);

// Скелетон для настроек/форм
export const FormSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-400/80 p-6 space-y-6"
  >
    {/* Заголовок секции */}
    <motion.div
      className="h-6 bg-gray-200 rounded w-48"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Поля формы */}
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-2">
        <motion.div
          className="h-4 bg-gray-200 rounded w-32"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
        <motion.div
          className="h-10 bg-gray-100 rounded-lg"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.2 }}
        />
      </div>
    ))}
    
    {/* Кнопки */}
    <div className="flex space-x-3 pt-4">
      <motion.div
        className="h-10 bg-gray-200 rounded-lg w-24"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="h-10 bg-gray-200 rounded-lg w-32"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
    </div>
  </motion.div>
);

// Компактный скелетон для малых карточек
export const CompactCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-400/80 p-4 space-y-3"
  >
    <div className="flex items-center justify-between">
      <motion.div
        className="h-4 bg-gray-200 rounded w-24"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="w-8 h-8 bg-gray-200 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
    </div>
    
    <motion.div
      className="h-6 bg-gray-200 rounded w-16"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
    />
    
    <motion.div
      className="h-3 bg-gray-200 rounded w-32"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
    />
  </motion.div>
); 