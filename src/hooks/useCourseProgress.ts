
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseCourseProgressProps {
  courseId: string;
}

interface UseCourseProgressResult {
  updateProgress: (progress: number) => Promise<void>;
  markAsCompleted: () => Promise<void>;
  isUpdating: boolean;
  error: Error | null;
}

export const useCourseProgress = ({ courseId }: UseCourseProgressProps): UseCourseProgressResult => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProgress = async (progress: number) => {
    if (!courseId) return;
    
    setIsUpdating(true);
    setError(null);
    
    try {
      // Get the current auth session
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session) {
        throw new Error('You must be logged in to update course progress');
      }
      
      // Call the edge function to update progress
      const { data, error: functionError } = await supabase.functions.invoke('course-progress-update', {
        body: {
          courseId,
          progress,
          completedAt: progress === 100 ? new Date().toISOString() : null
        },
        headers: {
          Authorization: `Bearer ${session.session.access_token}`
        }
      });
      
      if (functionError) {
        throw new Error(functionError.message);
      }
      
      console.log('Progress updated:', data);
      
    } catch (err) {
      console.error('Error updating course progress:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsUpdating(false);
    }
  };

  const markAsCompleted = async () => {
    await updateProgress(100);
  };

  return {
    updateProgress,
    markAsCompleted,
    isUpdating,
    error
  };
};
