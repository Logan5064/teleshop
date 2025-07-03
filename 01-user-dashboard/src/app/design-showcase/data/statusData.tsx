import React from 'react'

export const statusData = [
  {
    name: 'Active Status',
    className: 'ts-status-active',
    code: 'ts-status-active',
    component: <span className="ts-status-active">Активно</span>,
    description: 'Индикатор активного состояния (зеленый)'
  },
  {
    name: 'Inactive Status',
    className: 'ts-status-inactive',
    code: 'ts-status-inactive',
    component: <span className="ts-status-inactive">Неактивно</span>,
    description: 'Индикатор неактивного состояния (серый)'
  },
  {
    name: 'Status in Cards',
    className: 'ts-card + ts-status-*',
    code: 'ts-card + ts-status-*',
    component: (
      <div className="ts-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Пользователь</h3>
          <span className="ts-status-active">Онлайн</span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Сервис</h3>
          <span className="ts-status-inactive">Оффлайн</span>
        </div>
      </div>
    ),
    description: 'Использование статусов в карточках'
  }
] 