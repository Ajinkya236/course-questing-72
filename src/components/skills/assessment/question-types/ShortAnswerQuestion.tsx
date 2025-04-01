
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Question } from '../types';

interface ShortAnswerQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ 
  question, 
  onAnswerChange 
}) => {
  return (
    <Textarea
      placeholder="Type your answer here..."
      className="min-h-[120px]"
      value={question.userAnswer as string || ''}
      onChange={(e) => onAnswerChange(e.target.value)}
    />
  );
};

export default ShortAnswerQuestion;
