
import React from 'react';
import { Button } from "@/components/ui/button";
import { SquareDashed } from 'lucide-react';

interface ExamplesToolProps {
  onClick: () => void;
  disabled: boolean;
}

const ExamplesTool: React.FC<ExamplesToolProps> = ({ onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-auto py-3 flex flex-col items-center text-center"
    >
      <SquareDashed className="h-4 w-4 mb-1" />
      <span>Examples</span>
    </Button>
  );
};

export default ExamplesTool;
