import { cn, formatCurrency, formatNumber, formatPercentage, getChangeColor, getChangeIcon } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  isLoading?: boolean;
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
};

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
  isLoading = false,
}: StatsCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (title.toLowerCase().includes('выручка') || title.toLowerCase().includes('доход')) {
        return formatCurrency(val);
      }
      if (title.toLowerCase().includes('конверс')) {
        return `${val.toFixed(1)}%`;
      }
      return formatNumber(val);
    }
    return val;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 animate-fade-in">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={cn(
            'w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center',
            colorClasses[color]
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {formatValue(value)}
            </p>
            {change !== undefined && (
              <span className={cn(
                'ml-2 text-sm font-medium flex items-center',
                getChangeColor(change)
              )}>
                <span className="mr-1">{getChangeIcon(change)}</span>
                {formatPercentage(change)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
