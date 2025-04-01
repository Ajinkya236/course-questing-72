
import React from 'react';
import { Brain } from 'lucide-react';

interface EmptySkillsStateProps {
  message?: string;
}

const EmptySkillsState: React.FC<EmptySkillsStateProps> = ({ 
  message = "No skills found" 
}) => {
  return (
    <div className="text-center py-12">
      <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">{message}</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or browse the full catalog.
      </p>
    </div>
  );
};

export default EmptySkillsState;
