
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from '../types';

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ 
  question, 
  onAnswerChange 
}) => {
  return (
    <RadioGroup
      value={question.userAnswer as string}
      onValueChange={onAnswerChange}
      className="space-y-3"
    >
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={`option-${index}`} />
          <Label htmlFor={`option-${index}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default MultipleChoiceQuestion;
