
import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useVideoPreview } from '@/hooks/useVideoPreview';
import { useCourseEventListener } from '@/hooks/useCourseEvents';
import { useCourseBookmarks } from '@/hooks/useCourseBookmarks';
import { triggerCourseEvent } from '@/hooks/useCourseEvents';
import CourseCardMedia from './course-card/CourseCardMedia';
import CourseCardContent from './course-card/CourseCardContent';
import CourseCardDialogs from './course-card/CourseCardDialogs';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  trainingCategory?: string;
  isBookmarked?: boolean;
  previewUrl?: string;
  isHot?: boolean;
  isNew?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  duration,
  rating,
  trainingCategory,
  isBookmarked = false,
  previewUrl,
  isHot,
  isNew
}) => {
  const navigate = useNavigate();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  const { isBookmarked: checkIsBookmarked, toggleBookmark } = useCourseBookmarks();
  const [currentBookmarked, setCurrentBookmarked] = useState(isBookmarked || checkIsBookmarked(id));
  
  const {
    isHovered,
    isMuted,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMute
  } = useVideoPreview({ previewUrl });

  // Use the event listener system - with callbacks that match the expected signatures (no parameters)
  useCourseEventListener(
    id,
    () => setShowShareDialog(true),
    () => setShowAssignDialog(true),
    () => setCurrentBookmarked(prev => !prev)
  );

  // Memoized handlers
  const handleCourseClick = useCallback((e: React.MouseEvent) => {
    // Don't navigate if the click was on a button or if a dialog is open
    if ((e.target as HTMLElement).closest('button') || showShareDialog || showAssignDialog) {
      e.stopPropagation();
      return;
    }
    navigate(`/course/${id}`);
  }, [id, navigate, showShareDialog, showAssignDialog]);

  const handleWatchClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/course/${id}`);
  }, [id, navigate]);

  const handleBookmarkToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarked = toggleBookmark({
      id,
      title,
      description,
      imageUrl,
      category, 
      duration,
      rating,
      trainingCategory,
      isBookmarked: currentBookmarked,
      previewUrl,
      isHot,
      isNew
    });
    setCurrentBookmarked(newBookmarked);
  }, [
    id, title, description, imageUrl, category, duration, rating, 
    trainingCategory, currentBookmarked, previewUrl, isHot, isNew, toggleBookmark
  ]);

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCourseEvent('share', id, title);
    setShowShareDialog(true);
  }, [id, title]);

  const handleAssignClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCourseEvent('assign', id, title);
    setShowAssignDialog(true);
  }, [id, title]);

  // Add a proper fallback for image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
    // Prevent infinite loop if placeholder also fails
    target.onerror = null;
  };

  return (
    <>
      <Card 
        className="w-full h-full overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCourseClick}
      >
        <CourseCardMedia
          title={title}
          imageUrl={imageUrl}
          category={category}
          trainingCategory={trainingCategory}
          isHot={isHot}
          isNew={isNew}
          previewUrl={previewUrl}
          isHovered={isHovered}
          isMuted={isMuted}
          videoRef={videoRef}
          toggleMute={toggleMute}
          onImageError={handleImageError}
        />

        <CourseCardContent
          title={title}
          description={description}
          duration={duration}
          rating={rating}
          isBookmarked={currentBookmarked}
          handleWatchClick={handleWatchClick}
          handleShareClick={handleShareClick}
          handleBookmarkToggle={handleBookmarkToggle}
          handleAssignClick={handleAssignClick}
        />
      </Card>

      <CourseCardDialogs
        id={id}
        title={title}
        showShareDialog={showShareDialog}
        showAssignDialog={showAssignDialog}
        setShowShareDialog={setShowShareDialog}
        setShowAssignDialog={setShowAssignDialog}
      />
    </>
  );
};

// Memoize the component to prevent unnecessary renders
export default memo(CourseCard);
