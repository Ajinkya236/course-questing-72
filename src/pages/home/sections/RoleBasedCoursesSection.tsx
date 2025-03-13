
import React, { useState } from 'react';
import CourseCarousel from '@/components/course-carousel';
import { forYourRoleCourses, forYourRoleSkills } from '../data/homepageData';

const RoleBasedCoursesSection = () => {
  const [roleSkillFilter, setRoleSkillFilter] = useState('All Skills');
  
  return (
    <CourseCarousel 
      title="For Your Role" 
      courses={forYourRoleCourses}
      viewAllUrl="/view-all/role"
      filterOptions={forYourRoleSkills}
      showSkillFilters={true}
    />
  );
};

export default RoleBasedCoursesSection;
