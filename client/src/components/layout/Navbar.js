import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiBook, FiHome, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Button } from '../ui';
import { DarkModeToggle } from '../ui';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout, isAdmin, isTeacher, isStudent } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Scroll progress for the progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define dashboard link based on user role
  const getDashboardLink = () => {
    if (isAdmin) return '/dashboard/admin';
    if (isTeacher) return '/dashboard/teacher';
    if (isStudent) return '/dashboard/student';
    return '/dashboard';
  };

  const navItemsData = [
    { path: '/', label: 'الرئيسية', icon: <FiHome /> },
    { path: '/courses', label: 'الدورات', icon: <FiBook /> },
    { path: '/about', label: 'من نحن', icon: <FiInfo /> },
    { path: '/contact', label: 'اتصل بنا', icon: <FiMessageSquare /> },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className={`w-full z-50 transition-all duration-300 border-b border-primary-400/30 backdrop-blur-md shadow-sm ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80' : 'bg-transparent dark:bg-transparent'}`}>
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
          style={{ scaleX }}
          initial={{ scaleX: 0 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            {/* Left side: Dark Mode Toggle and Logo */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <div className="hidden md:block">
                <DarkModeToggle />
              </div>
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="text-white text-lg font-bold">و</span>
                  </div>
                  <span className={`text-xl md:text-2xl font-title font-bold ${isScrolled ? 'text-primary dark:text-primary-400' : 'text-primary dark:text-text-dark'} group-hover:translate-x-0.5 transition-transform duration-300`}>
                    وسائلك
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 space-x-reverse">
              <div className="flex space-x-1 space-x-reverse">
                {navItemsData.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className={`nav-link flex items-center gap-1.5 ${isActive(item.path) ? 'nav-link-active' : ''}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="mr-8 flex items-center space-x-2 space-x-reverse">
                {/* Auth Buttons */}
                {isAuthenticated ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={toggleProfile}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isScrolled 
                        ? 'bg-gray-100/80 dark:bg-slate-800/80 text-text-primary dark:text-text-dark' 
                        : 'bg-white/10 text-white dark:text-text-dark backdrop-blur-sm'
                      } transition-colors duration-300 hover:shadow-sm`}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <FiUser />}
                      </div>
                      <span className="text-sm font-medium">{currentUser?.name}</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-xl py-2 z-10 border border-border-light dark:border-border-dark"
                        >
                          <div className="px-4 py-3 border-b border-border-light dark:border-border-dark">
                            <p className="text-sm font-medium text-text-primary dark:text-text-dark">{currentUser?.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{currentUser?.email}</p>
                          </div>
                          <Link
                            to={getDashboardLink()}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary dark:text-text-dark hover:bg-gray-50 dark:hover:bg-slate-700 w-full text-right"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FiUser className="h-4 w-4" />
                            <span>لوحة التحكم</span>
                          </Link>
                          <div className="border-t border-border-light dark:border-border-dark my-1"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-right"
                          >
                            <FiLogOut className="h-4 w-4" />
                            <span>تسجيل الخروج</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex space-x-2 space-x-reverse">
                    <Button 
                      as={Link} 
                      to="/login" 
                      variant="outline"
                      size="sm"
                      className={isScrolled ? 'hover:shadow-glow' : 'border-white/70 text-white hover:bg-white/10 dark:border-white/70 dark:text-white'}
                    >
                      تسجيل الدخول
                    </Button>
                    <Button 
                      as={Link} 
                      to="/register/student" 
                      variant="accent"
                      size="sm"
                      className="shadow-md text-gray-900 hover:shadow-success-glow"
                    >
                      التسجيل
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {/* Dark mode toggle for mobile */}
              <DarkModeToggle />
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-lg ${isScrolled 
                  ? 'bg-gray-100 dark:bg-slate-800 text-primary dark:text-text-dark' 
                  : 'bg-white/30 backdrop-blur-sm text-primary dark:text-white'
                } focus:outline-none transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 shadow-sm`}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg rounded-b-xl overflow-hidden"
            >
              <div className="px-4 py-5 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {navItemsData.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-xl text-base font-medium ${
                      isActive(item.path)
                        ? 'bg-primary-50 dark:bg-slate-700 text-primary dark:text-primary-400'
                        : 'text-text-primary dark:text-text-dark hover:bg-gray-50 dark:hover:bg-slate-700'
                    } transition-all duration-300`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                <div className="border-t border-border-light dark:border-border-dark my-2 pt-2">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 p-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                          {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <FiUser />}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary dark:text-text-dark">{currentUser?.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{currentUser?.email}</p>
                        </div>
                      </div>
                      <Link
                        to={getDashboardLink()}
                        className="flex items-center gap-3 p-3 rounded-xl text-base font-medium text-text-primary dark:text-text-dark hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiUser className="text-xl" />
                        <span>لوحة التحكم</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                      >
                        <FiLogOut className="text-xl" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Button 
                        as={Link} 
                        to="/login" 
                        variant="outline"
                        className="w-full hover:shadow-glow"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        تسجيل الدخول
                      </Button>
                      <Button 
                        as={Link} 
                        to="/register/student" 
                        variant="accent"
                        className="w-full text-gray-900 hover:shadow-accent-glow"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        التسجيل
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar; 