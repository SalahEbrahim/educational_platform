const express = require('express');
const { 
  getCourses, 
  getCourseById, 
  getCoursesByTeacherId,
  createCourse, 
  updateCourse, 
  deleteCourse 
} = require('../models/db');
const { auth, authorizeTeacher, authorizeStudent } = require('../middleware/auth');

const router = express.Router();

// Get all courses (public)
router.get('/', (req, res) => {
  try {
    const courses = getCourses();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Get course by ID (public)
router.get('/:id', (req, res) => {
  try {
    const course = getCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Get teacher's courses
router.get('/teacher/me', auth, authorizeTeacher, (req, res) => {
  try {
    const courses = getCoursesByTeacherId(req.user.id);
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Create course (Teacher only)
router.post('/', auth, authorizeTeacher, (req, res) => {
  try {
    const { title, description, category, level, objectives, content } = req.body;
    
    // Create new course
    const newCourse = createCourse({
      id: Date.now().toString(),
      title,
      description,
      category,
      level,
      objectives: objectives || [],
      content: content || [],
      teacherId: req.user.id,
      enrolledStudents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    res.status(201).json({
      message: 'تم إنشاء الكورس بنجاح',
      course: newCourse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Update course (Teacher only)
router.patch('/:id', auth, authorizeTeacher, (req, res) => {
  try {
    const course = getCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    // Only the teacher who created the course can update it
    if (course.teacherId !== req.user.id) {
      return res.status(403).json({ message: 'ليس لديك صلاحية لتعديل هذا الكورس' });
    }
    
    const updatedCourse = updateCourse(req.params.id, {
      ...req.body,
      updatedAt: new Date().toISOString()
    });
    
    if (!updatedCourse) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    res.json({
      message: 'تم تحديث الكورس بنجاح',
      course: updatedCourse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Delete course (Teacher only)
router.delete('/:id', auth, authorizeTeacher, (req, res) => {
  try {
    const course = getCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    // Only the teacher who created the course can delete it
    if (course.teacherId !== req.user.id) {
      return res.status(403).json({ message: 'ليس لديك صلاحية لحذف هذا الكورس' });
    }
    
    const deleted = deleteCourse(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    res.json({ message: 'تم حذف الكورس بنجاح' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Enroll in course (Student only)
router.post('/:id/enroll', auth, authorizeStudent, (req, res) => {
  try {
    const course = getCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    // Check if student is already enrolled
    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({ message: 'أنت مسجل بالفعل في هذا الكورس' });
    }
    
    // Add student to enrolledStudents
    const updatedCourse = updateCourse(req.params.id, {
      enrolledStudents: [...course.enrolledStudents, req.user.id]
    });
    
    if (!updatedCourse) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    res.json({
      message: 'تم التسجيل في الكورس بنجاح',
      course: updatedCourse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Get enrolled students (Teacher only)
router.get('/:id/students', auth, authorizeTeacher, (req, res) => {
  try {
    const course = getCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'الكورس غير موجود' });
    }
    
    // Only the teacher who created the course can view enrolled students
    if (course.teacherId !== req.user.id) {
      return res.status(403).json({ message: 'ليس لديك صلاحية للوصول إلى هذه المعلومات' });
    }
    
    res.json({
      course: course.title,
      enrolledStudents: course.enrolledStudents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

module.exports = router; 