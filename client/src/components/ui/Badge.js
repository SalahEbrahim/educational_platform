import React from 'react';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary/10 text-primary-700 dark:bg-primary/20 dark:text-primary-300',
    accent: 'bg-accent/10 text-accent-700 dark:bg-accent/20 dark:text-accent-300',
    success: 'bg-success/10 text-success dark:bg-success/20 dark:text-success/80',
    error: 'bg-error/10 text-error dark:bg-error/20 dark:text-error/80',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };
  
  // Combine all classes
  const classes = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `.trim();

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge; 