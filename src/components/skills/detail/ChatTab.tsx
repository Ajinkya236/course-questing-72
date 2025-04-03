import React, { useState } from 'react';
import ChatInterface, { ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/learning-tools';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import { Source } from '@/components/skills/knowledge/types';
import { Button } from "@/components/ui/button";
import { Download, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatTabProps {
  skill: any;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatTab: React.FC<ChatTabProps> = ({
  skill,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  isGeneratingPodcast,
  setIsGeneratingPodcast
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPodcast, setShowPodcast] = useState(false);
  const { toast } = useToast();
  
  const handleGeneratePodcast = () => {
    setShowPodcast(true);
    // We don't need to call onGeneratePodcast() since we're showing the podcast player inline
  };

  const downloadChatHistory = () => {
    // Create a text version of the chat history
    const chatText = chatMessages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    
    // Create a blob and generate download link
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skill.name}-chat-history.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat history downloaded",
      description: "Your conversation has been saved as a text file.",
    });
  };

  const clearChatHistory = () => {
    // Keep only the welcome message
    const welcomeMessage = chatMessages.length > 0 ? [chatMessages[0]] : [];
    setChatMessages(welcomeMessage);
    
    toast({
      title: "Chat history cleared",
      description: "Your conversation history has been cleared.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 flex flex-col space-y-6">
        <div className="flex justify-end space-x-2 mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadChatHistory}
            disabled={chatMessages.length <= 1}
            className="flex items-center gap-2"
          >
            <Download size={14} />
            Download History
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearChatHistory}
            disabled={chatMessages.length <= 1}
            className="flex items-center gap-2"
          >
            <Trash size={14} />
            Clear History
          </Button>
        </div>
        
        <ChatInterface
          skillName={skill.name}
          skillDescription={skill.description || ''}
          selectedProficiency={skill.proficiency}
          sources={sources}
          messages={chatMessages}
          setMessages={setChatMessages}
          placeholder={`Ask me anything about ${skill.name}...`}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiParams={{ 
            skillName: skill.name,
            skillProficiency: skill.proficiency,
            sources: sources
          }}
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
          skillId={skill.id}
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
