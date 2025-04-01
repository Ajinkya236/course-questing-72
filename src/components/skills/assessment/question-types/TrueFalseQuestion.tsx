
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from '../types';

interface TrueFalseQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ 
  question, 
  onAnswerChange 
}) => {
  return (
    <RadioGroup
      value={question.userAnswer as string}
      onValueChange={onAnswerChange}
      className="space-y-3"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="True" id="true" />
        <Label htmlFor="true">True</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="False" id="false" />
        <Label htmlFor="false">False</Label>
      </div>
    </RadioGroup>
  );
};

export default TrueFalseQuestion;
