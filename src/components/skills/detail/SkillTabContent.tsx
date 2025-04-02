
import React from 'react';
import { ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import ChatInterface from '@/components/skills/ChatInterface';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';

interface SkillTabContentProps {
  activeTab: string;
  skillName: string;
  skillDescription: string;
  skillId: number;
  proficiency: string;
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setActiveTab: (tab: string) => void;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
  showToolsOnly?: boolean;
}

const SkillTabContent: React.FC<SkillTabContentProps> = ({
  activeTab,
  skillName,
  skillDescription,
  skillId,
  proficiency,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  setActiveTab,
  isGeneratingPodcast,
  setIsGeneratingPodcast,
  showToolsOnly = false
}) => {
  if (activeTab === "learning" && showToolsOnly) {
    return (
      <div className="space-y-6">
        <LearningTools 
          skillName={skillName}
          skillDescription={skillDescription}
          selectedProficiency={proficiency}
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
          skillName={skillName}
          skillDescription={skillDescription}
          proficiency={proficiency}
        />
      </div>
    );
  }
  
  if (activeTab === "chat") {
    return (
      <ChatInterface 
        skillName={skillName}
        skillDescription={skillDescription}
        selectedProficiency={proficiency}
        sources={sources}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    );
  }
  
  return null;
};

export default SkillTabContent;
