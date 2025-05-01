import React from 'react';
import { PageTransition } from '../components/ui';
import { PlatformFeatures } from '../components/sections';

const About = () => {
  return (
    <PageTransition>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">عن منصتنا التعليمية</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
            منصة تعليمية عربية متكاملة تهدف إلى توفير محتوى تعليمي عالي الجودة للطلاب والمعلمين في بيئة تفاعلية ميسرة.
          </p>
        </div>
        
        {/* Platform Features Section - This is the section that matches the reference image */}
        <PlatformFeatures />
        
        {/* More content can be added here */}
      </div>
    </PageTransition>
  );
};

export default About; 