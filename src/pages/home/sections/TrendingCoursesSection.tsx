
import React from 'react';
import CourseCarousel from '@/components/course-carousel';
import { trendingCourses } from '../data/homepageData';

const TrendingCoursesSection = () => {
  return (
    <CourseCarousel 
      title="Trending Now" 
      courses={trendingCourses}
      viewAllUrl="/view-all/trending"
    />
  );
};

export default TrendingCoursesSection;
