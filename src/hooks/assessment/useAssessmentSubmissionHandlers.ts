
import { useToast } from '@/hooks/use-toast';
import { Question } from '@/components/skills/assessment/types';

export function useAssessmentSubmissionHandlers() {
  const { toast } = useToast();

  // Handle submitting a single answer in adaptive mode
  const handleSubmitAnswer = async (
    currentQuestionIndex: number,
    questions: Question[],
    selectedSkill: any,
    submitAnswer: (question: Question, userAnswer: string | string[], selectedSkill: any) => Promise<any>,
    setCurrentFeedback: (feedback: any) => void,
    setQuestions: (questions: Question[]) => void,
    adjustDifficulty: (correctAnswers: number, totalAnswered: number) => string | undefined,
    correctAnswersCount: number,
    totalAnswered: number,
    currentDifficulty: string
  ) => {
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
        if (newDifficulty && newDifficulty !== currentDifficulty) {
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

  // Handle retrying functionality for assessment generation
  const handleRetryGenerateQuestions = (
    selectedSkill: any | null,
    selectedProficiency: string | null,
    generateQuestionsForSkill: (skill: any) => Promise<void>
  ) => {
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

  const handleSubmitAssessment = async (
    questions: Question[],
    selectedProficiency: string | null,
    selectedSkill: any | null,
    submitAssessment: (questions: Question[]) => Promise<any>
  ) => {
    await submitAssessment(questions);
  };

  const handleRetryAssessment = (
    setAssessmentScore: (score: number | null) => void,
    setCurrentQuestionIndex: (index: number) => void,
    setCurrentFeedback: (feedback: any | undefined) => void,
    setActiveTab: (tab: string) => void,
    resetAssessment: () => void
  ) => {
    setAssessmentScore(null);
    setCurrentQuestionIndex(0);
    setCurrentFeedback(undefined);
    setActiveTab("assessment");
    resetAssessment();
  };

  return {
    handleSubmitAnswer,
    handleRetryGenerateQuestions,
    handleSubmitAssessment,
    handleRetryAssessment
  };
}
