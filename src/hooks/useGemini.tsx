
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

  const generateResponse = async ({ 
    prompt, 
    context = '', 
    model = 'gemini-1.5-pro',
    structuredFormat = true
  }: GenerateResponseParams) => {
    setLoading(true);
    setError(null);

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
    }
  };

  return {
    loading,
    error,
    generateResponse,
  };
}
