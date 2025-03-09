
import { useCallback } from 'react';
import { Course } from '@/types/course';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './use-toast';

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
      const courseToSave = {
        ...course,
        isBookmarked: true,
        savedAt: new Date().toISOString(),
        status: 'saved' as const
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
