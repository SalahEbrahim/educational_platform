import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiBook, FiPlus, FiEdit2, FiTrash2, FiUsers, FiInfo } from 'react-icons/fi';

const TeacherDashboard = () => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'مبتدئ'
  });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Fetch teacher's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/courses/teacher/me');
        setCourses(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('حدث خطأ أثناء تحميل الدورات');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle form input change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission for new course
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if editing or creating new course
      if (editingCourse) {
        // Update existing course
        const res = await axios.patch(`/api/courses/${editingCourse.id}`, formData);
        
        // Update courses state
        setCourses(courses.map(course => 
          course.id === editingCourse.id ? res.data.course : course
        ));
        
      } else {
        // Create new course
        const res = await axios.post('/api/courses', formData);
        
        // Add new course to state
        setCourses([...courses, res.data.course]);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        level: 'مبتدئ'
      });
      setShowForm(false);
      setEditingCourse(null);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Error submitting course:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء حفظ الدورة');
      setIsSubmitting(false);
    }
  };

  // Handle edit course button click
  const handleEditClick = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level
    });
    setEditingCourse(course);
    setShowForm(true);
  };

  // Handle delete course button click
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  // Confirm course deletion
  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/courses/${courseToDelete.id}`);
      
      // Remove course from state
      setCourses(courses.filter(course => course.id !== courseToDelete.id));
      
      // Close modal
      setShowDeleteModal(false);
      setCourseToDelete(null);
    } catch (err) {
      console.error('Error deleting course:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء حذف الدورة');
    }
  };

  // Cancel form
  const handleCancelForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      level: 'مبتدئ'
    });
    setShowForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          لوحة تحكم المعلم
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
      
      {/* Actions */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          دوراتي ({courses.length})
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCourse(null);
          }}
          className="btn-primary flex items-center"
        >
          <FiPlus className="ml-2" />
          <span>إضافة دورة جديدة</span>
        </button>
      </div>
      
      {/* Course Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingCourse ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  عنوان الدورة
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="أدخل عنوان الدورة"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  التصنيف
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="مثال: رياضيات، لغة عربية، علوم"
                />
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  المستوى
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  وصف الدورة
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-field"
                  placeholder="اكتب وصفاً مختصراً للدورة"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
              <button
                type="button"
                onClick={handleCancelForm}
                className="btn-outline"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isSubmitting ? 'جاري الحفظ...' : (editingCourse ? 'تحديث الدورة' : 'إضافة الدورة')}
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {/* Courses List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <FiBook className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">لا توجد دورات</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">ابدأ بإضافة دورتك الأولى</p>
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary inline-flex items-center"
            >
              <FiPlus className="ml-2" />
              <span>إضافة دورة جديدة</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 mb-2">
                      {course.category}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 mr-2">
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <FiUsers className="ml-1" />
                  <span>{course.enrolledStudents?.length || 0} طالب مسجل</span>
                </div>
                
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditClick(course)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 dark:text-primary-200 dark:bg-primary-900 dark:hover:bg-primary-800"
                  >
                    <FiEdit2 className="ml-1 h-4 w-4" />
                    تعديل
                  </button>
                  
                  <button
                    onClick={() => handleDeleteClick(course)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-200 dark:bg-red-900 dark:hover:bg-red-800"
                  >
                    <FiTrash2 className="ml-1 h-4 w-4" />
                    حذف
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-center text-red-500 mb-4">
              <FiInfo className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">
              تأكيد الحذف
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
              هل أنت متأكد من رغبتك في حذف دورة "{courseToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-outline"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                حذف
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard; 