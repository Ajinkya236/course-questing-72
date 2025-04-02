
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollText } from 'lucide-react';

interface QuizToolProps {
  onClick: () => void;
  disabled: boolean;
}

const QuizTool: React.FC<QuizToolProps> = ({ onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-auto py-3 flex flex-col items-center text-center"
    >
      <ScrollText className="h-4 w-4 mb-1" />
      <span>Quiz</span>
    </Button>
  );
};

export default QuizTool;
