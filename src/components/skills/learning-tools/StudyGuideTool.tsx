
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pen } from 'lucide-react';

interface StudyGuideToolProps {
  onClick: () => void;
  disabled: boolean;
}

const StudyGuideTool: React.FC<StudyGuideToolProps> = ({ onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-auto py-3 flex flex-col items-center text-center"
    >
      <Pen className="h-4 w-4 mb-1" />
      <span>Study Guide</span>
    </Button>
  );
};

export default StudyGuideTool;
