import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconColor?: 'blue' | 'green' | 'purple' | 'orange';
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = 'blue',
  delay = 0
}) => {
  const iconColorClasses = {
    blue: 'ts-icon-blue',
    green: 'ts-icon-green', 
    purple: 'ts-icon-purple',
    orange: 'ts-icon-orange'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      className="ts-stats-card ts-hover-lift"
    >
      <div className="ts-stats-card-content">
        <div>
          <p className="ts-stats-card-text">{title}</p>
          <p className="ts-stats-card-number">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="ts-stats-card-subtitle">{subtitle}</p>
          )}
        </div>
        <div className={`ts-stats-card-icon ${iconColorClasses[iconColor]}`}>
          <div className="ts-icon-inner w-7 h-7">
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 