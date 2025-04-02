
import React from 'react';
import ChatInterface, { ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
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
          onGeneratePodcast={onGeneratePodcast}
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
