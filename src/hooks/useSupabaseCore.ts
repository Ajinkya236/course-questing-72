
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/**
 * Core Supabase hook with shared functionality for making API calls
 */
export function useSupabaseCore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Generic fetch function to avoid repetitive code
  const fetchData = useCallback(async <T>(
    functionName: string,
    action: string,
    params: Record<string, any> = {}
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { action, ...params }
      });
      
      if (error) throw new Error(error.message);
      return data as T;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchData
  };
}
