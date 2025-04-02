
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Question, QuestionFeedback } from '@/components/skills/assessment/types';
import { useAssessment } from '@/hooks/useAssessment';

export function useAssessmentState(skillId: string | undefined) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("assessment");
  const [selectedProficiency, setSelectedProficiency] = useState<string | null>(null);
  const [adaptiveMode, setAdaptiveMode] = useState<boolean>(true);
  const [currentFeedback, setCurrentFeedback] = useState<QuestionFeedback | undefined>(undefined);
  const { toast } = useToast();
  
  const assessmentHook = useAssessment(skillId);
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
    detailedFeedback
  } = assessmentHook;

  useEffect(() => {
    if (!skillId) {
      navigate('/skills');
      return;
    }
  }, [skillId, navigate]);

  // Handle retry functionality for assessment generation
  const handleRetryGenerateQuestions = () => {
    if (selectedSkill) {
      toast({
        title: "Generating new assessment",
        description: `Creating a new assessment for ${selectedSkill.name} at ${selectedProficiency || selectedSkill.proficiency} level.`,
        variant: "default",
      });
      
      // Create a modified skill object with the selected proficiency or use the default one
      const updatedSkill = selectedProficiency ? {
        ...selectedSkill,
        proficiency: selectedProficiency
      } : selectedSkill;
      
      generateQuestionsForSkill(updatedSkill);
    }
  };

  // Handle proficiency change
  const handleProficiencyChange = (newProficiency: string) => {
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

  const handleBack = () => {
    navigate(`/skills/${skillId}`);
  };

  const handleAnswer = (answer: string | string[]) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = answer;
    setQuestions(updatedQuestions);
  };

  // Handle submitting a single answer in adaptive mode
  const handleSubmitAnswer = async () => {
    if (!selectedSkill || !questions[currentQuestionIndex]) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // If we don't have an answer, don't submit
    if (!currentQuestion.userAnswer && currentQuestion.type !== 'shortAnswer') {
      toast({
        title: "Answer required",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    // Submit the answer for evaluation
    const feedback = await submitAnswer(
      currentQuestion, 
      currentQuestion.userAnswer as string | string[], 
      selectedSkill
    );
    
    if (feedback) {
      setCurrentFeedback(feedback);
      
      // Update the questions array with the feedback
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestion,
        feedback: feedback
      };
      setQuestions(updatedQuestions);
      
      // Check if we need to adjust difficulty for the next question
      if (currentQuestionIndex < questions.length - 1) {
        const newDifficulty = adjustDifficulty(correctAnswersCount, totalAnswered);
        
        // If difficulty changed, update the next question
        if (newDifficulty && newDifficulty !== assessmentHook.currentDifficulty) {
          // Mark next question with new difficulty
          updatedQuestions[currentQuestionIndex + 1] = {
            ...updatedQuestions[currentQuestionIndex + 1],
            difficulty: newDifficulty
          };
          setQuestions(updatedQuestions);
          
          toast({
            title: "Difficulty adjusted",
            description: `Based on your performance, the difficulty has been adjusted to ${newDifficulty}.`,
            variant: "default",
          });
        }
      }
    }
  };

  const handleNextQuestion = () => {
    // For adaptive mode, we need to have feedback before moving to next question
    if (adaptiveMode && !currentFeedback && currentQuestionIndex < questions.length - 1) {
      handleSubmitAnswer();
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentFeedback(undefined); // Clear feedback for next question
    } else {
      // Last question, submit assessment
      handleSubmitAssessment();
    }
  };

  const handlePreviousQuestion = () => {
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

  const handleSubmitAssessment = async () => {
    // If we're using custom proficiency, update the skill object
    const skillToSubmit = selectedProficiency && selectedSkill 
      ? { ...selectedSkill, proficiency: selectedProficiency }
      : selectedSkill;
      
    await submitAssessment(questions);
  };

  const handleRetryAssessment = () => {
    setAssessmentScore(null);
    setCurrentQuestionIndex(0);
    setCurrentFeedback(undefined);
    setActiveTab("assessment");
    resetAssessment();
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
