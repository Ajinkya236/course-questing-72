
import { useCallback, useMemo } from 'react';
import { Course } from '@/types/course';
import { supabase } from '@/integrations/supabase/client';

/**
 * Custom hook for efficient course data handling
 */
export function useCourseData(courses: Course[]) {
  // Memoize the normalized courses to prevent unnecessary re-calculations
  const normalizedCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];
    
    return courses.map(course => {
      // Use existing image URL or generate a placeholder with Unsplash
      let imageUrl = course.imageUrl || course.thumbnail;
      if (!imageUrl || imageUrl === '/placeholder.svg') {
        const placeholderImages = [
          'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
        ];
        const randomIndex = Math.floor(Math.random() * placeholderImages.length);
        imageUrl = placeholderImages[randomIndex];
      }
      
      // Sample video URLs for previews if needed
      let videoUrl = course.videoUrl || course.previewUrl;
      if (!videoUrl) {
        const sampleVideoUrls = [
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        ];
        const randomIndex = Math.floor(Math.random() * sampleVideoUrls.length);
        videoUrl = sampleVideoUrls[randomIndex];
      }
      
      // Ensure each course has required properties
      return {
        ...course,
        id: course.id || `course-${Math.random().toString(36).substring(2, 9)}`,
        title: course.title || 'Untitled Course',
        description: course.description || 'No description available',
        imageUrl,
        videoUrl,
        previewUrl: videoUrl,
        level: course.level || course.skillLevel || 'All Levels',
        category: course.category || course.trainingCategory || 'General',
        duration: course.duration || '1h',
        rating: course.rating || 4.0,
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

  // Function to check bookmark status for a course
  const checkBookmarkStatus = useCallback(async (courseId: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;
      
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .single();
        
      return !!data;
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  }, []);

  return {
    normalizedCourses,
    getCourseById,
    checkBookmarkStatus
  };
}
