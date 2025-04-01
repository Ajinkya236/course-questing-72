
import { useCallback } from 'react';
import { Course } from '@/types/course';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook for managing course bookmarks
 */
export function useCourseBookmarks() {
  const [savedCourses, setSavedCourses] = useLocalStorage<Course[]>('savedCourses', []);
  const { toast } = useToast();

  /**
   * Check if a course is bookmarked
   */
  const isBookmarked = useCallback((courseId: string) => {
    return savedCourses.some(course => course.id === courseId);
  }, [savedCourses]);

  /**
   * Toggle bookmark status for a course
   */
  const toggleBookmark = useCallback((course: Course) => {
    const courseId = course.id;
    const currentlyBookmarked = isBookmarked(courseId);
    let updatedCourses: Course[];

    if (!currentlyBookmarked) {
      // Add to bookmarks
      const courseToSave: Course = {
        ...course,
        isBookmarked: true,
        savedAt: new Date().toISOString(),
        status: 'saved'
      };
      updatedCourses = [...savedCourses, courseToSave];
      
      // Show success toast
      toast({
        title: "Course Saved",
        description: `"${course.title}" has been added to your saved courses`,
      });
    } else {
      // Remove from bookmarks
      updatedCourses = savedCourses.filter(c => c.id !== courseId);
      
      // Show removal toast
      toast({
        title: "Course Removed",
        description: `"${course.title}" has been removed from your saved courses`,
      });
    }

    setSavedCourses(updatedCourses);
    
    return !currentlyBookmarked;
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
