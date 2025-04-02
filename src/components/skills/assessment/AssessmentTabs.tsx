
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Question } from '@/components/skills/assessment/types';
import AssessmentQuestion from '@/components/skills/assessment/AssessmentQuestion';
import AssessmentResults from '@/components/skills/assessment/AssessmentResults';
import AssessmentHistory from '@/components/skills/assessment/AssessmentHistory';
import { Button } from "@/components/ui/button";

interface AssessmentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
  assessmentScore: number | null;
  questions: Question[];
  currentQuestionIndex: number;
  totalQuestions: number;
  handleAnswer: (answer: string | string[]) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  handleRetryAssessment: () => void;
  handleBack: () => void;
  previousAttempts: any[];
  passRate: number;
  onRetryGenerate?: () => void; // Add the missing prop
}

const AssessmentTabs: React.FC<AssessmentTabsProps> = ({
  activeTab,
  setActiveTab,
  isLoading,
  assessmentScore,
  questions,
  currentQuestionIndex,
  totalQuestions,
  handleAnswer,
  handleNextQuestion,
  handlePreviousQuestion,
  handleRetryAssessment,
  handleBack,
  previousAttempts,
  passRate,
  onRetryGenerate
}) => {
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
          passRate={passRate}
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
        <Progress value={(currentQuestionIndex + 1) * 100 / totalQuestions} className="h-2 mb-6" />
        
        <AssessmentQuestion
          question={currentQuestion}
          onAnswerChange={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
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
            {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    );
  };

  return (
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
          passRate={passRate}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AssessmentTabs;
