
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { proficiencyColors } from '@/data/skillsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAssessment } from '@/hooks/useAssessment';
import AssessmentQuestion from '@/components/skills/assessment/AssessmentQuestion';
import AssessmentResults from '@/components/skills/assessment/AssessmentResults';
import AssessmentHistory from '@/components/skills/assessment/AssessmentHistory';
import AssessmentSidebar from '@/components/skills/assessment/AssessmentSidebar';
import BadgeAwardModal from '@/components/skills/assessment/BadgeAwardModal';
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

  const renderQuestion = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Generating assessment questions...</p>
        </div>
      );
    }

    if (assessmentScore !== null) {
      return (
        <AssessmentResults
          score={assessmentScore}
          passRate={PASS_RATE}
          questions={questions}
          onRetry={handleRetryAssessment}
          onBack={handleBack}
        />
      );
    }

    if (questions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <p>No questions available. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reload
          </Button>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex] as Question;

    return (
      <div>
        <Progress value={(currentQuestionIndex + 1) * 100 / questions.length} className="h-2 mb-6" />
        
        <AssessmentQuestion
          question={currentQuestion}
          onAnswerChange={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={!currentQuestion.userAnswer && currentQuestion.type !== 'shortAnswer'}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-4 flex items-center gap-1"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Skill
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-archivo-black text-gray-700">
                  {selectedSkill && (
                    <>
                      <span>{selectedSkill.name} Assessment</span>
                      {selectedSkill.proficiency && (
                        <span className={`ml-3 text-xs px-3 py-1 rounded-full ${proficiencyColors[selectedSkill.proficiency as keyof typeof proficiencyColors]}`}>
                          {selectedSkill.proficiency}
                        </span>
                      )}
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="assessment">Assessment</TabsTrigger>
                    <TabsTrigger value="history">Attempt History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="assessment" className="mt-4">
                    {renderQuestion()}
                  </TabsContent>
                  <TabsContent value="history" className="mt-4">
                    <AssessmentHistory 
                      attempts={previousAttempts}
                      passRate={PASS_RATE}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Assessment Info */}
            {selectedSkill && (
              <AssessmentSidebar 
                skillName={selectedSkill.name} 
                passRate={PASS_RATE} 
              />
            )}
          </div>
        </div>
        
        {/* Badge Award Modal */}
        <BadgeAwardModal 
          isOpen={showBadgeModal} 
          onClose={closeBadgeModal} 
          badge={latestBadge} 
        />
      </div>
    </PageLayout>
  );
};

export default SkillAssessment;
