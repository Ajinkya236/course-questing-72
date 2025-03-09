
import { Course } from '@/types/course';

/**
 * Function to ensure we have exactly 12 courses for the carousel with memoization
 * @param coursesArray The original array of courses
 * @returns An array of exactly 12 courses
 */
export const normalizeCoursesCount = (coursesArray: Course[]) => {
  if (coursesArray.length === 0) return [];
  
  // If less than 12 courses, duplicate to reach 12
  if (coursesArray.length < 12) {
    const repeatedCourses = [];
    let i = 0;
    while (repeatedCourses.length < 12) {
      repeatedCourses.push({
        ...coursesArray[i % coursesArray.length],
        id: `${coursesArray[i % coursesArray.length].id}-clone-${Math.floor(i / coursesArray.length)}`
      });
      i++;
    }
    return repeatedCourses.slice(0, 12);
  }
  
  // If more than 12 courses, take the first 12
  if (coursesArray.length > 12) {
    return coursesArray.slice(0, 12);
  }
  
  return coursesArray;
};

/**
 * Get status color based on enrollment status
 * @param status The enrollment status
 * @returns A CSS class for the badge color
 */
export const getStatusColor = (status?: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500';
    case 'In Progress':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

/**
 * Normalize course data to ensure all required properties exist
 * @param courses The array of courses to normalize
 * @returns An array of normalized courses
 */
export const normalizeCourseData = (courses: Course[]) => {
  // Early return for empty array to avoid unnecessary processing
  if (!courses || courses.length === 0) return [];
  
  return normalizeCoursesCount(courses.map(course => ({
    ...course,
    level: course.level || course.skillLevel || 'All Levels',
    instructor: course.instructor || {
      name: 'Instructor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  })));
};
