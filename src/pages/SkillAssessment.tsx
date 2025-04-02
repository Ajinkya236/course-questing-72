
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { proficiencyColors } from '@/data/skillsData';
import { useAssessment } from '@/hooks/useAssessment';
import AssessmentSidebar from '@/components/skills/assessment/AssessmentSidebar';
import AssessmentLayout from '@/components/skills/assessment/AssessmentLayout';
import AssessmentTabs from '@/components/skills/assessment/AssessmentTabs';
import { Question, QuestionFeedback } from '@/components/skills/assessment/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SkillAssessment: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("assessment");
  const [selectedProficiency, setSelectedProficiency] = useState<string | null>(null);
  const [adaptiveMode, setAdaptiveMode] = useState<boolean>(true);
  const [currentFeedback, setCurrentFeedback] = useState<QuestionFeedback | undefined>(undefined);
  const { toast } = useToast();
  
  const {
    questions,
    setQuestions,
    isLoading,
    isSubmitting,
    selectedSkill,
    assessmentScore,
    setAssessmentScore,
    previousAttempts,
    showBadgeModal,
    latestBadge,
    closeBadgeModal,
    PASS_RATE,
    submitAssessment,
    submitAnswer,
    resetAssessment,
    generateQuestionsForSkill,
    adjustDifficulty,
    currentDifficulty,
    correctAnswersCount,
    totalAnswered,
    generationFailed,
    detailedFeedback
  } = useAssessment(skillId);

  useEffect(() => {
    if (!skillId) {
      navigate('/skills');
      return;
    }
    
    // This will trigger the useAssessment hook to load data
  }, [skillId, navigate]);

  // Add retry functionality for assessment generation
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

  const toggleAdaptiveMode = () => {
    setAdaptiveMode(!adaptiveMode);
    setCurrentFeedback(undefined);
    
    toast({
      title: `${!adaptiveMode ? 'Adaptive' : 'Standard'} Assessment Mode Enabled`,
      description: !adaptiveMode 
        ? "Questions will now adapt to your performance level." 
        : "All questions will be presented at a standard difficulty level.",
    });
  };

  if (!selectedSkill && !isLoading) {
    return <div className="container mx-auto px-4 py-8">Skill not found</div>;
  }

  // Proficiency options
  const proficiencyOptions = ["Awareness", "Knowledge", "Skill", "Mastery"];

  return (
    <PageLayout>
      <AssessmentLayout
        handleBack={handleBack}
        skillName={selectedSkill?.name}
        proficiency={selectedProficiency || selectedSkill?.proficiency}
        proficiencyOptions={proficiencyOptions}
        onProficiencyChange={handleProficiencyChange}
        showBadgeModal={showBadgeModal}
        closeBadgeModal={closeBadgeModal}
        latestBadge={latestBadge}
        sidebarContent={
          selectedSkill && (
            <AssessmentSidebar 
              skillName={selectedSkill.name} 
              passRate={PASS_RATE} 
            />
          )
        }
      >
        <div className="mb-4 flex items-center justify-end space-x-2">
          <Switch 
            id="adaptive-mode" 
            checked={adaptiveMode}
            onCheckedChange={toggleAdaptiveMode}
            disabled={isLoading || assessmentScore !== null || questions.length === 0}
          />
          <Label htmlFor="adaptive-mode">Adaptive Assessment</Label>
        </div>
        
        {generationFailed ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <h3 className="text-lg font-medium">Failed to generate assessment</h3>
            <p className="text-center text-muted-foreground">
              We couldn't generate an assessment for this skill. Please try again later.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleBack}>
                Go Back
              </Button>
              <Button onClick={handleRetryGenerateQuestions}>
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <AssessmentTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            adaptiveMode={adaptiveMode}
            assessmentScore={assessmentScore}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            questionFeedback={currentFeedback}
            handleAnswer={handleAnswer}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            handleSubmitAnswer={adaptiveMode ? handleSubmitAnswer : undefined}
            handleRetryAssessment={handleRetryAssessment}
            handleBack={handleBack}
            previousAttempts={previousAttempts}
            passRate={PASS_RATE}
            onRetryGenerate={handleRetryGenerateQuestions}
            difficultyLevel={currentDifficulty}
          />
        )}
      </AssessmentLayout>
    </PageLayout>
  );
};

export default SkillAssessment;
