
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGemini } from '@/hooks/useGemini';

interface ChatInterfaceProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency: string;
  sources: string[];
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onToolResponse?: (role: string, content: string) => void;
}

export type ChatMessage = {
  role: string;
  content: string;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  skillName,
  skillDescription,
  selectedProficiency,
  sources,
  chatMessages,
  setChatMessages,
  onToolResponse
}) => {
  const { toast } = useToast();
  const [userQuery, setUserQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse } = useGemini();

  useEffect(() => {
    // Scroll to bottom of chat when new messages appear
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userQuery.trim()) return;
    
    // Add user message to chat
    setChatMessages(prev => [...prev, {role: 'user', content: userQuery}]);
    
    // Prepare context for the AI
    let context = `Skill: ${skillName}\nProficiency Level: ${selectedProficiency}\nDescription: ${skillDescription}\n`;
    if (sources && sources.length > 0) {
      context += `Additional Context Sources: ${sources.join(", ")}\n`;
    }
    
    setIsLoading(true);
    
    try {
      // Get response from Gemini
      const result = await generateResponse({
        prompt: userQuery,
        context: context
      });
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, {role: 'assistant', content: result.generatedText}]);
      
      // Notify parent component if callback exists
      if (onToolResponse) {
        onToolResponse('assistant', result.generatedText);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setUserQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Skill Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about this skill or how to improve it
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : message.role === 'system'
                  ? 'bg-muted text-muted-foreground text-sm italic'
                  : 'bg-muted'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Textarea 
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about this skill..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!userQuery.trim() || isLoading}
            className="self-end"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ChatInterface };
