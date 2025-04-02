
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type GenerateResponseParams = {
  prompt: string;
  context?: string;
  model?: string;
  structuredFormat?: boolean;
};

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [apiCallFailed, setApiCallFailed] = useState(false);

  const generateResponse = async ({ 
    prompt, 
    context = '', 
    model = 'gemini-1.5-pro', // Default to 2.5 Pro regardless of input
    structuredFormat = true
  }: GenerateResponseParams) => {
    // If API call previously failed, don't attempt again
    if (apiCallFailed) {
      return { generatedText: "Previous request failed. Please try again later or refresh the page." };
    }
    
    // If already loading, don't make another request
    if (loading) {
      toast({
        title: "Request in progress",
        description: "Please wait for the current request to complete.",
        variant: "default",
      });
      return { generatedText: "A request is already in progress. Please wait." };
    }

    setLoading(true);
    setError(null);

    try {
      // Always use gemini-1.5-pro regardless of passed model parameter
      const actualModel = 'gemini-1.5-pro';
      
      // Call the Supabase Edge Function to generate a response
      const { data, error } = await supabase.functions.invoke('gemini-generate-response', {
        body: {
          prompt,
          context,
          model: actualModel,
          structuredFormat,
        },
      });

      if (error) {
        setApiCallFailed(true);
        throw new Error(error.message);
      }

      return data || { generatedText: "Sorry, I couldn't generate a response at this time." };
    } catch (err: any) {
      setError(err);
      setApiCallFailed(true);
      toast({
        title: "Error generating response",
        description: err.message || "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      return { generatedText: "Sorry, there was an error generating a response." };
    } finally {
      setLoading(false);
    }
  };

  // Reset API failure state
  const resetFailureState = () => {
    setApiCallFailed(false);
  };

  return {
    loading,
    error,
    apiCallFailed,
    generateResponse,
    resetFailureState
  };
}
