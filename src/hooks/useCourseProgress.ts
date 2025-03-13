
import { useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface UseCourseProgressProps {
  courseId: string;
}

interface UseCourseProgressResult {
  updateProgress: (progress: number, position?: number) => Promise<void>;
  markAsCompleted: () => Promise<void>;
  progress: number;
  isCompleted: boolean;
  lastPosition: number;
  isUpdating: boolean;
  error: Error | null;
}

export const useCourseProgress = ({ courseId }: UseCourseProgressProps): UseCourseProgressResult => {
  const { user } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastPosition, setLastPosition] = useState<number>(0);

  // Fetch initial progress when component mounts
  useEffect(() => {
    const fetchProgress = async () => {
      if (!courseId || !user) return;
      
      try {
        const { data, error } = await supabase.functions.invoke('course-progress', {
          body: { action: 'get-progress', courseId }
        });
        
        if (error) throw new Error(error.message);
        
        if (data?.progress) {
          setProgress(data.progress.progress || 0);
          setIsCompleted(!!data.progress.completed_at);
          setLastPosition(data.progress.last_position_seconds || 0);
        }
      } catch (err) {
        console.error('Error fetching course progress:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      }
    };
    
    fetchProgress();
  }, [courseId, user]);

  const updateProgress = async (newProgress: number, position?: number) => {
    if (!courseId || !user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to track progress",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('course-progress', {
        body: {
          action: 'update-progress',
          courseId,
          progress: newProgress,
          position
        }
      });
      
      if (error) throw new Error(error.message);
      
      setProgress(newProgress);
      if (position !== undefined) setLastPosition(position);
      if (newProgress === 100) setIsCompleted(true);
      
      console.log('Progress updated:', data);
      
    } catch (err) {
      console.error('Error updating course progress:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      toast({
        title: "Error updating progress",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
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
    progress,
    isCompleted,
    lastPosition,
    isUpdating,
    error
  };
};
