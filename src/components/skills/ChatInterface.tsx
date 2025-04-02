
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, PaperclipIcon, Link as LinkIcon, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGemini } from '@/hooks/useGemini';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  attachments?: {
    type: string;
    name?: string;
    url?: string;
    content?: string;
  }[];
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
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
  const [urlInput, setUrlInput] = useState<string>("");
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse } = useGemini();

  useEffect(() => {
    // Scroll to bottom of chat when new messages appear
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newAttachments = Array.from(files).map(file => ({
      type: file.type,
      name: file.name,
      file
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    
    try {
      new URL(urlInput); // Validate URL
      setAttachments(prev => [...prev, {
        type: 'url',
        name: urlInput,
        url: urlInput
      }]);
      setUrlInput("");
      setShowUrlInput(false);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive"
      });
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if ((!userQuery.trim() && attachments.length === 0)) return;
    
    // Prepare message with attachments
    const newMessage: ChatMessage = {
      role: 'user',
      content: userQuery,
    };
    
    if (attachments.length > 0) {
      newMessage.attachments = attachments.map(att => ({
        type: att.type,
        name: att.name,
        url: att.url
      }));
    }
    
    // Add user message to chat
    setChatMessages(prev => [...prev, newMessage]);
    
    // Prepare context for the AI
    let context = `Skill: ${skillName}\nProficiency Level: ${selectedProficiency}\nDescription: ${skillDescription}\n`;
    
    // Add sources to context
    if (sources && sources.length > 0) {
      context += `Additional Context Sources: ${sources.join(", ")}\n`;
    }
    
    // Add attachments to context
    if (attachments.length > 0) {
      context += `User has provided these attachments:\n`;
      attachments.forEach((att, index) => {
        if (att.type === 'url') {
          context += `${index + 1}. URL: ${att.url}\n`;
        } else {
          context += `${index + 1}. File: ${att.name} (${att.type})\n`;
        }
      });
    }
    
    setIsLoading(true);
    
    try {
      // Get response from Gemini
      const result = await generateResponse({
        prompt: userQuery || "Please analyze the attached content and provide insights related to this skill.",
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
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const samplePrompts = [
    "Explain the key concepts of this skill in simple terms",
    "What resources would you recommend for learning this skill?",
    "How can I apply this skill in real-world scenarios?",
    "What are common misconceptions about this skill?",
    "Give me a step-by-step learning path for this skill"
  ];

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Skill Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about this skill or upload content for analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {chatMessages.length === 0 && (
            <div className="text-center p-4">
              <h3 className="text-lg font-medium mb-2">Sample Prompts</h3>
              <div className="grid gap-2">
                {samplePrompts.map((prompt, idx) => (
                  <Button 
                    key={idx} 
                    variant="outline" 
                    className="text-left justify-start"
                    onClick={() => setUserQuery(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : message.role === 'system'
                  ? 'bg-muted text-muted-foreground text-sm italic'
                  : 'bg-muted'
              }`}>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mb-2 space-y-1">
                    {message.attachments.map((att, idx) => (
                      <div key={idx} className="text-xs flex items-center gap-1">
                        {att.type === 'url' ? (
                          <LinkIcon className="h-3 w-3" />
                        ) : (
                          <PaperclipIcon className="h-3 w-3" />
                        )}
                        <span>{att.name || att.url}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="prose prose-sm dark:prose-invert max-w-none"
                     dangerouslySetInnerHTML={{ __html: 
                       message.content.replace(/\n/g, '<br>').replace(
                         /```([a-z]*)\n([\s\S]*?)```/g, 
                         '<pre><code class="language-$1">$2</code></pre>'
                       ) 
                     }}>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        {/* Attachments display */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((att, idx) => (
              <div 
                key={idx} 
                className="bg-muted text-xs py-1 px-2 rounded-full flex items-center gap-1.5"
              >
                {att.type === 'url' ? <LinkIcon className="h-3 w-3" /> : <PaperclipIcon className="h-3 w-3" />}
                <span className="truncate max-w-[150px]">{att.name}</span>
                <button 
                  onClick={() => removeAttachment(idx)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* URL input */}
        {showUrlInput && (
          <div className="flex gap-2 mb-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL (YouTube, website, document)"
              className="flex-1"
            />
            <Button 
              size="sm" 
              onClick={handleAddUrl}
              variant="outline"
            >
              Add
            </Button>
            <Button 
              size="sm" 
              onClick={() => setShowUrlInput(false)}
              variant="ghost"
            >
              Cancel
            </Button>
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Textarea 
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about this skill..."
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleSendMessage} 
                disabled={!userQuery.trim() && attachments.length === 0 || isLoading}
                className="h-1/2"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="h-1/2"
              >
                <PaperclipIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              type="button" 
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setShowUrlInput(true)}
              disabled={showUrlInput || isLoading}
            >
              <LinkIcon className="h-3 w-3 mr-1" />
              Add URL
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              multiple
            />
            
            <span className="text-xs text-muted-foreground">
              {isLoading ? 'Generating response...' : 'Powered by Gemini 2.5 Pro'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
