
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { proficiencyColors } from '@/data/skillsData';
import { useAssessment } from '@/hooks/useAssessment';
import AssessmentSidebar from '@/components/skills/assessment/AssessmentSidebar';
import AssessmentLayout from '@/components/skills/assessment/AssessmentLayout';
import AssessmentTabs from '@/components/skills/assessment/AssessmentTabs';
import { Question } from '@/components/skills/assessment/types';

const SkillAssessment: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("assessment");
  const [customProficiency, setCustomProficiency] = useState<string | null>(null);
  
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
    resetAssessment,
    generateQuestionsForSkill
  } = useAssessment(skillId);

  useEffect(() => {
    if (!skillId) {
      navigate('/skills');
      return;
    }
    
    // This will trigger the useAssessment hook to load data
  }, [skillId, navigate]);

  // Handle proficiency change
  const handleProficiencyChange = (newProficiency: string) => {
    if (selectedSkill) {
      setCustomProficiency(newProficiency);
      
      // Create a modified skill object with the new proficiency
      const updatedSkill = {
        ...selectedSkill,
        proficiency: newProficiency
      };
      
      // Reset assessment state
      setAssessmentScore(null);
      setCurrentQuestionIndex(0);
      
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question, submit assessment
      handleSubmitAssessment();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    // If we're using custom proficiency, update the skill object
    const skillToSubmit = customProficiency && selectedSkill 
      ? { ...selectedSkill, proficiency: customProficiency }
      : selectedSkill;
      
    await submitAssessment(questions, skillToSubmit);
  };

  const handleRetryAssessment = () => {
    setAssessmentScore(null);
    setCurrentQuestionIndex(0);
    setActiveTab("assessment");
    resetAssessment();
  };

  if (!selectedSkill && !isLoading) {
    return <div className="container mx-auto px-4 py-8">Skill not found</div>;
  }

  // Use customProficiency if set, otherwise use the selected skill's proficiency
  const displayProficiency = customProficiency || selectedSkill?.proficiency;

  return (
    <PageLayout>
      <AssessmentLayout
        handleBack={handleBack}
        skillName={selectedSkill?.name}
        proficiency={displayProficiency}
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
        <AssessmentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoading={isLoading}
          assessmentScore={assessmentScore}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
          handlePreviousQuestion={handlePreviousQuestion}
          handleRetryAssessment={handleRetryAssessment}
          handleBack={handleBack}
          previousAttempts={previousAttempts}
          passRate={PASS_RATE}
        />
      </AssessmentLayout>
    </PageLayout>
  );
};

export default SkillAssessment;
