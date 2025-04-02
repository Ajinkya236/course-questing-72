
import React from 'react';
import { Question } from '../types';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TrueFalseQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ 
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
      <div className="flex items-center space-x-2">
        <RadioGroupItem 
          value="True" 
          id={`true-${question.id}`} 
          disabled={disabled}
        />
        <Label 
          htmlFor={`true-${question.id}`}
          className={disabled ? "opacity-70" : ""}
        >
          True
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem 
          value="False" 
          id={`false-${question.id}`} 
          disabled={disabled}
        />
        <Label 
          htmlFor={`false-${question.id}`}
          className={disabled ? "opacity-70" : ""}
        >
          False
        </Label>
      </div>
    </RadioGroup>
  );
};

export default TrueFalseQuestion;
