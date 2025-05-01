const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/db');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // In production, use environment variable

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    // Check if user is active (except for admin)
    if (user.role !== 'admin' && !user.isActive) {
      return res.status(403).json({ message: 'حسابك قيد التفعيل، يرجى الانتظار حتى يتم الموافقة عليه' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Return user info and token (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Register student
router.post('/register/student', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if email already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user with student role
    const newUser = createUser({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: 'student',
      isActive: false, // Needs admin approval
      createdAt: new Date().toISOString()
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح وبانتظار موافقة الإدارة',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// Register teacher
router.post('/register/teacher', async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;
    
    // Check if email already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user with teacher role
    const newUser = createUser({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: 'teacher',
      specialization,
      isActive: false, // Needs admin approval
      createdAt: new Date().toISOString()
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح وبانتظار موافقة الإدارة',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

module.exports = router; 