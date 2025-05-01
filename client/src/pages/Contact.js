import React from 'react';
import PageTransition from '../components/ui/PageTransition';
import Card from '../components/ui/Card';

const Contact = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Page</h1>
        <Card animateOnMount={false}>
          Contact content will go here
        </Card>
      </div>
    </PageTransition>
  );
};

export default Contact; 