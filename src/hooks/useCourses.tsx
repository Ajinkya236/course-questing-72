
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';
import { Course } from '@/types/course';

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
      let query = supabase
        .from('courses')
        .select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
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
          progress: 0, // Will be updated if user is enrolled
        }));
        
        setCourses(formattedCourses);
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
      let query = supabase
        .from('user_courses')
        .select(`
          *,
          course:courses(*)
        `);
      
      if (status) {
        query = query.eq('status', status);
      }
      
      query = query.eq('user_id', user.id);
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query.order('last_accessed', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
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
      // Check if already enrolled
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingEnrollment) {
        // Update last accessed timestamp
        const { error: updateError } = await supabase
          .from('user_courses')
          .update({
            last_accessed: new Date().toISOString(),
            status: 'in-progress'
          })
          .eq('id', existingEnrollment.id);
        
        if (updateError) throw updateError;
        
        toast({
          title: 'Course resumed',
          description: 'You have resumed this course',
        });
      } else {
        // Create new enrollment
        const { error: insertError } = await supabase
          .from('user_courses')
          .insert({
            user_id: user.id,
            course_id: courseId,
            status: 'in-progress',
            progress: 0
          });
        
        if (insertError) throw insertError;
        
        toast({
          title: 'Enrolled!',
          description: 'You have successfully enrolled in this course',
        });
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
      const { data: userCourse, error: fetchError } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();
      
      if (fetchError) throw fetchError;
      
      if (!userCourse) {
        // Auto-enroll if not already enrolled
        return enrollInCourse(courseId);
      }
      
      const { error: updateError } = await supabase
        .from('user_courses')
        .update({
          progress,
          last_accessed: new Date().toISOString(),
          status: progress >= 100 ? 'completed' : 'in-progress',
          completed_at: progress >= 100 ? new Date().toISOString() : null
        })
        .eq('id', userCourse.id);
      
      if (updateError) throw updateError;
      
      if (progress >= 100) {
        toast({
          title: 'Course completed!',
          description: 'Congratulations on completing this course!',
        });
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
      // Check if already enrolled/saved
      const { data: existingRecord, error: checkError } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingRecord) {
        // Toggle bookmark status
        const { error: updateError } = await supabase
          .from('user_courses')
          .update({
            is_bookmarked: !existingRecord.is_bookmarked,
            status: existingRecord.is_bookmarked ? existingRecord.status : 'saved',
            last_accessed: new Date().toISOString()
          })
          .eq('id', existingRecord.id);
        
        if (updateError) throw updateError;
        
        toast({
          title: existingRecord.is_bookmarked ? 'Bookmark removed' : 'Bookmarked!',
          description: existingRecord.is_bookmarked 
            ? 'Course removed from your bookmarks' 
            : 'Course added to your bookmarks',
        });
      } else {
        // Create new saved course
        const { error: insertError } = await supabase
          .from('user_courses')
          .insert({
            user_id: user.id,
            course_id: courseId,
            status: 'saved',
            is_bookmarked: true
          });
        
        if (insertError) throw insertError;
        
        toast({
          title: 'Bookmarked!',
          description: 'Course added to your bookmarks',
        });
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
