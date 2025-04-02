
import React, { useState } from 'react';
import ChatInterface, { ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import KnowledgeSources from '@/components/skills/knowledge/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import { Source } from '@/components/skills/knowledge/types';

interface ChatTabProps {
  skill: any;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onGeneratePodcast: () => void;
}

const ChatTab: React.FC<ChatTabProps> = ({
  skill,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  isLoading,
  setIsLoading,
  onGeneratePodcast
}) => {
  const [showPodcast, setShowPodcast] = useState(false);
  
  const handleGeneratePodcast = () => {
    setShowPodcast(true);
    // We don't need to call onGeneratePodcast() since we're showing the podcast player inline
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 flex flex-col space-y-6">
        <ChatInterface
          skillName={skill.name}
          skillDescription={skill.description || ''}
          selectedProficiency={skill.proficiency}
          sources={sources}
          messages={chatMessages}
          setMessages={setChatMessages}
          placeholder={`Ask me anything about ${skill.name}...`}
          apiParams={{ 
            skillName: skill.name,
            skillProficiency: skill.proficiency,
            sources: sources
          }}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        
        <PodcastPlayer
          skillName={skill.name}
          skillDescription={skill.description || ''}
          proficiency={skill.proficiency}
          inChatMode={true}
        />
      </div>
      <div className="space-y-6">
        <LearningTools 
          skillName={skill.name}
          skillDescription={skill.description || ''}
          selectedProficiency={skill.proficiency}
          sources={sources}
          setChatMessages={setChatMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onGeneratePodcast={handleGeneratePodcast}
          hidePodcastButton={true}
        />
        
        <KnowledgeSources
          sources={sources}
          setSources={setSources}
        />
      </div>
    </div>
  );
};

export default ChatTab;
