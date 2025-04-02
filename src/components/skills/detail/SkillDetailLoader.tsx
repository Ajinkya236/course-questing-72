
import React from 'react';
import { Spinner } from "@/components/ui/spinner";

const SkillDetailLoader: React.FC = () => {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-muted-foreground">Loading skill details...</p>
      </div>
    </div>
  );
};

export default SkillDetailLoader;
