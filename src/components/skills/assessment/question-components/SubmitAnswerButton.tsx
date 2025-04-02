
import React from 'react';
import { Button } from "@/components/ui/button";
import { Question, QuestionFeedback } from '../types';

interface SubmitAnswerButtonProps {
  question: Question;
  isSubmitting: boolean;
  feedback?: QuestionFeedback;
  onSubmitAnswer?: () => void;
  showSubmitButton: boolean;
}

const SubmitAnswerButton: React.FC<SubmitAnswerButtonProps> = ({
  question,
  isSubmitting,
  feedback,
  onSubmitAnswer,
  showSubmitButton
}) => {
  if (!showSubmitButton) return null;
  
  return (
    <div className="mt-4">
      <Button 
        onClick={onSubmitAnswer} 
        disabled={isSubmitting || !question.userAnswer || !!feedback}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">⟳</span>
            Evaluating...
          </>
        ) : feedback ? "Answered" : "Submit Answer"}
      </Button>
    </div>
  );
};

export default SubmitAnswerButton;
