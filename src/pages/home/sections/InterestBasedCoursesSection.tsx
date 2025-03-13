
import React from 'react';
import CourseCarousel from '@/components/course-carousel';
import { basedOnInterest, skillFilters } from '../data/homepageData';

const InterestBasedCoursesSection = () => {
  return (
    <CourseCarousel 
      title="Based on Your Interest" 
      courses={basedOnInterest}
      viewAllUrl="/view-all/interest"
      filterOptions={skillFilters}
      showSkillFilters={true}
    />
  );
};

export default InterestBasedCoursesSection;
