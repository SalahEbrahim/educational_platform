import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  as: Component = 'button',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-white shadow-soft hover:shadow-hover hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500',
    accent: 'bg-accent text-white shadow-soft hover:shadow-hover hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-500',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary-50 dark:text-primary-300 dark:border-primary-300 dark:hover:bg-gray-800',
    text: 'text-primary hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-gray-800/30',
    success: 'bg-success text-white shadow-soft hover:bg-success/90',
    error: 'bg-error text-white shadow-soft hover:bg-error/90',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-5',
    lg: 'py-3 px-6 text-lg',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-60 cursor-not-allowed pointer-events-none';
  
  // Compute final classes
  const classes = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim();

  // If using a custom component like Link, we need to forward props differently
  if (Component !== 'button') {
    return (
      <Component
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    );
  }

  // Default button implementation with motion
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button; 