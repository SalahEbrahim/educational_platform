import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiAward, FiUsers, FiBookOpen, FiSmartphone, FiShield } from 'react-icons/fi';

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

const FeaturesHighlight = () => {
  const features = [
    {
      icon: <FiMonitor className="h-6 w-6 text-blue-500" />,
      title: 'دروس فيديو تفاعلية',
      description: 'شاهد دروسًا مصورة بجودة عالية وتعلم المفاهيم بطريقة مبسطة وممتعة'
    },
    {
      icon: <FiAward className="h-6 w-6 text-blue-500" />,
      title: 'اختبارات وتمارين',
      description: 'قم بإجراء اختبارات تفاعلية تساعدك على التحقق من فهمك للمواد الدراسية'
    },
    {
      icon: <FiUsers className="h-6 w-6 text-blue-500" />,
      title: 'منتدى للمناقشة',
      description: 'تفاعل مع المعلمين والطلاب الآخرين واستفسر عن أي مسألة تواجهك'
    },
    {
      icon: <FiShield className="h-6 w-6 text-blue-500" />,
      title: 'تتبع التقدم',
      description: 'راقب تقدمك في التعلم مع خيارات متابعة تفصيلية ورسوم بيانية'
    },
    {
      icon: <FiSmartphone className="h-6 w-6 text-blue-500" />,
      title: 'متوافقة مع جميع الأجهزة',
      description: 'استعمل المنصة من أي جهاز محمول أو مكتبي بسهولة تامة'
    },
    {
      icon: <FiBookOpen className="h-6 w-6 text-blue-500" />,
      title: 'شهادات إتمام',
      description: 'احصل على شهادات معتمدة لتوثيق مهاراتك وإنجازاتك التعليمية'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">ما يميز منصتنا التعليمية</h2>
          <p className="text-gray-600 dark:text-gray-300">المميزات التي تجعل منصتنا تحقق أفضل النتائج التعليمية</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={itemVariant}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 } 
              }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 h-full relative overflow-hidden group transition-all duration-300 hover:shadow-xl">
                {/* Accent decoration */}
                <div className="absolute inset-0 bg-blue-500/[0.03] dark:bg-blue-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon container with accent bubble behind it */}
                <div className="relative mb-4">
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-500/10 rounded-full"></div>
                  <div className="relative z-10 bg-white dark:bg-slate-700 w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-50">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                
                {/* Accent line */}
                <div className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-l from-transparent via-blue-500/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesHighlight; 