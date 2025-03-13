
import { useCallback, useMemo } from 'react';
import { Course } from '@/types/course';

/**
 * Custom hook for efficient course data handling
 */
export function useCourseData(courses: Course[]) {
  // Memoize the normalized courses to prevent unnecessary re-calculations
  const normalizedCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];
    
    // Generate a random Unsplash image URL for courses without images
    const sampleImageIds = [
      'photo-1649972904349-6e44c42644a7',
      'photo-1488590528505-98d2b5aba04b',
      'photo-1518770660439-4636190af475',
      'photo-1461749280684-dccba630e2f6',
      'photo-1486312338219-ce68d2c6f44d'
    ];
    
    // Sample video URLs for previews
    const sampleVideoUrls = [
      'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ];
    
    return courses.map(course => {
      // Ensure each course has an image
      let imageUrl = course.imageUrl;
      if (!imageUrl || imageUrl === '/placeholder.svg') {
        const randomId = sampleImageIds[Math.floor(Math.random() * sampleImageIds.length)];
        imageUrl = `https://images.unsplash.com/${randomId}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`;
      }
      
      // Add video preview if missing
      let videoUrl = course.videoUrl || course.previewUrl;
      if (!videoUrl) {
        videoUrl = sampleVideoUrls[Math.floor(Math.random() * sampleVideoUrls.length)];
      }
      
      return {
        ...course,
        imageUrl,
        videoUrl,
        previewUrl: videoUrl,
        level: course.level || course.skillLevel || 'All Levels',
        instructor: course.instructor || {
          name: 'Instructor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      };
    });
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
