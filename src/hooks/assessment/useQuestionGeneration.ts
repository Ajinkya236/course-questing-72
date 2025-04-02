
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Question } from '@/components/skills/assessment/types';

export function useQuestionGeneration() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);
  const { toast } = useToast();
  
  const generateQuestionsForSkill = async (skill: any) => {
    // If already loading, prevent duplicate requests
    if (isLoading) {
      toast({
        title: "Generation in progress",
        description: "Please wait for the current assessment to finish generating.",
        variant: "default",
      });
      return;
    }
    
    setIsLoading(true);
    setGenerationFailed(false);
    console.log("Generating questions for skill:", skill.name, "at", skill.proficiency, "level");
    
    try {
      // Set a timeout to detect stalled API calls
      const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out after 60 seconds")), 60000);
      });
      
      // Create the actual API call promise - always use gemini-1.5-pro
      const apiCallPromise = supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'generate_questions',
          skill: skill.name,
          proficiency: skill.proficiency,
          sources: [],
          model: 'gemini-1.5-pro' // Ensure we always use 2.5 Pro model
        },
      });
      
      // Race the API call against the timeout
      const { data, error } = await Promise.race([
        apiCallPromise, 
        timeoutPromise
      ]) as any;
      
      if (error) {
        console.error("Error calling skill-assessment:", error);
        throw new Error(`Error calling skill-assessment: ${error.message}`);
      }
      
      if (!data) {
        console.error("No data returned from skill-assessment function");
        throw new Error("No data returned from assessment generator");
      }
      
      console.log("Received data from skill-assessment:", data);
      
      if (data && data.questions && Array.isArray(data.questions)) {
        console.log("Successfully parsed questions:", data.questions.length);
        setQuestions(data.questions);
      } else {
        console.error("Invalid response format from assessment generator:", data);
        throw new Error("Invalid response format from assessment generator");
      }
    } catch (error: any) {
      console.error("Error generating questions:", error);
      setGenerationFailed(true);
      toast({
        title: "Assessment generation failed",
        description: error.message || "Failed to generate assessment questions. Please try again later.",
        variant: "destructive",
      });
      
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset generation failed state
  const resetGenerationFailedState = () => {
    setGenerationFailed(false);
  };

  return {
    questions,
    setQuestions,
    isLoading,
    generationFailed,
    generateQuestionsForSkill,
    resetGenerationFailedState
  };
}
