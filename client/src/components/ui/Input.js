import React, { useState } from 'react';
import { motion } from 'framer-motion';

const inputVariants = {
  focus: {
    scale: 1.01,
    transition: { duration: 0.2 }
  }
};

const labelVariants = {
  default: {
    y: 0,
    scale: 1,
    color: '#6B7280',
    transition: { duration: 0.2 }
  },
  focus: {
    y: -25,
    scale: 0.85,
    color: '#3B82F6',
    transition: { duration: 0.2 }
  },
  filled: {
    y: -25,
    scale: 0.85,
    color: '#6B7280',
    transition: { duration: 0.2 }
  }
};

const Input = ({
  id,
  name,
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  className = '',
  error = '',
  required = false,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Base classes
  const baseClasses = `
    w-full p-3 
    border rounded-xl 
    bg-white text-text-primary placeholder-text-secondary/60
    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 focus:ring-offset-0
    dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-primary-900 dark:text-white
    transition-all duration-300
  `;
  
  // Error classes
  const errorClasses = error 
    ? 'border-error focus:border-error focus:ring-error/20'
    : 'border-gray-300';
  
  // Disabled classes
  const disabledClasses = disabled 
    ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-900' 
    : '';
  
  // Combine all classes
  const inputClasses = `
    ${baseClasses}
    ${errorClasses}
    ${disabledClasses}
    ${className}
  `.trim();

  // Input container for animation
  const containerClasses = 'relative mb-6';

  // Determine label state for animation
  const getLabelVariant = () => {
    if (isFocused) return 'focus';
    if (value) return 'filled';
    return 'default';
  };

  return (
    <div className={containerClasses}>
      {label && (
        <motion.label
          htmlFor={id}
          variants={labelVariants}
          initial={value ? 'filled' : 'default'}
          animate={getLabelVariant()}
          className="absolute left-3 top-3 origin-left cursor-text text-text-secondary dark:text-gray-400 z-10"
        >
          {label}{required && <span className="text-error ml-1">*</span>}
        </motion.label>
      )}
      
      <motion.input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        className={inputClasses}
        disabled={disabled}
        required={required}
        variants={inputVariants}
        whileFocus="focus"
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-error text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input; 