
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic } from 'lucide-react';

interface PodcastToolProps {
  onClick: () => void;
  disabled: boolean;
  hidden?: boolean;
}

const PodcastTool: React.FC<PodcastToolProps> = ({ onClick, disabled, hidden = false }) => {
  if (hidden) return null;
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-auto py-3 flex flex-col items-center text-center"
    >
      <Mic className="h-4 w-4 mb-1" />
      <span>Podcast</span>
    </Button>
  );
};

export default PodcastTool;
