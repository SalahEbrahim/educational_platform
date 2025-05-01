import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = ({ className = '' }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  // When used in the navbar, we don't want it fixed positioned
  const inNavbar = className.includes('in-navbar') || true;
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className={`${inNavbar ? '' : 'dark-mode-toggle'} ${darkMode ? 'dark-mode-toggle-dark' : 'dark-mode-toggle-light'} ${className} p-2 rounded-full`}
      aria-label="Toggle dark mode"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ 
          rotate: darkMode ? 0 : 180,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 0.5 },
          scale: { duration: 0.5, times: [0, 0.5, 1] }
        }}
        className="flex items-center justify-center"
      >
        {darkMode ? (
          <FiSun className="h-5 w-5" />
        ) : (
          <FiMoon className="h-5 w-5" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle; 