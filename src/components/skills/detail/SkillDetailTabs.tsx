
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatTab from './ChatTab';
import { ChatMessage } from '@/components/skills/ChatInterface';
import { Source } from '@/components/skills/knowledge/types';

interface SkillDetailTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  skill: any;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
}

const SkillDetailTabs: React.FC<SkillDetailTabsProps> = ({
  activeTab,
  setActiveTab,
  skill,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  isGeneratingPodcast,
  setIsGeneratingPodcast
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-1 w-full max-w-md mb-4">
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      
      <TabsContent value="chat">
        <ChatTab 
          skill={skill}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          sources={sources}
          setSources={setSources}
          isGeneratingPodcast={isGeneratingPodcast}
          setIsGeneratingPodcast={setIsGeneratingPodcast}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SkillDetailTabs;
