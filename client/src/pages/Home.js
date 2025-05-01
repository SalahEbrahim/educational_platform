import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookOpen, FiUsers, FiAward, FiMonitor, FiShield, FiSmartphone } from 'react-icons/fi';
import { PageTransition, Button, Card } from '../components/ui';
import PlatformFeatures from '../components/sections/PlatformFeatures';

// Animation variants
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const Home = () => {
  const features = [
    {
      title: 'دروس فيديو تفاعلية',
      description: 'شاهد دروسًا مصورة بجودة عالية وتعلم المفاهيم بطريقة مبسطة وممتعة',
      icon: <FiMonitor className="h-8 w-8 text-blue-500" />
    },
    {
      title: 'اختبارات وتمارين',
      description: 'قم بإجراء اختبارات تفاعلية تساعدك على التحقق من فهمك للمواد الدراسية',
      icon: <FiAward className="h-8 w-8 text-sky-400" />
    },
    {
      title: 'منتدى للمناقشة',
      description: 'تفاعل مع المعلمين والطلاب الآخرين واستفسر عن أي مسألة تواجهك',
      icon: <FiUsers className="h-8 w-8 text-blue-500" />
    },
    {
      title: 'شهادات إتمام',
      description: 'احصل على شهادات معتمدة لتوثيق مهاراتك وإنجازاتك التعليمية',
      icon: <FiBookOpen className="h-8 w-8 text-sky-400" />
    },
    {
      title: 'متوافقة مع جميع الأجهزة',
      description: 'استعمل المنصة من أي جهاز محمول أو مكتبي بسهولة تامة',
      icon: <FiSmartphone className="h-8 w-8 text-blue-500" />
    },
    {
      title: 'تتبع التقدم',
      description: 'راقب تقدمك في التعلم مع خيارات متابعة تفصيلية ورسوم بيانية',
      icon: <FiShield className="h-8 w-8 text-sky-400" />
    }
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: 'أنشئ حسابك',
      description: 'سجل حساب أو قم بتسجيل الدخول بسهولة'
    },
    {
      number: 2,
      title: 'اختر الدروس',
      description: 'تصفح قائمة الدروس واختر ما يناسب احتياجاتك التعليمية'
    },
    {
      number: 3,
      title: 'ابدأ التعلم',
      description: 'شاهد الدروس وحل التمارين وتفاعل مع المعلمين والطلاب'
    }
  ];

  const topTeachers = [
    {
      id: 1,
      name: 'أحمد الجندي',
      subject: 'أستاذ الرياضيات',
      image: './img/teachers/teacher1.jpg'
    },
    {
      id: 2,
      name: 'محمد حسن',
      subject: 'أستاذ اللغة العربية',
      image: './img/teachers/teacher2.jpg'
    },
    {
      id: 3,
      name: 'خالد عادل',
      subject: 'أستاذ العلوم',
      image: './img/teachers/teacher3.jpg'
    }
  ];

  return (
    <PageTransition>
      {/* Hero Section with animated background */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 md:py-24 animated-texture">
        <div className="absolute inset-0 bg-[url('./img/pattern.svg')] opacity-10"></div>
        
        {/* Enhanced Floating circles for better visibility */}
        <div className="floating-element circle-element w-64 h-64 bg-primary-300 -top-20 -right-20 animate-float-slow"></div>
        <div className="floating-element circle-element w-40 h-40 bg-success-400 bottom-10 -left-10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="floating-element circle-element w-20 h-20 bg-primary-400 top-40 right-[20%] animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 text-right mb-12 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                منصة <span className="text-sky-400">وسائلك</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
                منصة تعليمية عربية متكاملة تجمع بين المعلمين والطلاب في بيئة تفاعلية سهلة الاستخدام
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="shadow-lg text-lg shimmer"
                  as={Link}
                  to="/register/student"
                >
                  ابدأ التعلم الآن
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white text-white hover:bg-white/20 dark:bg-white/5 text-lg"
                  as={Link}
                  to="/about"
                >
                  تعرف على المزيد
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                <img 
                  src="/img/hero-image-new.png" 
                  alt="طلاب يتعلمون" 
                  className="hero-image w-full h-auto z-10 relative rounded-none border-0 shadow-none"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-sky-400 z-0 animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-700 z-0 animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background-light dark:from-slate-900 to-transparent"></div>
      </section>

      {/* Top Teachers Section with dotted background */}
      <section className="py-16 bg-background-light dark:bg-slate-900 relative bg-animated-grid">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">أشهر المدرسين</h2>
            <p className="section-subtitle">نخبة من أفضل المدرسين في مختلف المجالات</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {topTeachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                className="teacher-card shimmer"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="teacher-image-container">
                  <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/80 to-transparent opacity-50"></div>
                </div>
                <div className="teacher-info">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">{teacher.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{teacher.subject}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              as={Link} 
              to="/teachers"
              className="px-8"
            >
              عرض المزيد من المدرسين
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Replace with our new component */}
      <PlatformFeatures />

      {/* How It Works Section */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Enhanced Background decorative elements */}
        <div className="floating-element dot-pattern w-48 h-48 top-16 right-10 opacity-40 rounded-full"></div>
        <div className="floating-element dot-pattern w-48 h-48 bottom-16 left-10 opacity-40 rounded-full"></div>
        
        {/* Enhanced Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 to-transparent dark:from-primary-800/20 dark:to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-3">كيف تعمل المنصة؟</h2>
            <p className="section-subtitle">ثلاث خطوات بسيطة تبدأ بها رحلتك التعليمية</p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative max-w-5xl mx-auto">
            {/* Connecting line with animation */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 dark:from-primary-900/30 dark:via-primary-700/50 dark:to-primary-900/30 hidden md:block">
              <motion.div 
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              ></motion.div>
            </div>
            
            {howItWorksSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="w-full md:w-1/3 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center h-full flex flex-col items-center border border-border-light dark:border-border-dark shadow-sm hover:shadow-glow dark:hover:shadow-primary/20 transition-all duration-300 group relative overflow-hidden">
                  {/* Subtle gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100/60 dark:bg-primary-900/20 -mr-8 -mt-8 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-accent-secondary/30 dark:bg-accent-secondary/10 -ml-6 -mb-6 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  
                  {/* Numbered circle */}
                  <div className="w-20 h-20 rounded-full bg-primary-gradient text-white flex items-center justify-center text-3xl font-bold mb-8 relative overflow-hidden shadow-md group-hover:shadow-glow z-10 transform group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 bg-primary-400/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Animated ripple effect on hover */}
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                    <span className="relative z-10">{step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-text-primary dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-400 transition-colors duration-300 relative z-10">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">{step.description}</p>
                </div>
                
                {/* Conditional connector for mobile */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="h-8 w-0.5 bg-primary-200 dark:bg-primary-800 mx-auto my-2 md:hidden"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section with animated background */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800 relative animated-texture">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">حصرياً للمنصة</h2>
            <p className="section-subtitle">أحدث الكورسات المتاحة حصرياً لطلابنا</p>
          </motion.div>
          
          {/* Courses would go here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course cards would be mapped here */}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              as={Link} 
              to="/courses"
              className="px-8 shimmer"
            >
              عرض جميع الكورسات
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section with floating elements */}
      <section className="py-20 bg-primary-gradient text-white relative overflow-hidden">
        <div className="floating-element circle-element w-48 h-48 bg-white top-0 right-10 opacity-20 animate-float-slow"></div>
        <div className="floating-element circle-element w-32 h-32 bg-white bottom-0 left-20 opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز للبدء في رحلتك التعليمية؟</h2>
            <p className="text-white/90 text-xl mb-10">انضم إلى منصتنا التعليمية اليوم واستمتع بطريقة تفاعلية مبتكرة</p>
            <Button 
              variant="accent" 
              size="lg" 
              className="shadow-xl shimmer"
              as={Link}
              to="/register/student"
            >
              سجل الآن
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Materials Section with grid background */}
      <section className="py-20 bg-white dark:bg-slate-900 relative bg-animated-grid">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">مواد وسائلك</h2>
            <p className="section-subtitle">تصفح المواد الدراسية المتاحة على المنصة</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="bg-blue-50 dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-blue-500">الصف الأول الثانوي</h3>
              <ul className="space-y-2">
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الرياضيات</li>
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الفيزياء</li>
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الكيمياء</li>
              </ul>
              <div className="mt-4">
                <button className="bg-accent-secondary text-white py-2 px-4 rounded-lg w-full hover:shadow-success-glow transition-all duration-300">عرض جميع المواد</button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-blue-500">الصف الثاني الثانوي</h3>
              <ul className="space-y-2">
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الرياضيات</li>
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الفيزياء</li>
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الكيمياء</li>
              </ul>
              <div className="mt-4">
                <button className="bg-accent-secondary text-white py-2 px-4 rounded-lg w-full hover:shadow-success-glow transition-all duration-300">عرض جميع المواد</button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-blue-500">الصف الثالث الثانوي</h3>
              <ul className="space-y-2">
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الرياضيات</li>
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الفيزياء</li>
                <li className="bg-white dark:bg-slate-700 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-600 transition-colors duration-300">الكيمياء</li>
              </ul>
              <div className="mt-4">
                <button className="bg-accent-secondary text-white py-2 px-4 rounded-lg w-full hover:shadow-success-glow transition-all duration-300">عرض جميع المواد</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home; 