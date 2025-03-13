
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCarousel from '@/components/course-carousel';
import { continueLearningCourses } from '../data/homepageData';

const ContinueLearningSection = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {continueLearningCourses.length > 0 && (
        <CourseCarousel 
          title="Continue Learning" 
          courses={continueLearningCourses}
          viewAllUrl="/my-learning?tab=courses&status=in-progress"
          onViewAllClick={() => navigate('/my-learning?tab=courses&status=in-progress')}
        />
      )}
    </>
  );
};

export default ContinueLearningSection;
