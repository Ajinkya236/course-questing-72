
import { useEffect } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { useAssessmentNavigation } from './useAssessmentNavigation';
import { useAssessmentInputHandling } from './useAssessmentInputHandling';
import { useAssessmentSubmissionHandlers } from './useAssessmentSubmissionHandlers';

export function useAssessmentState(skillId: string | undefined) {
  // Use our extracted hooks
  const assessmentHook = useAssessment(skillId);
  
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    activeTab,
    setActiveTab,
    handleBack,
    handleNextQuestion: navigateNextQuestion,
    handlePreviousQuestion: navigatePreviousQuestion,
  } = useAssessmentNavigation(skillId);
  
  const {
    selectedProficiency,
    setSelectedProficiency,
    adaptiveMode,
    setAdaptiveMode,
    currentFeedback,
    setCurrentFeedback,
    handleProficiencyChange: changeProficiency,
    handleAnswer: updateAnswer
  } = useAssessmentInputHandling();
  
  const {
    handleSubmitAnswer: submitSingleAnswer,
    handleRetryGenerateQuestions: retryGenerate,
    handleSubmitAssessment: submitFullAssessment,
    handleRetryAssessment: retryAssessment
  } = useAssessmentSubmissionHandlers();
  
  const {
    questions,
    setQuestions,
    isLoading,
    isSubmitting,
    selectedSkill,
    assessmentScore,
    setAssessmentScore,
    submitAssessment,
    submitAnswer,
    resetAssessment,
    generateQuestionsForSkill,
    adjustDifficulty,
    correctAnswersCount,
    totalAnswered,
    currentDifficulty,
  } = assessmentHook;

  useEffect(() => {
    if (!skillId) {
      handleBack();
      return;
    }
  }, [skillId]);

  // Wrapper functions to connect our hooks together
  const handleAnswer = (answer: string | string[]) => {
    updateAnswer(answer, questions, currentQuestionIndex, setQuestions);
  };

  const handleProficiencyChange = (newProficiency: string) => {
    changeProficiency(
      newProficiency, 
      selectedSkill, 
      setAssessmentScore, 
      setCurrentQuestionIndex,
      generateQuestionsForSkill
    );
  };

  const handleSubmitAnswer = async () => {
    await submitSingleAnswer(
      currentQuestionIndex,
      questions,
      selectedSkill,
      submitAnswer,
      setCurrentFeedback,
      setQuestions,
      adjustDifficulty,
      correctAnswersCount,
      totalAnswered,
      currentDifficulty
    );
  };

  const handleNextQuestion = () => {
    navigateNextQuestion(
      questions, 
      currentFeedback, 
      adaptiveMode, 
      handleSubmitAnswer,
      handleSubmitAssessment
    );
  };

  const handlePreviousQuestion = () => {
    navigatePreviousQuestion(questions, setCurrentFeedback);
  };

  const handleSubmitAssessment = async () => {
    await submitFullAssessment(questions, selectedProficiency, selectedSkill, submitAssessment);
  };

  const handleRetryAssessment = () => {
    retryAssessment(
      setAssessmentScore,
      setCurrentQuestionIndex,
      setCurrentFeedback,
      setActiveTab,
      resetAssessment
    );
  };

  const handleRetryGenerateQuestions = () => {
    retryGenerate(selectedSkill, selectedProficiency, generateQuestionsForSkill);
  };

  return {
    ...assessmentHook,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    activeTab,
    setActiveTab,
    selectedProficiency,
    setSelectedProficiency,
    adaptiveMode,
    setAdaptiveMode,
    currentFeedback,
    setCurrentFeedback,
    handleRetryGenerateQuestions,
    handleProficiencyChange,
    handleBack,
    handleAnswer,
    handleSubmitAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
    handleSubmitAssessment,
    handleRetryAssessment
  };
}
