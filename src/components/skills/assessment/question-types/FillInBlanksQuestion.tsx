
import React from 'react';
import { Input } from "@/components/ui/input";
import { Question } from '../types';

interface FillInBlanksQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
}

const FillInBlanksQuestion: React.FC<FillInBlanksQuestionProps> = ({ 
  question, 
  onAnswerChange 
}) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm mb-2">Fill in the blank:</p>
      <Input
        type="text"
        placeholder="Your answer here..."
        value={question.userAnswer as string || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};

export default FillInBlanksQuestion;
