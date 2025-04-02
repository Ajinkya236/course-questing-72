import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Question } from '@/components/skills/assessment/types';

export function useQuestionGeneration() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const { toast } = useToast();
  
  const generateQuestionsForSkill = async (skill: any) => {
    // Prevent duplicate requests
    if (isRequestInProgress) {
      toast({
        title: "Generation in progress",
        description: "Please wait for the current assessment to be generated.",
        variant: "default",
      });
      return;
    }
    
    setIsLoading(true);
    setIsRequestInProgress(true);
    console.log("Generating questions for skill:", skill.name, "at", skill.proficiency, "level");
    
    try {
      // Check for cached assessment
      const cachedAssessment = localStorage.getItem(`assessment_${skill.name}_${skill.proficiency}`);
      if (cachedAssessment) {
        try {
          const parsedQuestions = JSON.parse(cachedAssessment);
          if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
            console.log("Using cached assessment questions");
            setQuestions(parsedQuestions);
            return;
          }
        } catch (e) {
          console.log("Could not parse cached assessment, generating new one");
        }
      }
      
      // Call the skill-assessment edge function to generate questions
      const { data, error } = await supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'generate_questions',
          skill: skill.name,
          proficiency: skill.proficiency,
          sources: [],
          model: 'gemini-1.5-pro'
        },
      });
      
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
        
        // Cache the assessment for future use
        localStorage.setItem(`assessment_${skill.name}_${skill.proficiency}`, JSON.stringify(data.questions));
      } else {
        console.error("Invalid response format from assessment generator:", data);
        throw new Error("Invalid response format from assessment generator");
      }
    } catch (error: any) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate assessment questions. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to some default questions for demo purposes
      setQuestions(getDefaultQuestions(skill));
    } finally {
      setIsLoading(false);
      setIsRequestInProgress(false);
    }
  };

  const getDefaultQuestions = (skill: any): Question[] => {
    return [
      {
        id: 1,
        type: 'multipleChoice',
        text: `What is the primary focus of ${skill.name}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: 'Option A is correct because it most accurately describes the primary focus.'
      },
      {
        id: 2,
        type: 'trueFalse',
        text: `${skill.name} is essential for professional growth.`,
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'This statement is true because the skill is fundamental to career advancement.'
      },
      {
        id: 3,
        type: 'shortAnswer',
        text: `Explain how ${skill.name} can be applied in your current role.`,
        correctAnswer: 'Sample answer focusing on practical application',
        explanation: 'A good answer would demonstrate practical application in a workplace context.'
      },
      {
        id: 4,
        type: 'codeSandbox',
        text: `Create a simple function that demonstrates a basic ${skill.name} application.`,
        initialCode: `// Write a function that demonstrates ${skill.name}\nfunction demonstrate() {\n  // Your code here\n}`,
        expectedOutput: "A working demonstration of the concept",
        testCases: ["Should handle basic input", "Should produce correct output"],
        correctAnswer: "Sample solution code",
        explanation: "The solution demonstrates understanding of key concepts."
      }
    ];
  };

  return {
    questions,
    setQuestions,
    isLoading,
    generateQuestionsForSkill,
    isRequestInProgress
  };
}
