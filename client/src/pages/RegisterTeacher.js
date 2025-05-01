import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiCheckCircle, FiBookOpen } from 'react-icons/fi';

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { registerTeacher } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'الاسم مطلوب';
    }
    
    if (!formData.email) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'كلمات المرور غير متطابقة';
    }
    
    if (!formData.specialization.trim()) {
      errors.specialization = 'التخصص مطلوب';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Clear server error when user changes any field
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Register teacher
      await registerTeacher({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        specialization: formData.specialization
      });
      
      // Show success message
      setRegistrationSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        specialization: ''
      });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setServerError(error.response?.data?.message || 'حدث خطأ أثناء التسجيل');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">تسجيل معلم جديد</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            انضم إلينا كمعلم وشارك خبراتك ومعرفتك مع الطلاب
          </p>
        </div>
        
        {serverError && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/30 border-r-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="mr-3">
                <p className="text-sm text-red-600 dark:text-red-300">{serverError}</p>
              </div>
            </div>
          </div>
        )}
        
        {registrationSuccess && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/30 border-r-4 border-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiCheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="mr-3">
                <p className="text-sm text-green-600 dark:text-green-300">
                  تم تسجيل حسابك بنجاح! يرجى الانتظار حتى يتم الموافقة على حسابك من قبل الإدارة.
                </p>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  جاري تحويلك إلى صفحة تسجيل الدخول...
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              الاسم الكامل
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field pr-10 ${formErrors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field pr-10 ${formErrors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="أدخل بريدك الإلكتروني"
                dir="ltr"
              />
            </div>
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              التخصص
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiBookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="specialization"
                name="specialization"
                type="text"
                value={formData.specialization}
                onChange={handleChange}
                className={`input-field pr-10 ${formErrors.specialization ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="أدخل تخصصك (مثال: رياضيات، لغة عربية، علوم)"
              />
            </div>
            {formErrors.specialization && (
              <p className="mt-1 text-sm text-red-500">{formErrors.specialization}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`input-field pr-10 ${formErrors.password ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="أدخل كلمة المرور"
                dir="ltr"
              />
            </div>
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input-field pr-10 ${formErrors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="أعد إدخال كلمة المرور"
                dir="ltr"
              />
            </div>
            {formErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting || registrationSuccess}
              className="w-full btn-primary py-3 flex justify-center items-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                تسجيل الدخول
              </Link>
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              هل تريد التسجيل كطالب؟{' '}
              <Link to="/register/student" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                سجل كطالب
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterTeacher; 