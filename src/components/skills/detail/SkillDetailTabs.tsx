
import React from 'react';
import { ChatMessage } from '@/components/skills/ChatInterface';
import SkillTabContent from './SkillTabContent';

interface SkillDetailTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  skill: any;
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
}

const SkillDetailTabs: React.FC<SkillDetailTabsProps> = ({
  skill,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  isGeneratingPodcast,
  setIsGeneratingPodcast
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left area (2/3): Chat Interface */}
      <div className="col-span-1 md:col-span-2">
        <SkillTabContent
          activeTab="chat"
          skillName={skill.name}
          skillDescription={skill.description || ""}
          skillId={skill.id}
          proficiency={skill.proficiency}
          sources={sources}
          setSources={setSources}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          setActiveTab={() => {}}
          isGeneratingPodcast={isGeneratingPodcast}
          setIsGeneratingPodcast={setIsGeneratingPodcast}
        />
      </div>
      
      {/* Right area (1/3): Learning Tools */}
      <div className="col-span-1">
        <SkillTabContent
          activeTab="learning"
          skillName={skill.name}
          skillDescription={skill.description || ""}
          skillId={skill.id}
          proficiency={skill.proficiency}
          sources={sources}
          setSources={setSources}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          setActiveTab={() => {}}
          isGeneratingPodcast={isGeneratingPodcast}
          setIsGeneratingPodcast={setIsGeneratingPodcast}
          showToolsOnly={true}
        />
      </div>
    </div>
  );
};

export default SkillDetailTabs;
