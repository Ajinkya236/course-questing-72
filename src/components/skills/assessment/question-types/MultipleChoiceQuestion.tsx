
import React from 'react';
import { Question } from '../types';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ 
  question, 
  onAnswerChange,
  disabled = false
}) => {
  return (
    <RadioGroup 
      value={question.userAnswer as string} 
      onValueChange={onAnswerChange}
      className="space-y-3"
    >
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem 
            value={option} 
            id={`option-${question.id}-${index}`} 
            disabled={disabled}
          />
          <Label 
            htmlFor={`option-${question.id}-${index}`}
            className={disabled ? "opacity-70" : ""}
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default MultipleChoiceQuestion;
