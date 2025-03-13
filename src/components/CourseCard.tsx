
import React, { useState, useCallback, memo } from 'react';
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
  videoUrl?: string;
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
  videoUrl,
  isHot,
  isNew
}) => {
  const navigate = useNavigate();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  const { isBookmarked: checkIsBookmarked, toggleBookmark } = useCourseBookmarks();
  const [currentBookmarked, setCurrentBookmarked] = useState(isBookmarked || checkIsBookmarked(id));
  
  const videoPreviewUrl = previewUrl || videoUrl;
  
  const {
    isHovered,
    isMuted,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMute
  } = useVideoPreview({ previewUrl: videoPreviewUrl });

  // Parameter-less callbacks for the event listener
  const handleShareEvent = useCallback(() => {
    setShowShareDialog(true);
  }, []);
  
  const handleAssignEvent = useCallback(() => {
    setShowAssignDialog(true);
  }, []);
  
  const handleBookmarkEvent = useCallback(() => {
    setCurrentBookmarked(prev => !prev);
  }, []);

  // Use the event listener with the parameter-less callbacks
  useCourseEventListener(
    id,
    () => navigate(`/course/${id}`), // Watch event handler
    handleShareEvent,
    handleAssignEvent,
    handleBookmarkEvent
  );

  // Event handlers with React.MouseEvent parameters for direct DOM interaction
  const handleCourseClick = useCallback((e: React.MouseEvent) => {
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
      previewUrl: videoPreviewUrl,
      isHot,
      isNew
    });
    setCurrentBookmarked(newBookmarked);
    
    // Trigger the course event
    triggerCourseEvent('bookmark', id, title);
  }, [
    id, title, description, imageUrl, category, duration, rating, 
    trainingCategory, currentBookmarked, videoPreviewUrl, isHot, isNew, toggleBookmark
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
    target.onerror = null;
  };

  return (
    <>
      <Card 
        className="w-full overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 h-[350px] group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCourseClick}
      >
        <CourseCardMedia
          title={title}
          imageUrl={imageUrl || "/placeholder.svg"} // Provide fallback
          category={category}
          trainingCategory={trainingCategory}
          isHot={isHot}
          isNew={isNew}
          previewUrl={videoPreviewUrl}
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

export default memo(CourseCard);
