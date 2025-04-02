
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Question } from '@/components/skills/assessment/types';

export function useQuestionGeneration() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("medium"); // track difficulty level
  const { toast } = useToast();
  
  const generateQuestionsForSkill = async (skill: any, customDifficulty?: string) => {
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
    
    // Use custom difficulty if provided, otherwise use current tracked difficulty
    const difficulty = customDifficulty || currentDifficulty;
    
    console.log("Generating questions for skill:", skill.name, "at", skill.proficiency, "level with difficulty:", difficulty);
    
    try {
      toast({
        title: "Generating assessment",
        description: `Creating a gamified assessment for ${skill.name} at ${skill.proficiency} level`,
        variant: "default",
      });
      
      // Set a timeout to detect stalled API calls - increased from 30s to 45s
      const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out after 45 seconds")), 45000);
      });
      
      // Create the actual API call promise - always use gemini-1.5-flash
      const apiCallPromise = supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'generate_questions',
          skill: skill.name,
          proficiency: skill.proficiency,
          difficulty: difficulty, // Pass difficulty to the API
          sources: [],
          model: 'gemini-1.5-pro' // Use Pro model for better quality questions
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
        // Make sure we have at least 8 questions
        if (data.questions.length < 8) {
          throw new Error("Not enough questions generated. Expected at least 8 questions.");
        }
        setQuestions(data.questions);
        toast({
          title: "Assessment generated",
          description: `Created ${data.questions.length} interactive questions for you to complete`,
          variant: "default",
        });
      } else {
        console.error("Invalid response format from assessment generator:", data);
        throw new Error("Invalid response format from assessment generator");
      }
    } catch (error: any) {
      console.error("Error generating questions:", error);
      // Try a second time with a simpler prompt
      try {
        toast({
          title: "Retrying assessment generation",
          description: "First attempt failed. Retrying with simplified format.",
          variant: "default",
        });
        
        const { data, error } = await supabase.functions.invoke('skill-assessment', {
          body: {
            action: 'generate_questions',
            skill: skill.name,
            proficiency: skill.proficiency,
            difficulty: difficulty,
            sources: [],
            model: 'gemini-1.5-flash' // Try with flash model as fallback
          },
        });
        
        if (error || !data || !data.questions || !Array.isArray(data.questions)) {
          throw new Error("Second generation attempt failed");
        }
        
        console.log("Second attempt successful. Questions:", data.questions.length);
        setQuestions(data.questions);
        
        toast({
          title: "Assessment generated",
          description: `Created ${data.questions.length} questions for you to complete`,
          variant: "default",
        });
      } catch (secondError) {
        console.error("Second attempt failed:", secondError);
        setGenerationFailed(true);
        toast({
          title: "Assessment generation failed",
          description: "We couldn't generate your assessment. Please try again later.",
          variant: "destructive",
        });
        
        setQuestions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Adjust difficulty based on user performance
  const adjustDifficulty = (correctAnswers: number, totalAnswered: number) => {
    if (totalAnswered < 3) return currentDifficulty; // Need at least 3 questions to determine performance
    
    const successRate = correctAnswers / totalAnswered;
    
    if (successRate > 0.8) {
      // User is doing very well - increase difficulty
      if (currentDifficulty !== "hard") {
        setCurrentDifficulty("hard");
        return "hard";
      }
    } else if (successRate < 0.4) {
      // User is struggling - decrease difficulty
      if (currentDifficulty !== "easy") {
        setCurrentDifficulty("easy");
        return "easy";
      }
    } else {
      // User is doing ok - keep medium difficulty
      if (currentDifficulty !== "medium") {
        setCurrentDifficulty("medium");
        return "medium";
      }
    }
    
    return currentDifficulty; // Return current difficulty if no change
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
    currentDifficulty,
    generateQuestionsForSkill,
    adjustDifficulty,
    resetGenerationFailedState
  };
}
