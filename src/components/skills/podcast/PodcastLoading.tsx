
import React from 'react';
import { Loader2 } from 'lucide-react';

const PodcastLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p>Creating your personalized learning podcast...</p>
      <p className="text-sm text-muted-foreground">This may take a minute or two</p>
    </div>
  );
};

export default PodcastLoading;
