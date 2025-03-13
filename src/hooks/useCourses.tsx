
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';
import { Course } from '@/types/course';
import { mockCourses } from '@/utils/mockData';

export type CourseStatus = 'in-progress' | 'completed' | 'assigned' | 'saved';

export function useCourses() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  
  // Fetch all courses
  const fetchCourses = async (category?: string, limit?: number) => {
    setIsLoading(true);
    
    try {
      // Use mock data until Supabase table is accessible
      let filteredCourses = [...mockCourses];
      
      if (category) {
        filteredCourses = filteredCourses.filter(course => course.category === category);
      }
      
      if (limit) {
        filteredCourses = filteredCourses.slice(0, limit);
      }
      
      setCourses(filteredCourses);
      
      console.log('Fetched courses from mock data');
      
      // Try using Supabase (will work once the database is properly set up)
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .limit(limit || 10);
        
        if (!error && data && data.length > 0) {
          const formattedCourses: Course[] = data.map(course => ({
            id: course.id,
            title: course.title,
            description: course.description || '',
            imageUrl: course.image_url || '/placeholder.svg',
            category: course.category || '',
            duration: formatDuration(course.duration),
            rating: course.rating || 0,
            isHot: course.is_hot,
            isNew: course.is_new,
            previewUrl: course.preview_url,
            level: course.level || 'Beginner',
            progress: 0,
          }));
          
          setCourses(formattedCourses);
          console.log('Fetched courses from Supabase');
        }
      } catch (error) {
        console.log('Could not fetch from Supabase, using mock data');
      }
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      toast({
        title: 'Failed to load courses',
        description: error.message || 'An error occurred while loading courses',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user-specific courses (enrolled, saved, etc.)
  const fetchUserCourses = async (status?: CourseStatus, limit?: number) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Use mock data with random progress
      let userCourses = mockCourses.map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        status: status || 'in-progress' as CourseStatus,
        isBookmarked: Math.random() > 0.5
      }));
      
      if (status === 'in-progress') {
        setRecentCourses(userCourses);
      } else {
        setCourses(userCourses);
      }
      
      console.log('Fetched user courses from mock data');
      
      // Try using Supabase (will work once the database is properly set up)
      try {
        const { data, error } = await supabase
          .from('user_courses')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('user_id', user.id)
          .eq(status ? 'status' : 'id', status || 'id')
          .limit(limit || 10)
          .order('last_accessed', { ascending: false });
        
        if (!error && data && data.length > 0) {
          const formattedCourses: Course[] = data.map(item => {
            const course = item.course as any;
            return {
              id: course.id,
              title: course.title,
              description: course.description || '',
              imageUrl: course.image_url || '/placeholder.svg',
              category: course.category || '',
              duration: formatDuration(course.duration),
              rating: course.rating || 0,
              isHot: course.is_hot,
              isNew: course.is_new,
              previewUrl: course.preview_url,
              level: course.level || 'Beginner',
              progress: item.progress || 0,
              status: item.status,
              isBookmarked: item.is_bookmarked,
            };
          });
          
          if (status === 'in-progress') {
            setRecentCourses(formattedCourses);
          } else {
            setCourses(formattedCourses);
          }
          
          console.log('Fetched user courses from Supabase');
        }
      } catch (error) {
        console.log('Could not fetch from Supabase, using mock data');
      }
    } catch (error: any) {
      console.error('Error fetching user courses:', error);
      toast({
        title: 'Failed to load your courses',
        description: error.message || 'An error occurred while loading your courses',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Enroll in a course
  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to enroll in courses',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // Use the mock data for now
      const course = mockCourses.find(c => c.id === courseId);
      
      if (course) {
        setRecentCourses(prev => [
          { ...course, progress: 0, status: 'in-progress' as CourseStatus },
          ...prev.filter(c => c.id !== courseId)
        ]);
        
        toast({
          title: 'Enrolled!',
          description: 'You have successfully enrolled in this course',
        });
      }
      
      // Try using Supabase (will work once the database is properly set up)
      try {
        // Check if already enrolled
        const { data: existingEnrollment, error: checkError } = await supabase
          .from('user_courses')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .maybeSingle();
        
        if (!checkError) {
          if (existingEnrollment) {
            // Update last accessed timestamp
            await supabase
              .from('user_courses')
              .update({
                last_accessed: new Date().toISOString(),
                status: 'in-progress'
              })
              .eq('id', existingEnrollment.id);
          } else {
            // Create new enrollment
            await supabase
              .from('user_courses')
              .insert({
                user_id: user.id,
                course_id: courseId,
                status: 'in-progress',
                progress: 0
              });
          }
          
          console.log('Enrollment updated in Supabase');
        }
      } catch (error) {
        console.log('Could not update enrollment in Supabase, using mock data');
      }
      
      // Refresh course list
      await fetchUserCourses('in-progress');
      
    } catch (error: any) {
      console.error('Error enrolling in course:', error);
      toast({
        title: 'Enrollment failed',
        description: error.message || 'An error occurred while enrolling in the course',
        variant: 'destructive',
      });
    }
  };
  
  // Update course progress
  const updateCourseProgress = async (courseId: string, progress: number) => {
    if (!user) return;
    
    try {
      // Update in mock data
      setRecentCourses(prev => 
        prev.map(course => 
          course.id === courseId 
            ? { 
                ...course, 
                progress,
                status: progress >= 100 ? 'completed' as CourseStatus : 'in-progress' as CourseStatus
              }
            : course
        )
      );
      
      if (progress >= 100) {
        toast({
          title: 'Course completed!',
          description: 'Congratulations on completing this course!',
        });
      }
      
      // Try using Supabase (will work once the database is properly set up)
      try {
        const { data: userCourse, error: fetchError } = await supabase
          .from('user_courses')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .maybeSingle();
        
        if (!fetchError) {
          if (userCourse) {
            await supabase
              .from('user_courses')
              .update({
                progress,
                last_accessed: new Date().toISOString(),
                status: progress >= 100 ? 'completed' : 'in-progress',
                completed_at: progress >= 100 ? new Date().toISOString() : null
              })
              .eq('id', userCourse.id);
            
            console.log('Course progress updated in Supabase');
          } else {
            // Auto-enroll if not already enrolled
            await enrollInCourse(courseId);
          }
        }
      } catch (error) {
        console.log('Could not update course progress in Supabase, using mock data');
      }
    } catch (error: any) {
      console.error('Error updating course progress:', error);
    }
  };
  
  // Toggle bookmark status
  const toggleBookmark = async (courseId: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to bookmark courses',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // Toggle in mock data
      setCourses(prev => 
        prev.map(course => 
          course.id === courseId 
            ? { ...course, isBookmarked: !course.isBookmarked }
            : course
        )
      );
      
      setRecentCourses(prev => 
        prev.map(course => 
          course.id === courseId 
            ? { ...course, isBookmarked: !course.isBookmarked }
            : course
        )
      );
      
      const course = [...courses, ...recentCourses].find(c => c.id === courseId);
      const isBookmarked = course?.isBookmarked;
      
      toast({
        title: isBookmarked ? 'Bookmark removed' : 'Bookmarked!',
        description: isBookmarked 
          ? 'Course removed from your bookmarks' 
          : 'Course added to your bookmarks',
      });
      
      // Try using Supabase (will work once the database is properly set up)
      try {
        // Check if already enrolled/saved
        const { data: existingRecord, error: checkError } = await supabase
          .from('user_courses')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .maybeSingle();
        
        if (!checkError) {
          if (existingRecord) {
            // Toggle bookmark status
            await supabase
              .from('user_courses')
              .update({
                is_bookmarked: !existingRecord.is_bookmarked,
                status: existingRecord.is_bookmarked ? existingRecord.status : 'saved',
                last_accessed: new Date().toISOString()
              })
              .eq('id', existingRecord.id);
          } else {
            // Create new saved course
            await supabase
              .from('user_courses')
              .insert({
                user_id: user.id,
                course_id: courseId,
                status: 'saved',
                is_bookmarked: true
              });
          }
          
          console.log('Bookmark updated in Supabase');
        }
      } catch (error) {
        console.log('Could not update bookmark in Supabase, using mock data');
      }
    } catch (error: any) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: 'Action failed',
        description: error.message || 'An error occurred while updating your bookmarks',
        variant: 'destructive',
      });
    }
  };
  
  // Helper function to format duration
  const formatDuration = (minutes?: number): string => {
    if (!minutes) return '30 min';
    
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
  };

  return {
    courses,
    recentCourses,
    isLoading,
    fetchCourses,
    fetchUserCourses,
    enrollInCourse,
    updateCourseProgress,
    toggleBookmark
  };
}
