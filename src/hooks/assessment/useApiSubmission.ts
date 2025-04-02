
import { supabase } from '@/integrations/supabase/client';
import { Question } from '@/components/skills/assessment/types';
import { toast } from '@/hooks/use-toast';

export function useApiSubmission() {
  const evaluateAnswer = async (
    question: Question,
    userAnswer: string | string[],
    skillName: string,
    proficiency: string
  ) => {
    try {
      // Set a timeout to detect stalled API calls - increased to 45 seconds
      const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out after 45 seconds")), 45000);
      });
      
      // Create the API call promise - always use gemini-1.5-flash
      const apiCallPromise = supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'evaluate_answer',
          question,
          userAnswer,
          skill: skillName,
          proficiency: proficiency,
          model: 'gemini-1.5-flash' // Always use flash model for speed
        },
      });
      
      // Race the API call against the timeout
      const { data, error } = await Promise.race([
        apiCallPromise, 
        timeoutPromise
      ]) as any;
      
      if (error) {
        console.error("Error calling skill-assessment evaluate_answer:", error);
        throw new Error(`Error calling assessment evaluator: ${error.message}`);
      }
      
      return data;
    } catch (error: any) {
      console.error("Error evaluating answer:", error);
      toast({
        title: "Evaluation failed",
        description: "We couldn't evaluate your answer. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const evaluateAssessment = async (
    questions: Question[],
    skillName: string,
    proficiency: string
  ) => {
    try {
      // Set a timeout to detect stalled API calls - increased to 45 seconds
      const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out after 45 seconds")), 45000);
      });
      
      // Create the API call promise - always use gemini-1.5-flash
      const apiCallPromise = supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'evaluate_assessment',
          questions,
          skill: skillName,
          proficiency: proficiency,
          model: 'gemini-1.5-flash' // Always use flash model for speed
        },
      });
      
      // Race the API call against the timeout
      const { data, error } = await Promise.race([
        apiCallPromise, 
        timeoutPromise
      ]) as any;
      
      if (error) {
        console.error("Error calling skill-assessment evaluate_assessment:", error);
        throw new Error(`Error evaluating assessment: ${error.message}`);
      }
      
      return data;
    } catch (error: any) {
      console.error("Error evaluating assessment:", error);
      toast({
        title: "Assessment evaluation failed",
        description: "We couldn't evaluate your assessment. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { evaluateAnswer, evaluateAssessment };
}
