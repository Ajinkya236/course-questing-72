
import React, { useState, useEffect, memo, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useVideoPreview } from '@/hooks/useVideoPreview';
import { useCourseEventListener } from '@/hooks/useCourseEvents';
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
  const { toast } = useToast();
  const [currentBookmarked, setCurrentBookmarked] = useState(isBookmarked);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  const {
    isHovered,
    isMuted,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMute
  } = useVideoPreview({ previewUrl });

  // Use the new event listener system
  useCourseEventListener(
    id,
    () => setShowShareDialog(true),
    () => setShowAssignDialog(true),
    () => setCurrentBookmarked(prev => !prev)
  );

  // Effect to check saved courses in localStorage during component initialization
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    const isSaved = savedCourses.some((course: any) => course.id === id);
    if (isSaved !== currentBookmarked) {
      setCurrentBookmarked(isSaved);
    }
  }, [id, currentBookmarked]);

  // Update local storage when bookmark status changes
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    
    if (currentBookmarked && !savedCourses.some((course: any) => course.id === id)) {
      // Add course to saved courses
      const courseToSave = {
        id,
        title,
        description,
        imageUrl,
        category, 
        duration,
        rating,
        trainingCategory,
        isBookmarked: true,
        previewUrl,
        isHot,
        isNew,
        savedAt: new Date().toISOString(),
        status: 'saved'
      };
      
      localStorage.setItem('savedCourses', JSON.stringify([...savedCourses, courseToSave]));
    } else if (!currentBookmarked) {
      // Remove course from saved courses
      const updatedSavedCourses = savedCourses.filter((course: any) => course.id !== id);
      localStorage.setItem('savedCourses', JSON.stringify(updatedSavedCourses));
    }
  }, [currentBookmarked, id, title, description, imageUrl, category, duration, rating, trainingCategory, previewUrl, isHot, isNew]);

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
    const newBookmarked = !currentBookmarked;
    setCurrentBookmarked(newBookmarked);
    
    toast({
      title: newBookmarked ? "Course Saved" : "Course Removed",
      description: newBookmarked 
        ? `"${title}" has been added to your saved courses` 
        : `"${title}" has been removed from your saved courses`,
    });
  }, [currentBookmarked, title, toast]);

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareDialog(true);
  }, []);

  const handleAssignClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAssignDialog(true);
  }, []);

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
