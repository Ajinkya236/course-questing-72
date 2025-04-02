
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGemini } from '@/hooks/useGemini';
import { Source } from './knowledge/types';
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from 'react-markdown';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  placeholder?: string;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  skillName?: string;
  skillDescription?: string;
  selectedProficiency?: string;
  sources?: Source[];
  apiParams?: Record<string, any>;
  containerClassName?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  placeholder = 'Type a message...',
  messages,
  setMessages,
  isLoading = false,
  setIsLoading,
  skillName = '',
  skillDescription = '',
  selectedProficiency = '',
  sources = [],
  apiParams = {},
  containerClassName
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { generateResponse, loading: geminiLoading, resetFailureState } = useGemini();
  
  // Update external loading state
  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(geminiLoading);
    }
  }, [geminiLoading, setIsLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Create context for the AI request
    const contextInfo = sources
      .map(source => {
        // Check if source has a name/title property and content
        const sourceName = source.name || 'Source';
        return `Source: ${sourceName}\nContent: ${source.content}`;
      })
      .join('\n\n');
    
    // Skill context for the AI request
    let skillContext = '';
    if (skillName) {
      skillContext = `You are an expert in ${skillName}`;
      if (selectedProficiency) {
        skillContext += ` at the ${selectedProficiency} level`;
      }
      if (skillDescription) {
        skillContext += `. The skill is described as: ${skillDescription}`;
      }
    }
    
    try {
      const result = await generateResponse({
        prompt: userMessage,
        context: skillContext ? `${skillContext}\n\n${contextInfo}` : contextInfo,
        structuredFormat: true,
        ...apiParams
      });
      
      if (result?.generatedText) {
        // Add AI response
        setMessages(prev => [...prev, { role: 'assistant', content: result.generatedText }]);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error while generating a response. Please try again.' 
        }
      ]);
    }
  };

  const handleRetry = () => {
    resetFailureState();
    // Remove the last assistant message if it was an error
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && 
        lastMessage.content.includes('error')) {
      setMessages(messages.slice(0, -1));
    }
  };

  return (
    <div className={cn("flex flex-col h-[500px] border rounded-lg overflow-hidden", containerClassName)}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-3",
                  message.role === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                )}
              >
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <Markdown>{message.content}</Markdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t p-3">
        <div className="flex items-center space-x-2">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="resize-none min-h-[40px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={isLoading || inputValue.trim() === ''}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
