
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Question, AssessmentAttempt } from '@/components/skills/assessment/types';
import { useAttemptManagement } from './useAttemptManagement';
import { useBadgeManagement } from './useBadgeManagement';

export function useAssessmentSubmission(skillId: number | undefined, PASS_RATE: number) {
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const { toast } = useToast();
  const { saveAttempt } = useAttemptManagement(skillId);
  const { awardBadge } = useBadgeManagement();
  
  const submitAssessment = async (
    assessmentQuestions: Question[], 
    selectedSkill: any | null
  ) => {
    // Prevent repeated submissions if previous one failed
    if (submissionFailed) {
      toast({
        title: "Submission error",
        description: "Previous submission failed. Please refresh the page and try again.",
        variant: "destructive",
      });
      return { score: null, questions: assessmentQuestions };
    }
    
    if (!selectedSkill) {
      toast({
        title: "Error",
        description: "No skill selected for assessment.",
        variant: "destructive",
      });
      return { score: null, questions: assessmentQuestions };
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting assessment for evaluation:", {
        skill: selectedSkill.name,
        proficiency: selectedSkill.proficiency,
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
          skill: selectedSkill.name,
          proficiency: selectedSkill.proficiency,
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
        setSubmissionFailed(true);
        throw new Error(`Error evaluating assessment: ${error.message}`);
      }
      
      let score = 0;
      let feedback: any[] = [];
      
      if (data) {
        score = data.score || 0;
        feedback = data.feedback || [];

        // Add explanations to questions
        const updatedQuestions = assessmentQuestions.map(q => {
          const feedbackItem = feedback.find(f => f.questionId === q.id);
          return {
            ...q,
            explanation: feedbackItem?.comment || "No explanation provided."
          };
        });
        
        setAssessmentScore(score);
        
        // Save the attempt
        const attempt: AssessmentAttempt = {
          id: `attempt-${Date.now()}`,
          date: new Date().toISOString(),
          score: score,
          skillId: selectedSkill.id,
          skillName: selectedSkill.name,
          questions: updatedQuestions,
          passed: score >= PASS_RATE
        };
        
        saveAttempt(attempt);
        
        // If passed, award a badge
        if (attempt.passed) {
          const newBadge = awardBadge(selectedSkill.id, selectedSkill.name, selectedSkill.proficiency);
          if (newBadge) {
            // Update the attempt to show badge was awarded
            attempt.badgeAwarded = true;
          }
        }
        
        toast({
          title: "Assessment Completed",
          description: `Your score: ${score}% (${score >= PASS_RATE ? 'Passed' : 'Failed'})`,
        });

        return { score, questions: updatedQuestions };
      } else {
        setSubmissionFailed(true);
        throw new Error("No data returned from assessment evaluation");
      }
    } catch (error: any) {
      console.error("Error evaluating assessment:", error);
      setSubmissionFailed(true);
      toast({
        title: "Error",
        description: "Failed to evaluate assessment. Please try again later.",
        variant: "destructive",
      });
      
      return { score: null, questions: assessmentQuestions };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset submission failed state
  const resetSubmissionFailedState = () => {
    setSubmissionFailed(false);
  };

  return {
    assessmentScore,
    setAssessmentScore,
    isSubmitting,
    submissionFailed,
    submitAssessment,
    resetSubmissionFailedState
  };
}
