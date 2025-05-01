const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Path where data will be stored
const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const COURSES_FILE = path.join(DATA_DIR, 'courses.json');

// In-memory database
let db = {
  users: [],
  courses: []
};

// Create data directory if it doesn't exist
const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

// Read data from files if they exist
const loadData = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      db.users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }
    if (fs.existsSync(COURSES_FILE)) {
      db.courses = JSON.parse(fs.readFileSync(COURSES_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Save data to files
const saveData = () => {
  try {
    ensureDataDir();
    fs.writeFileSync(USERS_FILE, JSON.stringify(db.users, null, 2));
    fs.writeFileSync(COURSES_FILE, JSON.stringify(db.courses, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Create default admin user if not exists
const createDefaultAdmin = async () => {
  const adminExists = db.users.some(user => user.email === 'admin@gmail.com' && user.role === 'admin');
  
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('12345678', 10);
    
    const admin = {
      id: Date.now().toString(),
      name: 'مدير النظام',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    db.users.push(admin);
    saveData();
    console.log('Default admin user created');
  }
};

// Initialize database
const initializeDatabase = async () => {
  ensureDataDir();
  loadData();
  await createDefaultAdmin();
};

// User operations
const getUsers = () => db.users;
const getUserById = (id) => db.users.find(user => user.id === id);
const getUserByEmail = (email) => db.users.find(user => user.email === email);
const createUser = (user) => {
  db.users.push(user);
  saveData();
  return user;
};
const updateUser = (id, updates) => {
  const index = db.users.findIndex(user => user.id === id);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updates };
    saveData();
    return db.users[index];
  }
  return null;
};
const deleteUser = (id) => {
  const index = db.users.findIndex(user => user.id === id);
  if (index !== -1) {
    db.users.splice(index, 1);
    saveData();
    return true;
  }
  return false;
};

// Course operations
const getCourses = () => db.courses;
const getCourseById = (id) => db.courses.find(course => course.id === id);
const getCoursesByTeacherId = (teacherId) => db.courses.filter(course => course.teacherId === teacherId);
const createCourse = (course) => {
  db.courses.push(course);
  saveData();
  return course;
};
const updateCourse = (id, updates) => {
  const index = db.courses.findIndex(course => course.id === id);
  if (index !== -1) {
    db.courses[index] = { ...db.courses[index], ...updates };
    saveData();
    return db.courses[index];
  }
  return null;
};
const deleteCourse = (id) => {
  const index = db.courses.findIndex(course => course.id === id);
  if (index !== -1) {
    db.courses.splice(index, 1);
    saveData();
    return true;
  }
  return false;
};

module.exports = {
  initializeDatabase,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getCourses,
  getCourseById,
  getCoursesByTeacherId,
  createCourse,
  updateCourse,
  deleteCourse
}; 