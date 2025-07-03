import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Currency formatting
export function formatCurrency(amount: number, currency: string = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Number formatting
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value);
}

// Percentage formatting
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Change color based on value
export function getChangeColor(change: number): string {
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
}

// Change icon based on value
export function getChangeIcon(change: number): string {
  if (change > 0) return '↗';
  if (change < 0) return '↘';
  return '→';
}
