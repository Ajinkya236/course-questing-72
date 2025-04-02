
import React, { useState } from 'react';
import { Question, QuestionFeedback } from './types';
import {
  QuestionHeader,
  QuestionHints,
  QuestionFeedbackCard,
  SubmitAnswerButton,
  QuestionRenderer
} from './question-components';

interface AssessmentQuestionProps {
  question: Question;
  onAnswerChange: (answer: string | string[]) => void;
  questionNumber: number;
  totalQuestions: number;
  isSubmitting?: boolean;
  feedback?: QuestionFeedback;
  onSubmitAnswer?: () => void;
  showSubmitButton?: boolean;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  onAnswerChange,
  questionNumber,
  totalQuestions,
  isSubmitting = false,
  feedback,
  onSubmitAnswer,
  showSubmitButton = false
}) => {
  const [showHint, setShowHint] = useState(false);
  const hasHints = question.hints && question.hints.length > 0;
  
  return (
    <div>
      <QuestionHeader 
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        questionType={question.type}
        difficulty={question.difficulty}
        hasHints={hasHints}
        showHint={showHint}
        setShowHint={setShowHint}
      />
      
      <QuestionHints 
        hints={question.hints || []}
        showHint={showHint}
      />
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">{question.text}</h3>
        
        <QuestionRenderer 
          question={question}
          onAnswerChange={onAnswerChange}
          isSubmitting={isSubmitting}
          hasFeedback={!!feedback}
        />
        
        {feedback && <QuestionFeedbackCard feedback={feedback} />}
        
        <SubmitAnswerButton 
          question={question}
          isSubmitting={isSubmitting}
          feedback={feedback}
          onSubmitAnswer={onSubmitAnswer}
          showSubmitButton={showSubmitButton}
        />
      </div>
    </div>
  );
};

export default AssessmentQuestion;
