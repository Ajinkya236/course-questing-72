
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ChatInterface, { ChatMessage } from '@/components/skills/ChatInterface';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import SkillTabContent from './SkillTabContent';
import { Source } from '@/components/skills/knowledge/types';
import TabHeader from './TabHeader';
import ChatTab from './ChatTab';
import ShareDialog from './ShareDialog';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  // Use useRef instead of state for the podcast ref to avoid infinite loops
  const podcastRef = useRef<HTMLDivElement>(null);

  const handleGeneratePodcast = () => {
    // Switch to learn tab first
    setActiveTab('learn');
    
    // Create a timeout to allow the tab to render first
    setTimeout(() => {
      // Then scroll to the podcast player (if needed)
      if (podcastRef && podcastRef.current) {
        podcastRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabHeader setShowShareDialog={setShowShareDialog} />
        
        <TabsContent value="chat" className="mt-0">
          <ChatTab
            skill={skill}
            sources={sources}
            setSources={setSources}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onGeneratePodcast={handleGeneratePodcast}
          />
        </TabsContent>
        
        <TabsContent value="learn" className="mt-0">
          <SkillTabContent 
            skill={skill}
            sources={sources}
            setSources={setSources}
          >
            <div className="mb-8" ref={podcastRef}>
              <PodcastPlayer
                skillName={skill.name}
                skillDescription={skill.description || ''}
                proficiency={skill.proficiency}
              />
            </div>
          </SkillTabContent>
        </TabsContent>
      </Tabs>

      <ShareDialog 
        skillName={skill.name}
        showShareDialog={showShareDialog}
        setShowShareDialog={setShowShareDialog}
      />
    </>
  );
};

export default SkillDetailTabs;
