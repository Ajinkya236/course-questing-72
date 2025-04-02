
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function useAssessmentNavigation(skillId: string | undefined) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("assessment");
  const { toast } = useToast();

  // Navigation handlers
  const handleBack = () => {
    navigate(`/skills/${skillId}`);
  };

  const handleNextQuestion = (
    questions: any[],
    currentFeedback: any | undefined,
    adaptiveMode: boolean,
    handleSubmitAnswer: () => Promise<void>,
    handleSubmitAssessment: () => Promise<void>
  ) => {
    // For adaptive mode, we need to have feedback before moving to next question
    if (adaptiveMode && !currentFeedback && currentQuestionIndex < questions.length - 1) {
      handleSubmitAnswer();
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return false; // Not last question
    } else {
      // Last question, submit assessment
      handleSubmitAssessment();
      return true; // Last question
    }
  };

  const handlePreviousQuestion = (
    questions: any[],
    setCurrentFeedback: (feedback: any | undefined) => void
  ) => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Set feedback for the previous question if available
      const prevQuestion = questions[currentQuestionIndex - 1];
      if (prevQuestion.feedback) {
        setCurrentFeedback(prevQuestion.feedback);
      } else {
        setCurrentFeedback(undefined);
      }
    }
  };

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    activeTab,
    setActiveTab,
    handleBack,
    handleNextQuestion,
    handlePreviousQuestion,
  };
}
