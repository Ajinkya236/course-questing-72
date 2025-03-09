
import { useCallback } from 'react';
import { Course } from '@/types/course';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './use-toast';

/**
 * Custom hook for managing course bookmarks with improved error handling
 */
export function useCourseBookmarks() {
  const [savedCourses, setSavedCourses] = useLocalStorage<Course[]>('savedCourses', []);
  const { toast } = useToast();

  /**
   * Check if a course is bookmarked
   */
  const isBookmarked = useCallback((courseId: string) => {
    if (!courseId) return false;
    return savedCourses.some(course => course.id === courseId);
  }, [savedCourses]);

  /**
   * Toggle bookmark status for a course with improved error handling
   */
  const toggleBookmark = useCallback((course: Course) => {
    try {
      if (!course || !course.id) {
        console.error("Invalid course object provided to toggleBookmark");
        return false;
      }
      
      const courseId = course.id;
      const currentlyBookmarked = isBookmarked(courseId);
      let updatedCourses: Course[];

      console.log(`Toggling bookmark for course: ${courseId} - Current state: ${currentlyBookmarked}`);

      if (!currentlyBookmarked) {
        // Add to bookmarks
        const courseToSave: Course = {
          ...course,
          isBookmarked: true,
          savedAt: new Date().toISOString(),
          status: 'saved'
        };
        updatedCourses = [...savedCourses, courseToSave];
      } else {
        // Remove from bookmarks
        updatedCourses = savedCourses.filter(c => c.id !== courseId);
      }

      setSavedCourses(updatedCourses);
      
      // Show toast notification
      toast({
        title: currentlyBookmarked ? "Course Removed" : "Course Saved",
        description: currentlyBookmarked 
          ? `"${course.title}" has been removed from your saved courses` 
          : `"${course.title}" has been added to your saved courses`,
      });

      return !currentlyBookmarked;
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive"
      });
      
      return false;
    }
  }, [isBookmarked, savedCourses, setSavedCourses, toast]);

  /**
   * Get all bookmarked courses
   */
  const getAllBookmarks = useCallback(() => {
    return savedCourses;
  }, [savedCourses]);

  return {
    isBookmarked,
    toggleBookmark,
    getAllBookmarks,
    savedCourses
  };
}
