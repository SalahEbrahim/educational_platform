import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.3
    }
  }
};

const Card = ({
  children,
  className = '',
  hoverEffect = false,
  animateOnMount = true,
  ...props
}) => {
  // Base classes for the card
  const baseClasses = `
    bg-white dark:bg-gray-800 
    rounded-xl shadow-card 
    p-6 
    border border-gray-100 dark:border-gray-700 
    transition-all duration-300
  `;
  
  // Add hover effect if enabled
  const hoverClasses = hoverEffect ? 'hover:shadow-hover' : '';
  
  // Combine all classes
  const classes = `${baseClasses} ${hoverClasses} ${className}`.trim();

  return (
    <motion.div
      className={classes}
      initial={animateOnMount ? "hidden" : "visible"}
      animate="visible"
      whileHover={hoverEffect ? "hover" : undefined}
      variants={cardVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card; 