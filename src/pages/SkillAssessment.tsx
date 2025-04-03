
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import AssessmentSidebar from '@/components/skills/assessment/AssessmentSidebar';
import AssessmentLayout from '@/components/skills/assessment/AssessmentLayout';
import AssessmentTabs from '@/components/skills/assessment/AssessmentTabs';
import AdaptiveModeToggle from '@/components/skills/assessment/AdaptiveModeToggle';
import GenerationFailedView from '@/components/skills/assessment/GenerationFailedView';
import { useAssessmentState } from '@/hooks/assessment/useAssessmentState';
import { PASS_RATE } from '@/hooks/assessment';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';

// Mapping of proficiency levels to progress percentages
const proficiencyProgress = {
  "Awareness": 25,
  "Knowledge": 50,
  "Skill": 75,
  "Mastery": 100
};

const SkillAssessment: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const {
    // Assessment state
    questions,
    isLoading,
    isSubmitting,
    selectedSkill,
    assessmentScore,
    previousAttempts,
    showBadgeModal,
    latestBadge,
    closeBadgeModal,
    generationFailed,
    currentDifficulty,
    
    // Assessment state from local hook
    currentQuestionIndex,
    activeTab,
    setActiveTab,
    selectedProficiency,
    adaptiveMode,
    setAdaptiveMode,
    currentFeedback,
    
    // Assessment handlers
    handleRetryGenerateQuestions,
    handleProficiencyChange,
    handleBack,
    handleAnswer,
    handleSubmitAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
    handleRetryAssessment
  } = useAssessmentState(skillId);

  // Generate questions using our own edge function
  useEffect(() => {
    const generateCustomQuestions = async () => {
      if (selectedSkill && questions.length === 0 && !isLoading && !generationFailed) {
        try {
          // Call our custom edge function to generate questions
          const { data, error } = await supabase.functions.invoke('generate-assessment', {
            body: {
              skillName: selectedSkill.name,
              proficiency: selectedProficiency || selectedSkill.proficiency
            },
          });
          
          if (error) {
            console.error("Error generating questions:", error);
            throw new Error(error.message);
          }
          
          if (data && data.questions && Array.isArray(data.questions)) {
            // TODO: Store questions in assessment state
            console.log("Successfully generated questions:", data.questions);
          }
        } catch (error) {
          console.error("Failed to generate assessment:", error);
        }
      }
    };
    
    // Uncomment this to use our custom generator instead of the built-in one
    // generateCustomQuestions();
  }, [selectedSkill, selectedProficiency, questions.length, isLoading, generationFailed]);

  if (!selectedSkill && !isLoading) {
    return <div className="container mx-auto px-4 py-8">Skill not found</div>;
  }

  // Get progress value based on current proficiency
  const progressValue = proficiencyProgress[selectedProficiency || selectedSkill?.proficiency] || 0;

  return (
    <PageLayout>
      <AssessmentLayout
        handleBack={handleBack}
        skillName={selectedSkill?.name}
        proficiency={selectedProficiency || selectedSkill?.proficiency}
        proficiencyOptions={["Awareness", "Knowledge", "Skill", "Mastery"]}
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
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Current Proficiency:</span>
                <Badge variant="outline" className="font-semibold">
                  {selectedProficiency || selectedSkill?.proficiency}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Awareness</span>
                <span>Knowledge</span>
                <span>Skill</span>
                <span>Mastery</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          </CardContent>
        </Card>
      
        <AdaptiveModeToggle
          adaptiveMode={adaptiveMode}
          setAdaptiveMode={setAdaptiveMode}
          disabled={isLoading || assessmentScore !== null || questions.length === 0}
        />
        
        {generationFailed ? (
          <GenerationFailedView 
            handleBack={handleBack}
            handleRetryGenerate={handleRetryGenerateQuestions}
          />
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
