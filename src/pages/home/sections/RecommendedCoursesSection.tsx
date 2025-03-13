
import React from 'react';
import CourseCarousel from '@/components/course-carousel';
import { chosenForYou } from '../data/homepageData';

const RecommendedCoursesSection = () => {
  return (
    <CourseCarousel 
      title="Chosen For You" 
      courses={chosenForYou}
      viewAllUrl="/view-all/recommended"
    />
  );
};

export default RecommendedCoursesSection;
