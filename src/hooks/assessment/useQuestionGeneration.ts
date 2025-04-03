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
      // Set a timeout to detect stalled API calls
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout
      
      try {
        // First, try to call our edge function
        const { data, error } = await supabase.functions.invoke('generate-assessment', {
          body: {
            skillName: skill.name,
            proficiency: skill.proficiency,
            difficulty: difficulty
          }
        });
        
        clearTimeout(timeout);
        
        if (error) {
          console.error("Error calling generate-assessment:", error);
          throw new Error(`Error calling assessment generator: ${error.message}`);
        }
        
        if (!data) {
          console.error("No data returned from generate-assessment function");
          throw new Error("No data returned from assessment generator");
        }
        
        console.log("Received data from generate-assessment:", data);
        
        if (data.questions && Array.isArray(data.questions)) {
          console.log("Successfully parsed questions:", data.questions.length);
          
          // Transform the questions to match the required Question interface
          // Map 'question' property to 'text' property to match the Question type
          // Also convert string IDs to numbers to match the Question type
          const formattedQuestions = data.questions.map((q: any, index: number) => ({
            id: index + 1, // Convert string IDs to numbers
            text: q.question, // Map the 'question' field to 'text'
            type: q.type,
            options: q.options,
            correctAnswer: q.correctAnswer,
            difficulty: q.difficulty,
            explanation: q.explanation
          }));
          
          setQuestions(formattedQuestions);
        } else {
          console.error("Invalid response format from assessment generator:", data);
          throw new Error("Invalid response format from assessment generator");
        }
      } catch (apiError: any) {
        clearTimeout(timeout);
        
        // Check if it's an abort error (timeout)
        if (apiError.name === 'AbortError') {
          console.log("API call timed out, falling back to local generation");
          throw new Error("API call timed out after 30 seconds");
        }
        
        throw apiError;
      }
    } catch (error: any) {
      console.error("Error generating questions:", error);
      
      // Generate fallback questions with numeric IDs to match the Question type
      const fallbackQuestions: Question[] = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1, // Using numeric IDs
        text: `What is an important principle of ${skill.name}?`, 
        type: "multipleChoice",
        options: [
          `Important principle ${i+1}`, 
          `Important principle ${i+2}`, 
          `Important principle ${i+3}`, 
          `Important principle ${i+4}`
        ],
        correctAnswer: `Important principle ${i+1}`,
        difficulty: difficulty,
        explanation: `This is a key concept in ${skill.name}.`
      }));
      
      setQuestions(fallbackQuestions);
      
      toast({
        title: "Using local assessment",
        description: "Using locally generated questions for your assessment.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Adjust difficulty based on user performance
  const adjustDifficulty = (correctAnswers: number, totalAnswered: number) => {
    if (totalAnswered < 3) return; // Need at least 3 questions to determine performance
    
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
