import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 12px 24px rgba(59, 130, 246, 0.1)'
      }}
    >
      <div className="p-6 relative">
        {/* Decorative accent element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-full -z-10"></div>
        
        <div className="flex flex-col h-full">
          <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-5 z-10">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-50">{title}</h3>
          
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
      
      {/* Decorative accent bar at the bottom */}
      <div className="h-1.5 bg-gradient-to-l from-blue-500 to-blue-600"></div>
    </motion.div>
  );
};

export default FeatureCard; 