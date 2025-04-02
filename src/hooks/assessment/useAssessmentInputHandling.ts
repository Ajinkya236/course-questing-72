
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Question } from '@/components/skills/assessment/types';

export function useAssessmentInputHandling() {
  const [selectedProficiency, setSelectedProficiency] = useState<string | null>(null);
  const [adaptiveMode, setAdaptiveMode] = useState<boolean>(true);
  const [currentFeedback, setCurrentFeedback] = useState<any | undefined>(undefined);
  const { toast } = useToast();

  // Handle proficiency change
  const handleProficiencyChange = (
    newProficiency: string,
    selectedSkill: any | null,
    setAssessmentScore: (score: number | null) => void,
    setCurrentQuestionIndex: (index: number) => void,
    generateQuestionsForSkill: (skill: any) => void
  ) => {
    if (selectedSkill) {
      setSelectedProficiency(newProficiency);
      
      // Create a modified skill object with the new proficiency
      const updatedSkill = {
        ...selectedSkill,
        proficiency: newProficiency
      };
      
      // Reset assessment state
      setAssessmentScore(null);
      setCurrentQuestionIndex(0);
      setCurrentFeedback(undefined);
      
      // Generate new questions based on updated proficiency
      generateQuestionsForSkill(updatedSkill);
    }
  };

  const handleAnswer = (
    answer: string | string[],
    questions: Question[],
    currentQuestionIndex: number,
    setQuestions: (questions: Question[]) => void
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = answer;
    setQuestions(updatedQuestions);
  };

  return {
    selectedProficiency,
    setSelectedProficiency,
    adaptiveMode,
    setAdaptiveMode,
    currentFeedback,
    setCurrentFeedback,
    handleProficiencyChange,
    handleAnswer
  };
}
