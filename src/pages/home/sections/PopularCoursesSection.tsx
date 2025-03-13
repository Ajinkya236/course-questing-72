
import React from 'react';
import CourseCarousel from '@/components/course-carousel';
import { popularWithSimilarUsers } from '../data/homepageData';

const PopularCoursesSection = () => {
  return (
    <CourseCarousel 
      title="Popular with Similar Users" 
      courses={popularWithSimilarUsers}
      viewAllUrl="/view-all/popular"
    />
  );
};

export default PopularCoursesSection;
