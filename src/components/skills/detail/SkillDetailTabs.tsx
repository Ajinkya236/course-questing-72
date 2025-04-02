
import React from 'react';
import { BookOpen, MessageSquare, Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="learning" className="flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline-block">Learning</span>
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline-block">Chat</span>
        </TabsTrigger>
        <TabsTrigger value="assessment" className="flex items-center">
          <Trophy className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline-block">Assessment</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="learning" className="rounded-md mt-4">
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
          setActiveTab={setActiveTab}
          isGeneratingPodcast={isGeneratingPodcast}
          setIsGeneratingPodcast={setIsGeneratingPodcast}
        />
      </TabsContent>
      
      <TabsContent value="chat" className="mt-4">
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
          setActiveTab={setActiveTab}
          isGeneratingPodcast={isGeneratingPodcast}
          setIsGeneratingPodcast={setIsGeneratingPodcast}
        />
      </TabsContent>
      
      <TabsContent value="assessment" className="mt-4">
        <SkillTabContent
          activeTab="assessment"
          skillName={skill.name}
          skillDescription={skill.description || ""}
          skillId={skill.id}
          proficiency={skill.proficiency}
          sources={sources}
          setSources={setSources}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          setActiveTab={setActiveTab}
          isGeneratingPodcast={isGeneratingPodcast}
          setIsGeneratingPodcast={setIsGeneratingPodcast}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SkillDetailTabs;
