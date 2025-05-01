import React from 'react';
import { motion } from 'framer-motion';

// Custom icons that match the layout in the reference image
const VideoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:filter dark:brightness-125">
    <path d="M21 7H7C5.34315 7 4 8.34315 4 10V18C4 19.6569 5.34315 21 7 21H21C22.6569 21 24 19.6569 24 18V10C24 8.34315 22.6569 7 21 7Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 14L12.5 11V17L16.5 14Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TestIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:filter dark:brightness-125">
    <path d="M14 21L21 14L18 11L14 15L10 11L7 14L14 21Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 14V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H9C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V9C7 8.46957 7.21071 7.96086 7.58579 7.58579C7.96086 7.21071 8.46957 7 9 7H18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ForumIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:filter dark:brightness-125">
    <path d="M21 14C21 14.7956 20.6839 15.5587 20.1213 16.1213C19.5587 16.6839 18.7956 17 18 17H10L7 20V10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7H18C18.7956 7 19.5587 7.31607 20.1213 7.87868C20.6839 8.44129 21 9.20435 21 10V14Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="11" cy="12" r="1" fill="#3B82F6"/>
    <circle cx="14" cy="12" r="1" fill="#3B82F6"/>
    <circle cx="17" cy="12" r="1" fill="#3B82F6"/>
  </svg>
);

const CertificateIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:filter dark:brightness-125">
    <rect x="4" y="7" width="15" height="18" rx="2" stroke="#10B981" strokeWidth="2"/>
    <path d="M9 12H14" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 16H14" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 16L23 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 14L21 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DeviceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:filter dark:brightness-125">
    <path d="M18 4H10C8.89543 4 8 4.89543 8 6V22C8 23.1046 8.89543 24 10 24H18C19.1046 24 20 23.1046 20 22V6C20 4.89543 19.1046 4 18 4Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 20H14.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProgressIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:filter dark:brightness-125">
    <path d="M14 24C19.5228 24 24 19.5228 24 14C24 8.47715 19.5228 4 14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 24 14 24Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 9V14L17 17" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const PlatformFeatures = () => {
  const features = [
    {
      icon: <VideoIcon />,
      title: 'دروس فيديو تفاعلية',
      description: 'شاهد دروسًا مصورة بجودة عالية وتعلم المفاهيم بطريقة مبسطة وممتعة',
      color: 'primary'
    },
    {
      icon: <TestIcon />,
      title: 'اختبارات وتمارين',
      description: 'قم بإجراء اختبارات تفاعلية تساعدك على التحقق من فهمك للمواد الدراسية',
      color: 'primary'
    },
    {
      icon: <ForumIcon />,
      title: 'منتدى للمناقشة',
      description: 'تفاعل مع المعلمين والطلاب الآخرين واستفسر عن أي مسألة تواجهك',
      color: 'primary'
    },
    {
      icon: <ProgressIcon />,
      title: 'تتبع التقدم',
      description: 'راقب تقدمك في التعلم مع خيارات متابعة تفصيلية ورسوم بيانية',
      color: 'success'
    },
    {
      icon: <DeviceIcon />,
      title: 'متوافقة مع جميع الأجهزة',
      description: 'استعمل المنصة من أي جهاز محمول أو مكتبي بسهولة تامة',
      color: 'primary'
    },
    {
      icon: <CertificateIcon />,
      title: 'شهادات إتمام',
      description: 'احصل على شهادات معتمدة لتوثيق مهاراتك وإنجازاتك التعليمية',
      color: 'success'
    }
  ];

  return (
    <section className="py-16 bg-background-light dark:bg-slate-900 relative">
      {/* Animated background elements with improved visibility */}
      <div className="absolute inset-0 bg-animated-grid"></div>
      
      <div className="floating-element circle-element w-48 h-48 bg-primary-300/30 dark:bg-primary-400/20 top-10 left-10 animate-float-slow"></div>
      <div className="floating-element circle-element w-32 h-32 bg-success-300/30 dark:bg-success-400/20 bottom-20 right-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">ما يميز منصتنا التعليمية</h2>
          <p className="section-subtitle">المميزات التي تجعل منصتنا تحقق أفضل النتائج التعليمية</p>
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
              variants={itemVariant}
              className="feature-card"
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                transition: { duration: 0.3 } 
              }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 h-full relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border-light dark:border-border-dark group">
                {/* Enhanced gradient background on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                  feature.color === 'primary' 
                    ? 'from-primary-500/30 to-primary-600/30 dark:from-primary-400/40 dark:to-primary-500/40' 
                    : 'from-success-500/30 to-success-600/30 dark:from-success-400/40 dark:to-success-500/40'
                } rounded-2xl opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300`}></div>
                
                <div className="relative flex items-start">
                  <div className={`${
                    feature.color === 'primary' 
                      ? 'bg-primary-50 dark:bg-primary-900/40 dark:border dark:border-primary-600/30' 
                      : 'bg-success-50 dark:bg-success-900/40 dark:border dark:border-success-600/30'
                  } rounded-xl p-3 mr-4 group-hover:shadow-sm transition-all duration-300 relative overflow-hidden`}>
                    {/* Enhanced animated circle behind icon */}
                    <div className={`absolute inset-0 ${
                      feature.color === 'primary' 
                        ? 'bg-primary-100 dark:bg-primary-700/50' 
                        : 'bg-success-100 dark:bg-success-700/50'
                    } rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-0 group-hover:scale-100`}></div>
                    <div className="relative">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1 text-text-primary dark:text-white group-hover:text-primary dark:group-hover:text-primary-300 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                
                {/* Enhanced interactive spotlight effect on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial-gradient"></div>
                
                {/* Enhanced animated dots in bottom right corner */}
                <div className="absolute bottom-2 left-2 w-12 h-12 dot-pattern rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformFeatures; 