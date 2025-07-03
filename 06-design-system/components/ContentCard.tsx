import React from 'react';
import { motion } from 'framer-motion';

interface ContentCardProps {
  title: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  children,
  headerActions,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`ts-content-card ${className}`}
    >
      <div className="ts-content-header">
        <h2 className="ts-content-title">{title}</h2>
        {headerActions && (
          <div className="flex items-center gap-4">
            {headerActions}
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
}; 