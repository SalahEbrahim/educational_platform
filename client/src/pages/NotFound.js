import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const NotFound = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-16 px-4 text-center">
        <Card className="max-w-md mx-auto p-8">
          <h1 className="text-5xl font-bold mb-4 text-error">404</h1>
          <h2 className="text-2xl mb-4">Page Not Found</h2>
          <p className="text-text-secondary dark:text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary">
              Go Home
            </Button>
          </Link>
        </Card>
      </div>
    </PageTransition>
  );
};

export default NotFound; 