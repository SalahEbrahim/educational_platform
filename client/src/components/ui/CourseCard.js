import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiBook, FiClock } from 'react-icons/fi';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

const courseCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.3
    }
  }
};

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    description,
    category,
    level,
    teacherId,
    enrolledStudents,
    createdAt
  } = course;

  // Format the description to be shorter if needed
  const shortDescription = description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  return (
    <motion.div
      className="h-full"
      variants={courseCardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Card className="h-full overflow-hidden flex flex-col">
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
          {/* Placeholder for course image - can be replaced with actual image later */}
          <div className="absolute inset-0 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30">
            <FiBook className="h-12 w-12 text-primary dark:text-primary-400" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <Badge variant="primary">{category}</Badge>
            <Badge variant="gray">{level}</Badge>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-text-primary dark:text-white line-clamp-2">{title}</h3>
          
          <p className="text-text-secondary dark:text-gray-300 mb-4 text-sm line-clamp-3">{shortDescription}</p>
          
          <div className="flex justify-between items-center text-sm text-text-secondary dark:text-gray-400 mb-4 mt-auto">
            <div className="flex items-center">
              <FiUser className="ml-1 rtl:ml-1 rtl:mr-0" />
              <span>{enrolledStudents.length} طالب</span>
            </div>
            <div className="flex items-center">
              <FiClock className="ml-1 rtl:ml-1 rtl:mr-0" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
        
        <Link to={`/courses/${id}`} className="block w-full mt-2">
          <Button variant="primary" className="w-full">
            عرض الكورس
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
};

export default CourseCard; 