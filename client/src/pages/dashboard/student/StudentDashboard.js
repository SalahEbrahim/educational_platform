import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiBook, FiBookOpen, FiSearch, FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import CourseCard from '../../../components/ui/CourseCard';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('enrolled');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        // Get all courses
        const coursesRes = await axios.get('/api/courses');
        
        // Filter courses based on enrollment
        const enrolled = [];
        const available = [];
        
        coursesRes.data.forEach(course => {
          if (course.enrolledStudents?.includes(currentUser.id)) {
            enrolled.push(course);
          } else {
            available.push(course);
          }
        });
        
        setEnrolledCourses(enrolled);
        setAvailableCourses(available);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('حدث خطأ أثناء تحميل الدورات');
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [currentUser]);

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`/api/courses/${courseId}/enroll`);
      
      // Move course from available to enrolled
      const course = availableCourses.find(c => c.id === courseId);
      
      if (course) {
        // Add current user to enrolled students
        const updatedCourse = {
          ...course,
          enrolledStudents: [...(course.enrolledStudents || []), currentUser.id]
        };
        
        setEnrolledCourses([...enrolledCourses, updatedCourse]);
        setAvailableCourses(availableCourses.filter(c => c.id !== courseId));
      }
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء التسجيل في الدورة');
    }
  };

  // Filter courses based on search term
  const filterCourses = (courses) => {
    if (!searchTerm.trim()) return courses;
    
    const term = searchTerm.toLowerCase();
    return courses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term)
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          لوحة تحكم الطالب
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          مرحباً، {currentUser?.name}
        </p>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 border-r-4 border-red-500 p-4">
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
        </div>
      )}
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center"
        >
          <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3 ml-4">
            <FiBookOpen className="h-8 w-8 text-primary-600 dark:text-primary-300" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              الدورات المسجلة
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {enrolledCourses.length}
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center"
        >
          <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3 ml-4">
            <FiBook className="h-8 w-8 text-primary-600 dark:text-primary-300" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              الدورات المتاحة
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {availableCourses.length}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Tabs and Search */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <nav className="flex space-x-8 space-x-reverse mb-4 sm:mb-0">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`${
                activeTab === 'enrolled'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              دوراتي ({enrolledCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`${
                activeTab === 'available'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              الدورات المتاحة ({availableCourses.length})
            </button>
          </nav>
          
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="ابحث عن دورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Course Lists */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div>
          {/* Enrolled Courses */}
          {activeTab === 'enrolled' && (
            <>
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">لم تسجل في أي دورة بعد</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">استعرض الدورات المتاحة وابدأ رحلة التعلم</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setActiveTab('available')}
                      className="btn-primary"
                    >
                      استعرض الدورات المتاحة
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterCourses(enrolledCourses).map(course => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="relative pb-2/3 bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary-100 dark:bg-primary-900">
                          <FiBookOpen className="h-16 w-16 text-primary-600 dark:text-primary-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {course.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                                {course.category}
                              </span>
                              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {course.level}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {course.description}
                        </p>
                        
                        <div className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <FiCalendar className="ml-1" />
                            <span>تاريخ الاشتراك: {formatDate(course.createdAt)}</span>
                          </div>
                        </div>
                        
                        <Link
                          to={`/courses/${course.id}`}
                          className="btn-primary w-full block text-center"
                        >
                          متابعة الدورة
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
          
          {/* Available Courses */}
          {activeTab === 'available' && (
            <>
              {availableCourses.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">لا توجد دورات متاحة</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">انت مسجل في جميع الدورات المتاحة حالياً</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterCourses(availableCourses).map(course => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="relative pb-2/3 bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary-100 dark:bg-primary-900">
                          <FiBook className="h-16 w-16 text-primary-600 dark:text-primary-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {course.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                                {course.category}
                              </span>
                              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {course.level}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {course.description}
                        </p>
                        
                        <div className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <FiUser className="ml-1" />
                            <span>{course.enrolledStudents?.length || 0} طالب مسجل</span>
                          </div>
                          <div className="flex items-center">
                            <FiClock className="ml-1" />
                            <span>تاريخ الإنشاء: {formatDate(course.createdAt)}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="btn-primary w-full"
                        >
                          التسجيل في الدورة
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard; 