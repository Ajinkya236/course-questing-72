
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, HelpCircle } from "lucide-react";
import { useGemini } from '@/hooks/useGemini';
import { Source } from '@/components/skills/knowledge/types';
import ReactMarkdown from 'react-markdown';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  
  // Sample questions based on the skill
  const sampleQuestions = [
    `What are the core concepts of ${skillName}?`,
    `How can I practice ${skillName} at ${selectedProficiency} level?`,
    `What are common challenges when learning ${skillName}?`,
    `How is ${skillName} applied in real-world scenarios?`,
    `What resources do you recommend for learning ${skillName}?`,
    `What are the prerequisites for mastering ${skillName}?`,
    `Can you explain a difficult concept in ${skillName} in simple terms?`,
    `What career paths benefit from ${skillName} expertise?`
  ];

  useEffect(() => {
    // Scroll to bottom on new messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message.trim();
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
  
  const handleSampleQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage(question);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">AI Learning Assistant</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Sample Questions</h4>
                <div className="flex flex-col space-y-2 max-h-[300px] overflow-y-auto">
                  {sampleQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="justify-start text-left text-sm h-auto py-2"
                      onClick={() => handleSampleQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-4">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[500px]" // Increased height from 400px
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
            onClick={() => handleSendMessage()}
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

