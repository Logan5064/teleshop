import React from 'react'
import { Home, Settings, Bell } from 'lucide-react'

export const navigationSystemData = [
  {
    name: 'Nav Item',
    className: 'ts-nav-item',
    code: 'ts-nav-item',
    component: (
      <div className="ts-nav-item">
        <Home className="w-5 h-5 mr-2" />
        Навигационный элемент
      </div>
    ),
    description: 'Базовый элемент навигации'
  },
  {
    name: 'Active Nav Item',
    className: 'ts-nav-item ts-nav-item-active',
    code: 'ts-nav-item ts-nav-item-active',
    component: (
      <div className="ts-nav-item ts-nav-item-active">
        <Settings className="w-5 h-5 mr-2" />
        Активный элемент
      </div>
    ),
    description: 'Активный элемент навигации с градиентом'
  },
  {
    name: 'Inactive Nav Item',
    className: 'ts-nav-item ts-nav-item-inactive',
    code: 'ts-nav-item ts-nav-item-inactive',
    component: (
      <div className="ts-nav-item ts-nav-item-inactive">
        <Bell className="w-5 h-5 mr-2" />
        Неактивный элемент
      </div>
    ),
    description: 'Неактивный элемент навигации с hover эффектом'
  }
] 