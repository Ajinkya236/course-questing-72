
import React from 'react';

interface PodcastEmptyProps {
  skillName: string;
  proficiency: string;
}

const PodcastEmpty: React.FC<PodcastEmptyProps> = ({ skillName, proficiency }) => {
  return (
    <div>
      <p>Generate a learning podcast to help you master {skillName}.</p>
      <p className="text-sm text-muted-foreground mt-2">
        The podcast will feature a conversation between hosts discussing 
        key concepts and practical applications at the {proficiency} level.
      </p>
    </div>
  );
};

export default PodcastEmpty;
