
import { useState, useEffect } from 'react';
import { mockSkills } from '@/data/skillsData';
import { useToast } from '@/hooks/use-toast';
import { Question, QuestionFeedback } from '@/components/skills/assessment/types';
import { 
  useBadgeManagement,
  useAttemptManagement,
  useQuestionGeneration,
  useAssessmentSubmission,
  PASS_RATE
} from '@/hooks/assessment';

export const useAssessment = (skillId: string | undefined) => {
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const { toast } = useToast();
  
  // Use our refactored hooks
  const { 
    questions,
    setQuestions,
    isLoading,
    generationFailed,
    currentDifficulty,
    generateQuestionsForSkill,
    adjustDifficulty,
    resetGenerationFailedState
  } = useQuestionGeneration();
  
  const {
    previousAttempts
  } = useAttemptManagement(selectedSkill?.id);
  
  const {
    earnedBadges,
    showBadgeModal,
    latestBadge,
    closeBadgeModal
  } = useBadgeManagement();
  
  const {
    assessmentScore,
    setAssessmentScore,
    isSubmitting,
    submissionFailed,
    detailedFeedback,
    correctAnswersCount,
    totalAnswered,
    submitAnswer,
    submitAssessment: submit,
    resetAssessmentStates
  } = useAssessmentSubmission(selectedSkill?.id, PASS_RATE);

  useEffect(() => {
    if (!skillId) return;
    
    // Find the skill from mockSkills
    const skill = mockSkills.find(s => s.id === Number(skillId));
    if (skill) {
      setSelectedSkill(skill);
      // Generate questions based on the skill
      generateQuestionsForSkill(skill);
    } else {
      toast({
        title: "Skill not found",
        description: "We couldn't find the skill you're looking for.",
        variant: "destructive",
      });
    }
  }, [skillId, generateQuestionsForSkill, toast]);

  const resetAssessment = () => {
    setAssessmentScore(null);
    resetGenerationFailedState();
    resetAssessmentStates();
    if (selectedSkill) {
      generateQuestionsForSkill(selectedSkill);
    }
  };

  const submitAssessment = async (assessmentQuestions: Question[]) => {
    return await submit(assessmentQuestions, selectedSkill);
  };

  return {
    questions,
    setQuestions,
    isLoading,
    isSubmitting,
    selectedSkill,
    assessmentScore,
    setAssessmentScore,
    previousAttempts,
    earnedBadges,
    showBadgeModal,
    latestBadge,
    closeBadgeModal,
    PASS_RATE,
    generationFailed,
    currentDifficulty,
    detailedFeedback,
    correctAnswersCount,
    totalAnswered,
    generateQuestionsForSkill,
    adjustDifficulty,
    submitAnswer,
    submitAssessment,
    resetAssessment
  };
};
