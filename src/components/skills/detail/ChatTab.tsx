
import React, { useState, useRef, useEffect } from 'react';
import ChatInterface, { ChatMessage } from '@/components/skills/ChatInterface';
import { Source } from '@/components/skills/knowledge/types';

interface ChatTabProps {
  skill: any;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
}

const sampleQuestions = [
  "What are the key concepts I should learn about this skill?",
  "How can I apply this skill in a real-world scenario?",
  "What's the difference between beginner and expert level in this skill?",
  "Can you recommend any practice exercises for this skill?",
  "What are common mistakes to avoid when learning this skill?",
  "How long does it typically take to master this skill?",
  "What related skills should I learn alongside this one?",
  "Are there any certifications available for this skill?"
];

const ChatTab: React.FC<ChatTabProps> = ({
  skill,
  chatMessages,
  setChatMessages,
  sources,
  setSources,
  isGeneratingPodcast,
  setIsGeneratingPodcast
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setChatMessages(prev => [...prev, {
      role: 'user',
      content: message
    }]);
    
    setIsTyping(true);
    
    try {
      // Simulate AI response
      setTimeout(() => {
        const response = `Here's some information about ${skill.name} related to your question about ${message}.

This is a simulated response for the AI assistant. In a real implementation, this would call an AI API to generate a relevant response based on the skill and the user's question.

You can ask more questions or use the Learning Tools to generate study materials for ${skill.name}.`;
        
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: response
        }]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again later."
      }]);
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="min-h-[600px] flex flex-col">
        <div className="p-4 mb-2">
          <h2 className="text-xl font-semibold">{skill.name} Assistant</h2>
          <p className="text-muted-foreground text-sm">
            Ask questions about {skill.name} at the {skill.proficiency} level
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4">
          <ChatInterface
            messages={chatMessages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            placeholder={`Ask about ${skill.name}...`}
            sources={sources}
            setSources={setSources}
            skill={skill}
            sampleQuestions={sampleQuestions}
          />
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
