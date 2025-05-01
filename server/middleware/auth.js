const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/db');

const JWT_SECRET = 'your_jwt_secret_key'; // In production, use environment variable

// Authentication middleware
const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'غير مصرح، يرجى تسجيل الدخول' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'الرمز غير صالح' });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists and has a role
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'ليس لديك صلاحية للوصول إلى هذه الصفحة' });
    }
    
    // User has required role
    next();
  };
};

// Teacher authorization middleware
const authorizeTeacher = (req, res, next) => {
  // Check if user is a teacher
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'ليس لديك صلاحية للوصول إلى هذه الصفحة' });
  }
  
  // Check if teacher is active
  const teacher = getUserById(req.user.id);
  if (!teacher || !teacher.isActive) {
    return res.status(403).json({ message: 'حسابك قيد التفعيل، يرجى الانتظار حتى يتم الموافقة عليه' });
  }
  
  next();
};

// Student authorization middleware
const authorizeStudent = (req, res, next) => {
  // Check if user is a student
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'ليس لديك صلاحية للوصول إلى هذه الصفحة' });
  }
  
  // Check if student is active
  const student = getUserById(req.user.id);
  if (!student || !student.isActive) {
    return res.status(403).json({ message: 'حسابك قيد التفعيل، يرجى الانتظار حتى يتم الموافقة عليه' });
  }
  
  next();
};

// Admin authorization middleware
const authorizeAdmin = (req, res, next) => {
  // Check if user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'ليس لديك صلاحية للوصول إلى هذه الصفحة' });
  }
  
  next();
};

module.exports = {
  auth,
  authorize,
  authorizeTeacher,
  authorizeStudent,
  authorizeAdmin
}; 