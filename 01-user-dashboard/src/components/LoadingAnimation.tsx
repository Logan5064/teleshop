'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BoltIcon,
  SparklesIcon,
  CubeIcon,
  UserGroupIcon,
  ChartBarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export default function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    { 
      icon: BoltIcon, 
      text: 'Инициализация TeleShop...', 
      subtext: 'Запуск системы', 
      color: 'text-blue-500',
      bgColor: 'bg-blue-100/80'
    },
    { 
      icon: UserGroupIcon, 
      text: 'Загрузка пользователей...', 
      subtext: 'Синхронизация данных', 
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100/80'
    },
    { 
      icon: CubeIcon, 
      text: 'Подготовка каталога...', 
      subtext: 'Обновление товаров', 
      color: 'text-violet-500',
      bgColor: 'bg-violet-100/80'
    },
    { 
      icon: ChartBarIcon, 
      text: 'Сбор аналитики...', 
      subtext: 'Формирование отчетов', 
      color: 'text-orange-500',
      bgColor: 'bg-orange-100/80'
    },
    { 
      icon: SparklesIcon, 
      text: 'Финализация...', 
      subtext: 'Почти готово!', 
      color: 'text-pink-500',
      bgColor: 'bg-pink-100/80'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const stepIndex = Math.floor(newProgress / 20);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const currentStepData = loadingSteps[currentStep];

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        {/* Sidebar Skeleton */}
        <div className="w-72 bg-white/95 backdrop-blur-sm border-r border-gray-300/60 p-6">
          <div className="flex items-center mb-8">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center mr-4"
            >
              <span className="text-white font-bold text-lg">T</span>
            </motion.div>
            <div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-20 animate-pulse"></div>
              <div className="h-3 bg-gray-100 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                className="flex items-center p-3 rounded-xl bg-gray-100/50"
              >
                <div className="w-5 h-5 bg-gray-200 rounded mr-3 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded flex-1 animate-pulse"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            
            {/* Main Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 1],
                opacity: 1,
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white font-bold text-3xl">T</span>
              </div>
              
              {/* Orbit Animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-4"
              >
                <div className="relative w-full h-full">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-500 rounded-full -translate-x-1/2"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                    className="absolute right-0 top-1/2 w-3 h-3 bg-emerald-500 rounded-full -translate-y-1/2"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1, repeat: Infinity, delay: 1.5 }}
                    className="absolute left-0 top-1/2 w-3 h-3 bg-orange-500 rounded-full -translate-y-1/2"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Current Step Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-12 h-12 ${currentStepData.bgColor} rounded-2xl flex items-center justify-center mr-4 shadow-md`}
                  >
                    <currentStepData.icon className={`w-6 h-6 ${currentStepData.color}`} />
                  </motion.div>
                  
                  <div className="text-left">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl font-semibold text-gray-800 tracking-tight"
                    >
                      {currentStepData.text}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-gray-600 font-medium"
                    >
                      {currentStepData.subtext}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Прогресс</span>
                <span className="text-sm font-bold text-gray-800">{Math.round(progress)}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                >
                  <motion.div
                    animate={{ x: [-100, 200] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ width: '50px' }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Steps Indicator */}
            <div className="flex justify-center space-x-3">
              {loadingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: index === currentStep ? 1.2 : 1,
                    opacity: index <= currentStep ? 1 : 0.3
                  }}
                                  className={`w-3 h-3 rounded-full flex items-center justify-center ${
                  index < currentStep 
                    ? 'bg-emerald-500' 
                    : index === currentStep 
                    ? step.color.replace('text-', 'bg-')
                    : 'bg-gray-300'
                }`}
                >
                  {index < currentStep && (
                    <CheckIcon className="w-2 h-2 text-white" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.sin(i) * 10, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: `${20 + i * 6}%`,
                    top: `${30 + (i % 3) * 20}%`
                  }}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 