
import React from 'react';
import { Question } from '../types';
import { Textarea } from "@/components/ui/textarea";

interface ShortAnswerQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ 
  question, 
  onAnswerChange,
  disabled = false
}) => {
  return (
    <Textarea
      value={(question.userAnswer as string) || ''}
      onChange={(e) => onAnswerChange(e.target.value)}
      placeholder="Write your answer here..."
      className="min-h-[100px]"
      disabled={disabled}
    />
  );
};

export default ShortAnswerQuestion;
