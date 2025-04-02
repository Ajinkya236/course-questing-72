
import React from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { QuestionTypeLabel } from '../question-types';
import { QuestionType } from '../types';

interface QuestionHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  questionType?: QuestionType;
  difficulty?: string;
  hasHints: boolean;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  questionNumber,
  totalQuestions,
  questionType,
  difficulty,
  hasHints,
  showHint,
  setShowHint
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Question {questionNumber} of {totalQuestions}</span>
        <div className="flex gap-2 items-center">
          {hasHints && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowHint(!showHint)} 
              className="flex items-center gap-1"
            >
              <HelpCircle className="h-4 w-4" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
          )}
          {questionType && <QuestionTypeLabel type={questionType} />}
          {difficulty && (
            <span className={`text-xs px-2 py-1 rounded ${
              difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionHeader;
