
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skill } from './types';

interface ProficiencyOption {
  label: string;
  value: string;
  color: string;
}

const proficiencyOptions: ProficiencyOption[] = [
  { label: 'Beginner', value: 'beginner', color: 'bg-blue-500' },
  { label: 'Intermediate', value: 'intermediate', color: 'bg-green-500' },
  { label: 'Advanced', value: 'advanced', color: 'bg-purple-500' },
  { label: 'Expert', value: 'expert', color: 'bg-red-500' }
];

// Define a mapping for user-level proficiencies
const proficiencyColors: Record<string, string> = {
  beginner: 'bg-blue-500',
  intermediate: 'bg-green-500',
  advanced: 'bg-purple-500',
  expert: 'bg-red-500'
};

interface SkillHeaderProps {
  skill: Skill;
  proficiency: string;
  onProficiencyChange: (proficiency: string) => void;
  onBack: () => void;
}

const SkillHeader: React.FC<SkillHeaderProps> = ({ 
  skill, 
  proficiency,
  onProficiencyChange,
  onBack 
}) => {
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-4 flex items-center gap-1"
        size="sm"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Skills
      </Button>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{skill.name}</h1>
          <p className="text-muted-foreground">{skill.description}</p>
        </div>
        
        <Badge 
          className={`${proficiencyColors[proficiency] || 'bg-blue-500'} px-3 py-1 text-white`}
        >
          {proficiency}
        </Badge>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Set your proficiency level:</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {proficiencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onProficiencyChange(option.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all
                  ${proficiency === option.value ? 
                    'ring-2 ring-primary ring-offset-2' : 'opacity-80 hover:opacity-100'}
                  ${option.color} text-white`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillHeader;
