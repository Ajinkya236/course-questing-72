
import { useState, useEffect, useMemo } from 'react';
import { Course } from '@/types/course';
import { useCourseDataAPI } from '@/hooks/useCourseDataAPI';
import { mockCourses } from '@/data/mockCoursesData';

interface UseCourseDataProps {
  domain?: string;
  skill?: string;
  search?: string;
  limit?: number;
  includeLocal?: boolean;
}

// Helper function to normalize skills
const normalizeSkills = (skills: any[]): { name: string; proficiency: string }[] => {
  if (!skills || !Array.isArray(skills)) return [];
  
  return skills.map(skill => {
    if (typeof skill === 'string') {
      return { name: skill, proficiency: 'Intermediate' };
    }
    return skill;
  });
};

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
    // High-quality Unsplash image URLs for courses without images
    const sampleImageUrls = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80'
    ];
    
    // Sample video URLs for previews
    const sampleVideoUrls = [
      'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ];
    
    return combinedCourses.map((course, index) => {
      // Ensure each course has a valid image URL
      const imageUrl = course.imageUrl || course.thumbnail || sampleImageUrls[index % sampleImageUrls.length];
      
      // Add video preview URL if missing
      const videoUrl = course.videoUrl || course.previewUrl || sampleVideoUrls[index % sampleVideoUrls.length];
      
      // Normalize skills to ensure they're in the correct format
      const normalizedSkills = normalizeSkills(course.skills || []);
      
      return {
        ...course,
        id: course.id || `local-course-${index}`,
        title: course.title || 'Untitled Course',
        description: course.description || 'No description available',
        imageUrl: imageUrl,
        category: course.category || 'General',
        duration: course.duration || '1h',
        rating: course.rating || 4.0,
        videoUrl: videoUrl,
        previewUrl: videoUrl,
        skills: normalizedSkills,
        // Clone courses for carousel display to ensure unique IDs
        cloneId: `${course.id}-clone-${index}`
      };
    });
  }, [combinedCourses]);
  
  // Combine API and local courses
  useEffect(() => {
    let allCourses: Course[] = [];
    
    // Add courses from the API (or mockCourses if we're in development/no data)
    if (apiCourses && apiCourses.length > 0) {
      allCourses = [...apiCourses];
    } else if (!isLoading) {
      // No API data available, use mock data
      allCourses = [...mockCourses];
    }
    
    // Include local courses if specified
    if (includeLocal && localCourses && localCourses.length > 0) {
      allCourses = [...allCourses, ...localCourses];
    }
    
    // Ensure we have at least some courses for display
    if (allCourses.length === 0 && !isLoading) {
      allCourses = [...mockCourses.slice(0, limit)];
    }
    
    setCombinedCourses(allCourses);
  }, [apiCourses, localCourses, isLoading, includeLocal, limit]);
  
  return {
    courses: normalizedCourses,
    normalizedCourses,
    isLoading,
    error,
    refetch
  };
};

export default useCourseData;
