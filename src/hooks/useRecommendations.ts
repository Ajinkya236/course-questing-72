
import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Course } from '@/types/course';

/**
 * Hook for course recommendations functionality
 */
export function useRecommendations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Course recommendations
  const getRecommendations = useCallback(async (
    type: 'continue_learning' | 'top_courses' | 'for_your_role' | 'followed_skills' | 'similar_learners',
    limit: number = 10,
    skillIds?: string[]
  ): Promise<Course[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('get-course-recommendations', {
        body: { type, limit, skillIds }
      });
      
      if (error) throw new Error(error.message);
      return data || [];
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch recommendations",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getRecommendations
  };
}
