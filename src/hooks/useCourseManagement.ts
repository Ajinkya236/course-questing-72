
import { useCallback } from 'react';
import { useSupabaseCore } from './useSupabaseCore';

/**
 * Hook for course progress and bookmarks functionality
 */
export function useCourseManagement() {
  const { loading, error, fetchData } = useSupabaseCore();

  // Course progress and bookmarks
  const bookmarkCourse = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'bookmark', { courseId });
  }, [fetchData]);

  const unbookmarkCourse = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'unbookmark', { courseId });
  }, [fetchData]);

  const getBookmarks = useCallback(async () => {
    return fetchData('course-progress', 'get-bookmarks');
  }, [fetchData]);

  const updateCourseProgress = useCallback(async (
    courseId: string, 
    progress: number, 
    position?: string,
    status?: 'not_started' | 'in_progress' | 'completed' | 'saved'
  ) => {
    return fetchData('course-progress', 'update-progress', { 
      courseId, 
      progress, 
      position, 
      status 
    });
  }, [fetchData]);

  const getCourseProgress = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'get-progress', { courseId });
  }, [fetchData]);

  const getAllProgress = useCallback(async () => {
    return fetchData('course-progress', 'get-all-progress');
  }, [fetchData]);

  const saveCourseNote = useCallback(async (courseId: string, content: string) => {
    return fetchData('course-progress', 'save-note', { courseId, content });
  }, [fetchData]);

  const getCourseNote = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'get-note', { courseId });
  }, [fetchData]);

  return {
    loading,
    error,
    bookmarkCourse,
    unbookmarkCourse,
    getBookmarks,
    updateCourseProgress,
    getCourseProgress,
    getAllProgress,
    saveCourseNote,
    getCourseNote
  };
}
