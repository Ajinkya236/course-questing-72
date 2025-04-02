
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Question, AssessmentAttempt, QuestionFeedback } from '@/components/skills/assessment/types';
import { useAttemptManagement } from './useAttemptManagement';
import { useBadgeManagement } from './useBadgeManagement';

export function useAssessmentSubmission(skillId: number | undefined, PASS_RATE: number) {
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [detailedFeedback, setDetailedFeedback] = useState<QuestionFeedback[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const { toast } = useToast();
  const { saveAttempt } = useAttemptManagement(skillId);
  const { awardBadge } = useBadgeManagement();
  
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
      console.log("Submitting answer for evaluation:", {
        skill: selectedSkill.name,
        proficiency: selectedSkill.proficiency,
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
          skill: selectedSkill.name,
          proficiency: selectedSkill.proficiency,
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
        // Track answer correctness for adaptive difficulty
        setTotalAnswered(prev => prev + 1);
        if (data.correct) {
          setCorrectAnswersCount(prev => prev + 1);
        }
        
        const feedback: QuestionFeedback = {
          questionId: question.id,
          correct: data.correct,
          explanation: data.explanation || "No detailed explanation available.",
          improvement: data.improvement || null,
          nextSteps: data.nextSteps || []
        };
        
        setDetailedFeedback(prev => [...prev, feedback]);
        
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
        
        // Update detailed feedback
        const newDetailedFeedback = feedback.map(f => ({
          questionId: f.questionId,
          correct: f.correct,
          explanation: f.comment || "No detailed explanation available.",
          improvement: data.improvements?.find((imp: string) => imp.includes(f.questionId.toString())) || null,
          nextSteps: data.nextSteps || []
        }));
        
        setDetailedFeedback(newDetailedFeedback);
        
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

  // Reset all states
  const resetAssessmentStates = () => {
    setSubmissionFailed(false);
    setDetailedFeedback([]);
    setCorrectAnswersCount(0);
    setTotalAnswered(0);
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
