
import { useState, useEffect, useMemo } from 'react';
import { Course } from '@/types/course';
import { useCourseDataAPI } from '@/hooks/useCourseDataAPI';

interface UseCourseDataProps {
  domain?: string;
  skill?: string;
  search?: string;
  limit?: number;
  includeLocal?: boolean;
}

export const useCourseData = (
  localCourses: Course[] = [],
  options: UseCourseDataProps = {}
) => {
  const { domain, skill, search, limit = 20, includeLocal = true } = options;
  const [combinedCourses, setCombinedCourses] = useState<Course[]>([]);
  
  // Fetch from API (or mock data)
  const { courses: apiCourses, isLoading, error, refetch } = useCourseDataAPI({
    domain,
    skill,
    search,
    limit
  });
  
  // Process courses to ensure they have all required fields and fallback images
  const normalizedCourses = useMemo(() => {
    return combinedCourses.map((course, index) => {
      // Ensure each course has required properties
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
      
      return {
        ...course,
        id: course.id || `local-course-${index}`,
        title: course.title || 'Untitled Course',
        description: course.description || 'No description available',
        imageUrl,
        category: course.category || course.trainingCategory || 'General',
        duration: course.duration || '1h',
        rating: course.rating || 4.0,
        // Clone courses for carousel display to ensure unique IDs
        cloneId: `${course.id}-clone-${index}`
      };
    });
  }, [combinedCourses]);
  
  // Combine API and local courses
  useEffect(() => {
    let allCourses: Course[] = [];
    
    // Add courses from the API
    if (apiCourses && apiCourses.length > 0) {
      allCourses = [...apiCourses];
    }
    
    // Include local courses if specified
    if (includeLocal && localCourses && localCourses.length > 0) {
      allCourses = [...allCourses, ...localCourses];
    }
    
    setCombinedCourses(allCourses);
  }, [apiCourses, localCourses, includeLocal]);
  
  return {
    courses: combinedCourses,
    normalizedCourses,
    isLoading,
    error,
    refetch
  };
};

export default useCourseData;
