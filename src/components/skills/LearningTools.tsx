
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FileQuestion, 
  FileText, 
  Network, 
  Headphones, 
  FileSpreadsheet, 
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGemini } from '@/hooks/useGemini';
import { ChatMessage } from './ChatInterface';
import { Source } from './knowledge/types';

interface LearningToolsProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency: string;
  sources: string[] | Source[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onGeneratePodcast?: () => void;
  hidePodcastButton?: boolean;
}

const LearningTools: React.FC<LearningToolsProps> = ({
  skillName,
  skillDescription,
  selectedProficiency,
  sources,
  setChatMessages,
  isLoading,
  setIsLoading,
  onGeneratePodcast,
  hidePodcastButton = false
}) => {
  const { toast } = useToast();
  const { generateResponse } = useGemini();

  const handleToolClick = async (tool: string) => {
    if (isLoading) {
      toast({
        title: "Request in progress",
        description: "Please wait for the current request to complete.",
        variant: "default",
      });
      return;
    }
    
    // Handle podcast audio generation
    if (tool === 'podcast-audio' && onGeneratePodcast) {
      onGeneratePodcast();
      return;
    }
    
    setIsLoading(true);
    
    // Prepare context information
    let context = `Skill: ${skillName}\nProficiency Level: ${selectedProficiency}\nDescription: ${skillDescription}\n`;
    if (sources && sources.length > 0) {
      const sourcesText = sources.map(source => typeof source === 'string' ? source : source.content).join(", ");
      context += `Additional Context Sources: ${sourcesText}\n`;
    }
    
    let prompt = "";
    let responseTitle = "";
    
    switch (tool) {
      case 'assess':
        prompt = `Create an adaptive assessment plan for the skill "${skillName}" at the "${selectedProficiency}" level. Include various assessment types like quizzes, interactive activities, and project evaluations. Format this as a comprehensive assessment plan with INTERACTIVE FEATURES like multiple choice questions, true/false questions, drag and drop exercises, etc. Make it GAMIFIED with points, progress tracking, and achievement badges. Include at least 5 interactive assessment activities.`;
        responseTitle = "Adaptive Skill Assessment Plan";
        break;
      case 'notes':
        prompt = `Create comprehensive study notes for the skill "${skillName}" at the "${selectedProficiency}" level. Make these notes concise, well-organized, and easy to understand. Format them with clear headings, bullet points, and examples. Structure them like a student would organize them for maximum clarity and retention.`;
        responseTitle = "Study Notes";
        break;
      case 'mindmap':
        prompt = `Create a detailed concept map or mind map for the skill "${skillName}" at the "${selectedProficiency}" level. Describe the key concepts, their relationships, and how they connect together in a hierarchical structure. Format this as a text-based mind map that could be easily converted to a visual mind map.`;
        responseTitle = "Concept Map";
        break;
      case 'podcast':
        prompt = `Create a script for a microlearning podcast between a male host named Michael and a female host named Sarah explaining the key concepts of "${skillName}" at the "${selectedProficiency}" level. Make it conversational, engaging, and cover the most important aspects in a concise manner. Format this as a script with clear speaker indicators (Michael: and Sarah:). The podcast should be around 5-7 minutes long when read aloud at a normal pace.`;
        responseTitle = "Microlearning Podcast Script";
        break;
      case 'questionnaire':
        prompt = `Create a comprehensive question bank for the skill "${skillName}" at the "${selectedProficiency}" level. Include at least 15 questions with a variety of types (multiple choice, true/false, short answer) and organize them by topic or difficulty level. For multiple choice questions, provide 4 options and indicate the correct answer. For all questions, provide comprehensive answer explanations.`;
        responseTitle = "Question Bank";
        break;
      case 'overview':
        prompt = `Provide a brief but comprehensive overview of the skill "${skillName}" at the "${selectedProficiency}" level. Include key concepts, importance, applications, and learning resources. Format this as an easy-to-understand guide with sections for: 1) What is ${skillName}?, 2) Why is it important?, 3) Key concepts to understand, 4) How to apply ${skillName}, 5) Resources for further learning.`;
        responseTitle = "Skill Overview";
        break;
      default:
        prompt = `Tell me more about the skill "${skillName}" at the "${selectedProficiency}" level.`;
        responseTitle = "Skill Information";
    }
    
    try {
      // Notify the user we're generating content
      setChatMessages(prev => [...prev, {
        role: 'user', 
        content: `Generate ${responseTitle} for ${skillName} at ${selectedProficiency} level`
      }]);
      
      setChatMessages(prev => [...prev, {role: 'system', content: `Generating ${responseTitle}...`}]);
      
      // Use Gemini 1.5 Pro model with specified prompt
      const result = await generateResponse({
        prompt: prompt,
        context: context,
        model: "gemini-1.5-pro" // Specify Gemini 1.5 Pro model
      });
      
      // Add AI response to chat
      setChatMessages(prev => {
        // Remove the system "Generating..." message
        const filteredMessages = prev.filter(msg => 
          !(msg.role === 'system' && msg.content === `Generating ${responseTitle}...`)
        );
        
        // Add the new response
        return [...filteredMessages, {
          role: 'assistant', 
          content: `## ${responseTitle}\n\n${result.generatedText}`
        }];
      });
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
      
      // Remove the system "Generating..." message
      setChatMessages(prev => prev.filter(msg => 
        !(msg.role === 'system' && msg.content === `Generating ${responseTitle}...`)
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Learning Tools</CardTitle>
        <CardDescription>Generate personalized learning resources</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center gap-2" 
          onClick={() => handleToolClick('assess')} 
          disabled={isLoading}
        >
          <FileQuestion className="h-6 w-6 text-primary" />
          <span className="text-xs">Assessment Plan</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center gap-2" 
          onClick={() => handleToolClick('notes')} 
          disabled={isLoading}
        >
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xs">Study Notes</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center gap-2" 
          onClick={() => handleToolClick('mindmap')} 
          disabled={isLoading}
        >
          <Network className="h-6 w-6 text-primary" />
          <span className="text-xs">Concept Map</span>
        </Button>
        {!hidePodcastButton && (
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2" 
            onClick={() => handleToolClick('podcast')} 
            disabled={isLoading}
          >
            <Headphones className="h-6 w-6 text-primary" />
            <span className="text-xs">Podcast Script</span>
          </Button>
        )}
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center gap-2" 
          onClick={() => handleToolClick('questionnaire')} 
          disabled={isLoading}
        >
          <FileSpreadsheet className="h-6 w-6 text-primary" />
          <span className="text-xs">Question Bank</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col items-center gap-2" 
          onClick={() => handleToolClick('overview')} 
          disabled={isLoading}
        >
          <Info className="h-6 w-6 text-primary" />
          <span className="text-xs">Skill Overview</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LearningTools;
