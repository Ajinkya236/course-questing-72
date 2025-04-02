
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Question, AssessmentAttempt, QuestionFeedback } from '@/components/skills/assessment/types';
import { useAttemptManagement } from './useAttemptManagement';
import { useBadgeManagement } from './useBadgeManagement';
import { useApiSubmission } from './useApiSubmission';
import { useFeedbackProcessing } from './useFeedbackProcessing';

export function useAssessmentSubmission(skillId: number | undefined, PASS_RATE: number) {
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const { toast } = useToast();
  const { saveAttempt } = useAttemptManagement(skillId);
  const { awardBadge } = useBadgeManagement();
  const { evaluateAnswer, evaluateAssessment } = useApiSubmission();
  const { 
    detailedFeedback,
    correctAnswersCount,
    totalAnswered,
    processSingleAnswerFeedback,
    processAssessmentFeedback,
    resetFeedbackStates
  } = useFeedbackProcessing();
  
  // Submit a single answer for evaluation (for adaptive assessment)
  const submitAnswer = async (
    question: Question,
    userAnswer: string | string[],
    selectedSkill: any | null
  ) => {
    if (!selectedSkill) {
      toast({
        title: "Error",
        description: "No skill selected for assessment.",
        variant: "destructive",
      });
      return null;
    }
    
    setIsSubmitting(true);
    
    try {
      const feedback = await evaluateAnswer(
        question,
        userAnswer as string | string[],
        selectedSkill.name,
        selectedSkill.proficiency
      );
      
      if (feedback) {
        // Process the feedback
        const processedFeedback = processSingleAnswerFeedback(feedback);
        return processedFeedback;
      }
      
      return null;
    } catch (error: any) {
      console.error("Error in submitAnswer:", error);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
      // If we're using custom proficiency, update the skill object
      const skillToSubmit = selectedSkill;
      
      // Call the API to evaluate the assessment
      const result = await evaluateAssessment(
        assessmentQuestions,
        skillToSubmit.name,
        skillToSubmit.proficiency
      );
      
      const score = result.score;
      
      // Process the feedback and update questions
      const { updatedQuestions, detailedFeedback: newDetailedFeedback } = 
        processAssessmentFeedback(assessmentQuestions, result);
      
      setAssessmentScore(score);
      
      // Save the attempt
      const attempt: AssessmentAttempt = {
        id: `attempt-${Date.now()}`,
        date: new Date().toISOString(),
        score: score,
        skillId: selectedSkill.id,
        skillName: selectedSkill.name,
        questions: updatedQuestions,
        passed: score >= PASS_RATE,
        detailedFeedback: newDetailedFeedback
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

      return { score, questions: updatedQuestions, detailedFeedback: newDetailedFeedback };
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

  // Reset all states
  const resetAssessmentStates = () => {
    setSubmissionFailed(false);
    resetFeedbackStates();
  };

  return {
    assessmentScore,
    setAssessmentScore,
    isSubmitting,
    submissionFailed,
    detailedFeedback,
    correctAnswersCount,
    totalAnswered,
    submitAnswer,
    submitAssessment,
    resetAssessmentStates
  };
}
