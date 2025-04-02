
import React from 'react';
import { Button } from "@/components/ui/button";

interface GenerationFailedViewProps {
  handleBack: () => void;
  handleRetryGenerate: () => void;
}

const GenerationFailedView: React.FC<GenerationFailedViewProps> = ({
  handleBack,
  handleRetryGenerate
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <h3 className="text-lg font-medium">Failed to generate assessment</h3>
      <p className="text-center text-muted-foreground">
        We couldn't generate an assessment for this skill. Please try again later.
      </p>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={handleBack}>
          Go Back
        </Button>
        <Button onClick={handleRetryGenerate}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default GenerationFailedView;
