import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhoneCall, FiMapPin, FiSend, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Button } from '../ui';

const socialLinks = [
  { name: 'facebook', icon: './img/social/facebook.svg', url: '#' },
  { name: 'twitter', icon: './img/social/twitter.svg', url: '#' },
  { name: 'instagram', icon: './img/social/instagram.svg', url: '#' },
  { name: 'youtube', icon: './img/social/youtube.svg', url: '#' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Main Footer */}
      <div className="bg-white dark:bg-slate-900 pt-16 pb-6 relative overflow-hidden border-t border-border-light dark:border-border-dark animated-texture">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent dark:via-primary-400"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/30 dark:bg-primary-400/30 rounded-full filter blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-success/20 dark:bg-success-400/30 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
            {/* About Section */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-6 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md relative overflow-hidden group-hover:shadow-glow transition-all duration-300">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-white text-lg font-bold">و</span>
                </div>
                <span className="text-xl font-title font-bold text-primary dark:text-primary-300 group-hover:translate-x-0.5 transition-transform duration-300">
                  وسائلك
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                منصة تعليمية عربية متكاملة تهدف إلى توفير محتوى تعليمي عالي الجودة للطلاب والمعلمين في بيئة تفاعلية ميسرة.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mt-8">
                <h4 className="text-text-primary dark:text-white font-bold mb-4">اشترك في نشرتنا البريدية</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="البريد الإلكتروني" 
                    className="flex-grow p-3 rounded-r-lg bg-gray-100 dark:bg-slate-800 border border-border-light dark:border-border-dark text-text-primary dark:text-gray-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all duration-300"
                  />
                  <Button 
                    variant="primary" 
                    className="rounded-l-lg rounded-r-none shimmer"
                  >
                    <FiSend />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-title font-bold mb-6 text-text-primary dark:text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:h-1 after:w-10 after:bg-primary dark:after:bg-primary-400 after:rounded-full">
                روابط سريعة
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>الرئيسية</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>الدورات</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>من نحن</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>اتصل بنا</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Teachers and Students */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-title font-bold mb-6 text-text-primary dark:text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:h-1 after:w-10 after:bg-primary dark:after:bg-primary-400 after:rounded-full">
                انضم إلينا
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/register/teacher" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>سجل كمعلم</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/register/student" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>سجل كطالب</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>تسجيل الدخول</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>سياسة الخصوصية</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-4">
              <h3 className="text-lg font-title font-bold mb-6 text-text-primary dark:text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:h-1 after:w-10 after:bg-primary dark:after:bg-primary-400 after:rounded-full">
                معلومات الاتصال
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/40 dark:border dark:border-primary-700/30 rounded-lg mt-1">
                    <FiMapPin className="h-5 w-5 text-primary dark:text-primary-300" />
                  </div>
                  <div>
                    <span className="text-text-primary dark:text-white block">شارع المعرفة، المدينة التعليمية</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm block">الدولة العربية</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/40 dark:border dark:border-primary-700/30 rounded-lg">
                    <FiPhoneCall className="h-5 w-5 text-primary dark:text-primary-300" />
                  </div>
                  <div>
                    <span className="text-text-primary dark:text-white block" dir="ltr">+123 456 7890</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm block">الأحد - الخميس (8:00 - 17:00)</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/40 dark:border dark:border-primary-700/30 rounded-lg">
                    <FiMail className="h-5 w-5 text-primary dark:text-primary-300" />
                  </div>
                  <span className="text-text-primary dark:text-white">info@wasaelak.com</span>
                </li>
              </ul>
              
              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-text-primary dark:text-white font-bold mb-4">تابعنا</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/40 dark:border dark:border-primary-700/30 flex items-center justify-center hover:bg-primary/20 dark:hover:bg-primary-700/50 transition-all duration-300"
                      whileHover={{ y: -3, boxShadow: '0 4px 8px rgba(59, 130, 246, 0.2)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={social.icon} alt={social.name} className="w-5 h-5 dark:filter dark:brightness-125" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/90 text-sm">
              &copy; {currentYear} وسائلك. جميع الحقوق محفوظة
            </p>
            <div className="flex mt-4 md:mt-0">
              <img src="./img/payment-methods.svg" alt="Payment methods" className="h-6 dark:filter dark:brightness-110" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Element */}
      <div className="fixed bottom-8 left-8 z-40">
        <motion.div 
          className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4 rounded-2xl shadow-xl flex flex-col items-start gap-1 group cursor-pointer animate-glow-pulse"
          whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, repeatType: "mirror" }, 
            default: { duration: 0.3 } 
          }}
        >
          <span className="font-bold">ذاكر في أي وقت</span>
          <span className="text-sm block">من أي مكان</span>
          <button className="bg-white text-primary-500 py-1 px-3 rounded-lg text-sm font-bold mt-2 transition-transform group-hover:scale-105">تواصل معنا</button>
          
          {/* Enhanced Animated dots */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-success/60 dark:bg-success-400/60 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary-300/60 dark:bg-primary-200/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 