
import { useState } from 'react';
import { Question, QuestionFeedback } from '@/components/skills/assessment/types';

export function useFeedbackProcessing() {
  const [detailedFeedback, setDetailedFeedback] = useState<QuestionFeedback[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Process feedback from a single answer
  const processSingleAnswerFeedback = (feedback: QuestionFeedback) => {
    // Track answer correctness for adaptive difficulty
    setTotalAnswered(prev => prev + 1);
    if (feedback.correct) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    
    setDetailedFeedback(prev => [...prev, feedback]);
    
    return feedback;
  };

  // Process feedback from assessment evaluation
  const processAssessmentFeedback = (
    assessmentQuestions: Question[],
    apiResponse: {
      score: number,
      feedback: any[],
      improvements: string[],
      nextSteps: string[]
    }
  ) => {
    const { score, feedback, improvements, nextSteps } = apiResponse;
    
    // Add explanations to questions
    const updatedQuestions = assessmentQuestions.map(q => {
      const feedbackItem = feedback.find(f => f.questionId === q.id);
      return {
        ...q,
        explanation: feedbackItem?.comment || "No explanation provided."
      };
    });
    
    // Update detailed feedback
    const newDetailedFeedback = feedback.map(f => ({
      questionId: f.questionId,
      correct: f.correct,
      explanation: f.comment || "No detailed explanation available.",
      improvement: improvements?.find((imp: string) => imp.includes(f.questionId.toString())) || null,
      nextSteps: nextSteps || []
    }));
    
    setDetailedFeedback(newDetailedFeedback);
    
    return { updatedQuestions, detailedFeedback: newDetailedFeedback };
  };

  // Reset all feedback states
  const resetFeedbackStates = () => {
    setDetailedFeedback([]);
    setCorrectAnswersCount(0);
    setTotalAnswered(0);
  };

  return {
    detailedFeedback,
    correctAnswersCount,
    totalAnswered,
    processSingleAnswerFeedback,
    processAssessmentFeedback,
    resetFeedbackStates
  };
}
