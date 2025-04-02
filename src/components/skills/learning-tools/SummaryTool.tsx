
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileTextIcon } from 'lucide-react';

interface SummaryToolProps {
  onClick: () => void;
  disabled: boolean;
}

const SummaryTool: React.FC<SummaryToolProps> = ({ onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-auto py-3 flex flex-col items-center text-center"
    >
      <FileTextIcon className="h-4 w-4 mb-1" />
      <span>Summary</span>
    </Button>
  );
};

export default SummaryTool;
