
import { useCallback, useMemo } from 'react';
import { Course } from '@/types/course';

/**
 * Custom hook for efficient course data handling
 */
export function useCourseData(courses: Course[]) {
  // Memoize the normalized courses to prevent unnecessary re-calculations
  const normalizedCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];
    
    return courses.map(course => ({
      ...course,
      level: course.level || course.skillLevel || 'All Levels',
      instructor: course.instructor || {
        name: 'Instructor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }));
  }, [courses]);

  // Memoized function to get a course by ID
  const getCourseById = useCallback((courseId: string) => {
    return normalizedCourses.find(course => course.id === courseId);
  }, [normalizedCourses]);

  return {
    normalizedCourses,
    getCourseById
  };
}
