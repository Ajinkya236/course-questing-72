
import React from 'react';
import { Course } from "@/types/course";
import CourseCarouselCard from './CourseCarouselCard';

interface CourseCarouselItemProps {
  course: Course;
  hoveredCourseId: string | null;
  handleCourseHover: (courseId: string) => void;
  handleCourseLeave: () => void;
  handleCardClick: (courseId: string) => void;
  showTrainingCategory?: boolean;
}

const CourseCarouselItem: React.FC<CourseCarouselItemProps> = ({
  course,
  hoveredCourseId,
  handleCourseHover,
  handleCourseLeave,
  handleCardClick,
  showTrainingCategory = false,
}) => {
  return (
    <div 
      data-course-item
      className="flex-shrink-0 w-[280px] transition-all duration-300 transform hover:scale-105 hover:z-10"
      onMouseEnter={() => handleCourseHover(course.id)}
      onMouseLeave={handleCourseLeave}
    >
      <CourseCarouselCard
        course={course}
        hoveredCourseId={hoveredCourseId}
        handleCardClick={handleCardClick}
        handleShareClick={(e, courseId) => {
          e.stopPropagation();
          // Handle share logic
        }}
        handleBookmarkToggle={(e, courseId, title, isBookmarked) => {
          e.stopPropagation();
          // Handle bookmark logic
        }}
        handleAssignClick={(e, courseId) => {
          e.stopPropagation();
          // Handle assign logic
        }}
        showTrainingCategory={showTrainingCategory}
      />
    </div>
  );
};

export default CourseCarouselItem;
