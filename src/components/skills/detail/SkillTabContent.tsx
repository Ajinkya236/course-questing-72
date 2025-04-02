
import React from 'react';
import { ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import ChatInterface from '@/components/skills/ChatInterface';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import { Source } from '@/components/skills/knowledge/types';

interface SkillTabContentProps {
  activeTab?: string;  // Made optional
  skillName?: string;  // Made optional
  skillDescription?: string;  // Made optional
  skillId?: number;  // Made optional
  proficiency?: string;  // Made optional
  sources: string[] | Source[];
  setSources: React.Dispatch<React.SetStateAction<string[] | Source[]>>;
  chatMessages?: ChatMessage[];  // Made optional
  setChatMessages?: React.Dispatch<React.SetStateAction<ChatMessage[]>>;  // Made optional
  setActiveTab?: (tab: string) => void;  // Made optional
  isGeneratingPodcast?: boolean;  // Made optional
  setIsGeneratingPodcast?: React.Dispatch<React.SetStateAction<boolean>>;  // Made optional
  showToolsOnly?: boolean;
  skill?: any;  // Added skill prop
  children?: React.ReactNode;  // Added children prop
}

const SkillTabContent: React.FC<SkillTabContentProps> = ({
  activeTab = "learning",  // Default value
  skillName = "",  // Default value
  skillDescription = "",  // Default value
  skillId = 0,  // Default value
  proficiency = "",  // Default value
  sources,
  setSources,
  chatMessages = [],  // Default value
  setChatMessages = () => {},  // Default value
  setActiveTab = () => {},  // Default value
  isGeneratingPodcast = false,  // Default value
  setIsGeneratingPodcast = () => {},  // Default value
  showToolsOnly = false,
  skill,
  children
}) => {
  // Use skill object properties if individual props not provided
  const displayName = skillName || (skill?.name || "");
  const displayDescription = skillDescription || (skill?.description || "");
  const displayProficiency = proficiency || (skill?.proficiency || "");

  if (activeTab === "learning" && showToolsOnly) {
    return (
      <div className="space-y-6">
        <LearningTools 
          skillName={displayName}
          skillDescription={displayDescription}
          selectedProficiency={displayProficiency}
          sources={sources}
          setChatMessages={setChatMessages}
          isLoading={isGeneratingPodcast}
          setIsLoading={setIsGeneratingPodcast}
        />
        <KnowledgeSources 
          sources={sources}
          setSources={setSources}
          onSubmit={() => {}}
          minimal={true}
        />
        <PodcastPlayer 
          skillName={displayName}
          skillDescription={displayDescription}
          proficiency={displayProficiency}
        />
        {children}
      </div>
    );
  }
  
  if (activeTab === "chat") {
    return (
      <ChatInterface 
        skillName={displayName}
        skillDescription={displayDescription}
        selectedProficiency={displayProficiency}
        sources={sources}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    );
  }
  
  // Default case - render children or null
  return children || null;
};

export default SkillTabContent;
