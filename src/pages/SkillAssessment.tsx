
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
    resetAssessment
  } = useAssessment(skillId);

  useEffect(() => {
    if (!skillId) {
      navigate('/skills');
      return;
    }
    
    // This will trigger the useAssessment hook to load data
  }, [skillId, navigate]);

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
    await submitAssessment(questions);
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

  return (
    <PageLayout>
      <AssessmentLayout
        handleBack={handleBack}
        skillName={selectedSkill?.name}
        proficiency={selectedSkill?.proficiency}
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
