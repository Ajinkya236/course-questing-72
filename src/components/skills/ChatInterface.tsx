
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useGemini } from '@/hooks/useGemini';
import { Source } from '@/components/skills/knowledge/types';
import ReactMarkdown from 'react-markdown';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  skillName?: string;
  skillDescription?: string;
  selectedProficiency?: string;
  sources?: Source[];
  placeholder?: string;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  apiParams?: {
    skillName?: string;
    skillProficiency?: string;
    sources?: Source[];
  };
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  skillName = '',
  skillDescription = '',
  selectedProficiency = '',
  sources = [],
  placeholder = 'Ask me anything...',
  messages,
  setMessages,
  isLoading: externalLoading = false,
  setIsLoading: setExternalLoading,
  apiParams = {}
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { generateResponse, loading: internalLoading } = useGemini();
  
  const isLoading = externalLoading || internalLoading;

  useEffect(() => {
    // Scroll to bottom on new messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Set loading state if external control is provided
    if (setExternalLoading) {
      setExternalLoading(true);
    }
    
    try {
      // Construct context based on skill info and sources
      let context = '';
      if (skillName) {
        context += `You are an expert in ${skillName}`;
        if (selectedProficiency) {
          context += ` at the ${selectedProficiency} level`;
        }
        context += `. Your goal is to provide helpful, educational responses about this subject.\n\n`;
        
        if (skillDescription) {
          context += `The skill is described as: ${skillDescription}\n\n`;
        }
      }
      
      // Include sources in context
      if (sources && sources.length > 0) {
        context += "Consider these additional knowledge sources:\n";
        sources.forEach((source, index) => {
          const sourceTitle = source.content ? source.content.substring(0, 30) + '...' : 'Source';
          const sourceContent = source.content || 'No content';
          context += `${index + 1}. ${sourceTitle}: ${sourceContent}\n`;
        });
      }
      
      // Generate response from AI
      const { generatedText } = await generateResponse({ 
        prompt: userMessage, 
        context,
        // Pass any additional parameters from apiParams
        ...apiParams
      });
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: generatedText }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error processing your request. Please try again." 
      }]);
    } finally {
      // Reset loading state if external control is provided
      if (setExternalLoading) {
        setExternalLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex flex-col h-full p-4">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[650px]" // Increased height from 550px to 650px
        >
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-p:my-2 max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p>Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-end">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="resize-none min-h-[80px]"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            className="ml-2 h-10 px-3"
            disabled={isLoading || !inputMessage.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
