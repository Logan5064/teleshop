import React from 'react';
import { motion } from 'framer-motion';

interface ListItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  isActive?: boolean;
  actions?: React.ReactNode;
  leftIcon?: React.ReactNode;
  index?: number;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  description,
  isActive = true,
  actions,
  leftIcon,
  index = 0,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -1 }}
      className="ts-list-item cursor-pointer"
      onClick={onClick}
    >
      <div className="ts-list-item-content">
        <div className="ts-list-item-status">
          <div className={isActive ? 'ts-list-item-status-active' : 'ts-list-item-status-inactive'} />
        </div>
        
        {leftIcon && (
          <div className="flex-shrink-0">
            {leftIcon}
          </div>
        )}
        
        <div className="ts-list-item-text">
          <h3 className="ts-list-item-title">{title}</h3>
          {subtitle && (
            <p className="ts-list-item-subtitle">{subtitle}</p>
          )}
          {description && (
            <p className="ts-list-item-description">{description}</p>
          )}
        </div>
      </div>
      
      {actions && (
        <div className="ts-list-item-actions">
          {actions}
        </div>
      )}
    </motion.div>
  );
}; 