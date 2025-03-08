
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UseCourseCardProps {
  id: string;
  title: string;
  isBookmarked?: boolean;
}

export const useCourseCard = ({ id, title, isBookmarked = false }: UseCourseCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [currentBookmarked, setCurrentBookmarked] = useState(isBookmarked);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle course click to navigate to course player
  const handleCourseClick = (e: React.MouseEvent) => {
    // Don't navigate if the click was on a button or if a dialog is open
    if ((e.target as HTMLElement).closest('button') || showShareDialog || showAssignDialog) {
      return;
    }
    navigate(`/course/${id}`);
  };

  // Handle watch button click
  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/course/${id}`);
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarked = !currentBookmarked;
    setCurrentBookmarked(newBookmarked);
    
    toast({
      title: newBookmarked ? "Course Saved" : "Course Removed",
      description: newBookmarked 
        ? `"${title}" has been added to your saved courses` 
        : `"${title}" has been removed from your saved courses`,
    });
  };

  // Handle share button click
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareDialog(true);
  };

  // Handle assign button click
  const handleAssignClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAssignDialog(true);
  };

  return {
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
  };
};
