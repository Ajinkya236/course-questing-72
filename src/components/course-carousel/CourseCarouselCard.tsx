
import React, { memo, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Course } from '@/types/course';
import CourseCarouselMedia from './CourseCarouselMedia';
import CourseProgressBar from './CourseProgressBar';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Define an optimized click handler to prevent event propagation
  const onCardClick = (e: React.MouseEvent) => {
    // Don't navigate if the click was on a button
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      return;
    }
    handleCardClick(course.id);
  };

  // Handle video mute toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle mouse enter/leave for hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && course.videoUrl) {
      videoRef.current.src = course.videoUrl;
      videoRef.current.play()
        .then(() => setIsVideoPlaying(true))
        .catch(err => console.log("Video play prevented:", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCardClick(course.id);
  };

  return (
    <Card
      className="overflow-hidden h-full max-h-[300px] cursor-pointer hover:border-primary/50 transition-all duration-300 group mb-3 hover:shadow-md hover:scale-105 carousel-card"
      onClick={onCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CourseCarouselMedia
        course={course}
        isHovered={isHovered}
        isMuted={isMuted}
        isVideoPlaying={isVideoPlaying}
        videoRef={videoRef}
        toggleMute={toggleMute}
        showTrainingCategory={showTrainingCategory}
        isBookmarked={!!course.isBookmarked}
        handleWatchClick={handleWatchClick}
        handleShareClick={(e) => handleShareClick(e, course.id)}
        handleBookmarkToggle={(e) => handleBookmarkToggle(e, course.id, course.title, !!course.isBookmarked)}
        handleAssignClick={(e) => handleAssignClick(e, course.id)}
      />
      
      <CardContent className="p-2">
        <CardTitle className="text-sm line-clamp-1 font-archivo-black">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs min-h-[2rem]">{course.description}</CardDescription>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.level || 'All Levels'}</span>
        </div>
        
        <CourseProgressBar progress={course.progress} />
      </CardContent>
    </Card>
  );
};

// Memoize the component to prevent unnecessary renders
export default memo(CourseCarouselCard);
