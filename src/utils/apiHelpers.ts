
import { supabase } from '@/integrations/supabase/client';

// Helper function to call Supabase Edge Functions
export async function callEdgeFunction<T>(
  functionName: string,
  payload?: any
): Promise<T> {
  try {
    const { data, error } = await supabase.functions.invoke<T>(functionName, {
      body: payload
    });

    if (error) {
      throw new Error(error.message || 'Error calling function');
    }

    return data as T;
  } catch (error: any) {
    console.error(`Error calling ${functionName}:`, error);
    throw error;
  }
}
