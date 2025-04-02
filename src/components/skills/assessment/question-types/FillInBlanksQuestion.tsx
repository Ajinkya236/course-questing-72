
import React from 'react';
import { Question } from '../types';
import { Input } from "@/components/ui/input";

interface FillInBlanksQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean;
}

const FillInBlanksQuestion: React.FC<FillInBlanksQuestionProps> = ({ 
  question, 
  onAnswerChange,
  disabled = false
}) => {
  return (
    <Input
      type="text"
      value={(question.userAnswer as string) || ''}
      onChange={(e) => onAnswerChange(e.target.value)}
      placeholder="Fill in the blank..."
      disabled={disabled}
    />
  );
};

export default FillInBlanksQuestion;
