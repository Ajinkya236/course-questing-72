
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import AssessmentSidebar from '@/components/skills/assessment/AssessmentSidebar';
import AssessmentLayout from '@/components/skills/assessment/AssessmentLayout';
import AssessmentTabs from '@/components/skills/assessment/AssessmentTabs';
import AdaptiveModeToggle from '@/components/skills/assessment/AdaptiveModeToggle';
import GenerationFailedView from '@/components/skills/assessment/GenerationFailedView';
import { useAssessmentState } from '@/hooks/assessment/useAssessmentState';
import { PASS_RATE } from '@/hooks/assessment';

const SkillAssessment: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const [targetProficiency, setTargetProficiency] = useState<string | undefined>(undefined);
  
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

  // Determine target proficiency based on role requirements
  useEffect(() => {
    if (selectedSkill) {
      // This would typically come from a user's role requirements
      // For now, let's simulate a target proficiency one level higher
      const proficiencyLevels = ["Awareness", "Knowledge", "Skill", "Mastery"];
      const currentIndex = proficiencyLevels.indexOf(selectedSkill.proficiency);
      
      if (currentIndex < proficiencyLevels.length - 1) {
        setTargetProficiency(proficiencyLevels[currentIndex + 1]);
      } else {
        setTargetProficiency(undefined); // Already at highest level
      }
    }
  }, [selectedSkill]);

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
        targetProficiency={targetProficiency}
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
