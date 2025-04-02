
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Question, QuestionFeedback } from '@/components/skills/assessment/types';

export function useApiSubmission() {
  const { toast } = useToast();

  // Submit a single answer to the API for evaluation
  const evaluateAnswer = async (
    question: Question,
    userAnswer: string | string[],
    skillName: string,
    proficiency: string
  ): Promise<QuestionFeedback | null> => {
    try {
      console.log("Submitting answer for evaluation:", {
        skill: skillName,
        proficiency: proficiency,
        question: question.id,
        answer: userAnswer
      });
      
      // Set a timeout to detect stalled API calls
      const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out after 30 seconds")), 30000);
      });
      
      // Call the skill-assessment edge function to evaluate the answer
      const functionPromise = supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'evaluate_answer',
          skill: skillName,
          proficiency: proficiency,
          question: {
            id: question.id,
            type: question.type,
            text: question.text,
            userAnswer: userAnswer,
            correctAnswer: question.correctAnswer || ''
          },
          model: 'gemini-1.5-pro'
        },
      });
      
      // Race the function call against the timeout
      const { data, error } = await Promise.race([
        functionPromise,
        timeoutPromise
      ]);
      
      if (error) {
        throw new Error(`Error evaluating answer: ${error.message}`);
      }
      
      if (data) {
        const feedback: QuestionFeedback = {
          questionId: question.id,
          correct: data.correct,
          explanation: data.explanation || "No detailed explanation available.",
          improvement: data.improvement || null,
          nextSteps: data.nextSteps || []
        };
        
        return feedback;
      } else {
        throw new Error("No data returned from answer evaluation");
      }
    } catch (error: any) {
      console.error("Error evaluating answer:", error);
      toast({
        title: "Error",
        description: "Failed to evaluate answer. Please try again.",
        variant: "destructive",
      });
      
      return null;
    }
  };
  
  // Submit the entire assessment to the API for evaluation
  const evaluateAssessment = async (
    assessmentQuestions: Question[],
    skillName: string,
    proficiency: string
  ) => {
    try {
      console.log("Submitting assessment for evaluation:", {
        skill: skillName,
        proficiency: proficiency,
        questionsCount: assessmentQuestions.length
      });
      
      // Set a timeout to detect stalled API calls
      const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out after 60 seconds")), 60000);
      });
      
      // Call the skill-assessment edge function to evaluate the assessment
      const functionPromise = supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'evaluate_assessment',
          skill: skillName,
          proficiency: proficiency,
          userAnswers: assessmentQuestions.map(q => ({
            id: q.id,
            type: q.type,
            text: q.text,
            userAnswer: q.userAnswer || '',
            correctAnswer: q.correctAnswer || ''
          })),
          sources: [],
          model: 'gemini-1.5-pro'
        },
      });
      
      // Race the function call against the timeout
      const { data, error } = await Promise.race([
        functionPromise,
        timeoutPromise
      ]);
      
      if (error) {
        throw new Error(`Error evaluating assessment: ${error.message}`);
      }
      
      if (data) {
        return {
          score: data.score || 0,
          feedback: data.feedback || [],
          improvements: data.improvements || [],
          nextSteps: data.nextSteps || []
        };
      } else {
        throw new Error("No data returned from assessment evaluation");
      }
    } catch (error: any) {
      console.error("Error evaluating assessment:", error);
      throw error;
    }
  };

  return {
    evaluateAnswer,
    evaluateAssessment
  };
}
