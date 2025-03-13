
import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Course } from '@/types/course';
import CourseCarouselMedia from './CourseCarouselMedia';
import CourseProgressBar from './CourseProgressBar';
import CourseActions from './CourseActions';

interface CourseCarouselCardProps {
  course: Course;
  hoveredCourseId: string | null;
  handleCardClick: (courseId: string) => void;
  handleShareClick: (e: React.MouseEvent, courseId: string) => void;
  handleBookmarkToggle: (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => void;
  handleAssignClick: (e: React.MouseEvent, courseId: string) => void;
  showTrainingCategory?: boolean;
}

const CourseCarouselCard: React.FC<CourseCarouselCardProps> = ({
  course,
  hoveredCourseId,
  handleCardClick,
  handleShareClick,
  handleBookmarkToggle,
  handleAssignClick,
  showTrainingCategory = false
}) => {
  const isHovered = hoveredCourseId === course.id;
  
  // Define an optimized click handler to prevent event propagation
  const onCardClick = (e: React.MouseEvent) => {
    // Don't navigate if the click was on a button
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      return;
    }
    handleCardClick(course.id);
  };

  return (
    <Card
      className="overflow-hidden h-full max-h-[300px] cursor-pointer hover:border-primary/50 transition-all duration-300 group mb-3 hover:shadow-md hover:scale-105 carousel-card"
      onClick={onCardClick}
    >
      <CourseCarouselMedia
        course={course}
        isHovered={isHovered}
        isMuted={true}
        isVideoPlaying={isHovered}
        videoRef={null}
        toggleMute={(e) => e.stopPropagation()}
        showTrainingCategory={showTrainingCategory}
      />
      
      <CardHeader className="p-2">
        <CardTitle className="text-sm line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs min-h-[2rem]">{course.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-2 pt-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.level || 'All Levels'}</span>
        </div>
        
        <CourseProgressBar progress={course.progress || 0} />
        
        <CourseActions
          isBookmarked={!!course.isBookmarked}
          handleShareClick={(e) => handleShareClick(e, course.id)}
          handleBookmarkToggle={(e) => handleBookmarkToggle(e, course.id, course.title, !!course.isBookmarked)}
          handleAssignClick={(e) => handleAssignClick(e, course.id)}
        />
      </CardContent>
    </Card>
  );
};

// Memoize the component to prevent unnecessary renders
export default memo(CourseCarouselCard);
