
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';
import { Source } from '@/components/skills/knowledge/types';
import { ChatMessage } from '@/components/skills/ChatInterface';
import { useToolGeneration } from './hooks/useToolGeneration';
import LearningToolsGrid from './LearningToolsGrid';

interface LearningToolsProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency?: string;
  sources?: Source[];
  setChatMessages?: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  onGeneratePodcast?: () => void;
  hidePodcastButton?: boolean;
  skillId?: number;
  proficiency?: string;
}

const LearningTools: React.FC<LearningToolsProps> = ({ 
  skillName,
  skillDescription,
  selectedProficiency,
  proficiency,
  sources = [],
  setChatMessages,
  isLoading = false,
  setIsLoading = () => {},
  onGeneratePodcast = () => {},
  hidePodcastButton = false,
  skillId
}) => {
  // Use proficiency if provided, otherwise use selectedProficiency
  const effectiveProficiency = proficiency || selectedProficiency || '';
  
  const { handleToolGeneration, isBusy, apiCallFailed } = useToolGeneration(
    skillName,
    skillDescription,
    effectiveProficiency,
    sources,
    setChatMessages || (() => {}),
    setIsLoading
  );

  const combinedBusyState = isLoading || isBusy;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Learning Tools
        </CardTitle>
        <CardDescription>
          Generate learning resources for {skillName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LearningToolsGrid
          skillName={skillName}
          skillDescription={skillDescription}
          selectedProficiency={effectiveProficiency}
          isBusy={combinedBusyState}
          onToolClick={handleToolGeneration}
          onGeneratePodcast={onGeneratePodcast}
          hidePodcastButton={hidePodcastButton}
        />
      </CardContent>
    </Card>
  );
};

export default LearningTools;
