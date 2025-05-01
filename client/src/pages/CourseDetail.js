import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const CourseDetail = () => {
  const { id } = useParams();
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Course Details</h1>
        <Card animateOnMount={false}>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="primary">Course ID:</Badge>
            <span>{id}</span>
          </div>
          <p>Course detail content will go here</p>
        </Card>
      </div>
    </PageTransition>
  );
};

export default CourseDetail; 