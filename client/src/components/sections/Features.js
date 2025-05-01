import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiAward, FiUsers, FiBookOpen, FiSmartphone, FiShield } from 'react-icons/fi';
import { FeatureCard } from '../ui';

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

const Features = () => {
  const features = [
    {
      icon: <FiMonitor className="h-8 w-8 text-blue-500" />,
      title: 'دروس فيديو تفاعلية',
      description: 'شاهد دروسًا مصورة بجودة عالية وتعلم المفاهيم بطريقة مبسطة وممتعة'
    },
    {
      icon: <FiAward className="h-8 w-8 text-blue-500" />,
      title: 'اختبارات وتمارين',
      description: 'قم بإجراء اختبارات تفاعلية تساعدك على التحقق من فهمك للمواد الدراسية'
    },
    {
      icon: <FiUsers className="h-8 w-8 text-blue-500" />,
      title: 'منتدى للمناقشة',
      description: 'تفاعل مع المعلمين والطلاب الآخرين واستفسر عن أي مسألة تواجهك'
    },
    {
      icon: <FiBookOpen className="h-8 w-8 text-blue-500" />,
      title: 'شهادات إتمام',
      description: 'احصل على شهادات معتمدة لتوثيق مهاراتك وإنجازاتك التعليمية'
    },
    {
      icon: <FiSmartphone className="h-8 w-8 text-blue-500" />,
      title: 'متوافقة مع جميع الأجهزة',
      description: 'استعمل المنصة من أي جهاز محمول أو مكتبي بسهولة تامة'
    },
    {
      icon: <FiShield className="h-8 w-8 text-blue-500" />,
      title: 'تتبع التقدم',
      description: 'راقب تقدمك في التعلم مع خيارات متابعة تفصيلية ورسوم بيانية'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">ما يميز منصتنا التعليمية</h2>
          <p className="section-subtitle">المميزات التي تجعل منصتنا تحقق أفضل النتائج التعليمية</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 