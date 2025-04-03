
import React from 'react';
import { Button } from "@/components/ui/button";

interface PodcastErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const PodcastError: React.FC<PodcastErrorProps> = ({ errorMessage, onRetry }) => {
  return (
    <div>
      <p className="text-destructive">{errorMessage}</p>
      <Button onClick={onRetry} className="mt-4">Try Again</Button>
    </div>
  );
};

export default PodcastError;
