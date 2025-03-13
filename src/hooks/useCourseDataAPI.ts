import { useState, useEffect } from 'react';
import { Course } from '@/types/course';
import { supabase } from '@/integrations/supabase/client';

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

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let path = 'course-data';
      let params: Record<string, string> = {};
      
      // If courseId is provided, we're fetching a single course
      if (courseId) {
        path = courseId;
      } else {
        // Otherwise, we're fetching multiple courses with filters
        if (domain) params.domain = domain;
        if (skill) params.skill = skill;
        if (search) params.search = search;
        if (limit) params.limit = limit.toString();
      }
      
      const { data, error: functionError } = await supabase.functions.invoke(path, {
        body: params
      });
      
      if (functionError) {
        throw new Error(functionError.message);
      }
      
      if (courseId && data.course) {
        setCourse(data.course);
      } else if (data.courses) {
        setCourses(data.courses);
      }
      
    } catch (err) {
      console.error('Error fetching course data:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [domain, skill, search, limit, courseId]);

  return {
    courses,
    course,
    isLoading,
    error,
    refetch: fetchData
  };
};
