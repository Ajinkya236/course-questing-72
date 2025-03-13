
import { useState, useEffect, useCallback } from 'react';
import { Course } from '@/types/course';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UseCourseDataAPIProps {
  domain?: string;
  skill?: string;
  search?: string;
  limit?: number;
  courseId?: string;
}

interface UseCourseDataAPIResult {
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  course: Course | null;
}

export const useCourseDataAPI = ({
  domain,
  skill,
  search,
  limit = 20,
  courseId
}: UseCourseDataAPIProps = {}): UseCourseDataAPIResult => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (courseId) {
        // Fetch a single course
        const { data, error: fetchError } = await supabase.functions.invoke(`course-data/${courseId}`);
        
        if (fetchError) {
          throw new Error(fetchError.message);
        }
        
        if (data?.course) {
          setCourse(data.course);
        }
      } else {
        // Fetch multiple courses with filters
        const params: Record<string, any> = {};
        if (domain) params.domain = domain;
        if (skill) params.skill = skill;
        if (search) params.search = search;
        if (limit) params.limit = limit.toString();
        
        const { data, error: fetchError } = await supabase.functions.invoke('course-data', {
          body: params
        });
        
        if (fetchError) {
          throw new Error(fetchError.message);
        }
        
        if (data?.courses) {
          setCourses(data.courses);
        }
      }
    } catch (err) {
      console.error('Error fetching course data:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      toast({
        title: "Error fetching courses",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [domain, skill, search, limit, courseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    courses,
    course,
    isLoading,
    error,
    refetch: fetchData
  };
};
