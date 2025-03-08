
import React from 'react';
import { Card } from "@/components/ui/card";
import CourseCardMedia from './course/CourseCardMedia';
import CourseCardContent from './course/CourseCardContent';
import CourseCardActions from './course/CourseCardActions';
import CourseActionDialog from './dialogs/CourseActionDialog';
import { useCourseCard } from '@/hooks/useCourseCard';

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
  previewUrl = "",
  isHot,
  isNew
}) => {
  const {
    isHovered,
    currentBookmarked,
    showShareDialog,
    showAssignDialog,
    handleMouseEnter,
    handleMouseLeave,
    handleCourseClick,
    handleWatchClick,
    handleBookmarkToggle,
    handleShareClick,
    handleAssignClick,
    setShowShareDialog,
    setShowAssignDialog
  } = useCourseCard({ id, title, isBookmarked });

  return (
    <>
      <Card 
        className="w-full overflow-hidden cursor-pointer transition-all hover:shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCourseClick}
      >
        {/* Course Media Section (Video/Image) */}
        <CourseCardMedia 
          imageUrl={imageUrl}
          previewUrl={previewUrl}
          isHovered={isHovered}
          trainingCategory={trainingCategory}
          category={category}
          isHot={isHot}
          isNew={isNew}
        />
        
        {/* Course Content Section */}
        <CourseCardContent 
          title={title}
          description={description}
          duration={duration}
          rating={rating}
        />
        
        {/* Action Buttons */}
        <CourseCardActions 
          isBookmarked={currentBookmarked}
          onWatchClick={handleWatchClick}
          onShareClick={handleShareClick}
          onBookmarkToggle={handleBookmarkToggle}
          onAssignClick={handleAssignClick}
        />
      </Card>

      {/* Dialogs */}
      <CourseActionDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        title={`Share "${title}"`}
        courseId={id}
        courseName={title}
        actionType="share"
      />

      <CourseActionDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        title={`Assign "${title}"`}
        courseId={id}
        courseName={title}
        actionType="assign"
      />
    </>
  );
};

export default CourseCard;
