
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
      className="flex-shrink-0 w-[280px] transition-all duration-300 transform hover:scale-105 hover:z-10 relative"
      onMouseEnter={() => handleCourseHover(course.id)}
      onMouseLeave={handleCourseLeave}
    >
      <div className="relative overflow-visible">
        {/* We adjust the card to ensure buttons remain visible */}
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
      
      {/* Show a small portion of the next card */}
      {hoveredCourseId === course.id && (
        <div className="absolute right-[-20px] top-0 h-full w-5 z-0 overflow-hidden" aria-hidden="true">
          <div className="w-[280px] h-full bg-card border rounded-lg shadow-sm transform translate-x-[-260px]"></div>
        </div>
      )}
    </div>
  );
};

export default CourseCarouselItem;
