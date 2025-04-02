
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type GenerateResponseParams = {
  prompt: string;
  context?: string;
  model?: string;
  structuredFormat?: boolean;
  retryAttempt?: number;
};

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const generateResponse = async ({ 
    prompt, 
    context = '', 
    model = 'gemini-1.5-pro',
    structuredFormat = true,
    retryAttempt = 0
  }: GenerateResponseParams) => {
    // Prevent duplicate calls if a request is already in progress
    if (isRequestInProgress && retryAttempt === 0) {
      toast({
        title: "Request in progress",
        description: "Please wait for the current request to complete.",
        variant: "warning",
      });
      return { generatedText: "A request is already in progress. Please wait." };
    }

    setLoading(true);
    setError(null);
    setIsRequestInProgress(true);

    try {
      // Call the Supabase Edge Function to generate a response
      const { data, error } = await supabase.functions.invoke('gemini-generate-response', {
        body: {
          prompt,
          context,
          model,
          structuredFormat,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data || { generatedText: "Sorry, I couldn't generate a response at this time." };
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error generating response",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
      return { generatedText: "Sorry, there was an error generating a response." };
    } finally {
      setLoading(false);
      setIsRequestInProgress(false);
    }
  };

  return {
    loading,
    error,
    generateResponse,
    isRequestInProgress
  };
}
