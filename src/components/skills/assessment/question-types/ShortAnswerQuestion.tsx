
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
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">Please provide a short answer to the question:</p>
      <Textarea
        placeholder="Type your answer here..."
        className="min-h-[120px] focus:border-primary"
        value={question.userAnswer as string || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
};

export default ShortAnswerQuestion;
