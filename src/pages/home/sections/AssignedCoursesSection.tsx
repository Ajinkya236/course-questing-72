
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCarousel from '@/components/course-carousel';
import { assignedCourses, trainingCategories } from '../data/homepageData';

const AssignedCoursesSection = () => {
  const navigate = useNavigate();
  const [trainingFilter, setTrainingFilter] = useState('All Categories');
  
  return (
    <>
      {assignedCourses.length > 0 && (
        <CourseCarousel 
          title="Assigned Courses" 
          courses={assignedCourses}
          viewAllUrl="/my-learning?tab=courses&status=assigned"
          onViewAllClick={() => navigate('/my-learning?tab=courses&status=assigned')}
          filterOptions={trainingCategories}
          showSkillFilters={true}
          showTrainingCategory={true}
        />
      )}
    </>
  );
};

export default AssignedCoursesSection;
