
import React, { useState } from 'react';
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

interface LearningToolsProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency: string;
  sources: string;
  onToolResponse: (responseTitle: string, content: string) => void;
}

const LearningTools: React.FC<LearningToolsProps> = ({
  skillName,
  skillDescription,
  selectedProficiency,
  sources,
  onToolResponse
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { generateResponse } = useGemini();

  const handleToolClick = async (tool: string) => {
    setIsLoading(true);
    
    // Prepare context information
    let context = `Skill: ${skillName}\nProficiency Level: ${selectedProficiency}\nDescription: ${skillDescription}\n`;
    if (sources) {
      context += `Additional Context Sources: ${sources}\n`;
    }
    
    let prompt = "";
    let responseTitle = "";
    
    switch (tool) {
      case 'assess':
        prompt = `Create an adaptive assessment plan for the skill "${skillName}" at the "${selectedProficiency}" level. Include various assessment types like quizzes, interactive activities, and project evaluations. Format this as a comprehensive assessment plan with clear sections.`;
        responseTitle = "Skill Assessment Plan";
        break;
      case 'notes':
        prompt = `Create comprehensive study notes for the skill "${skillName}" at the "${selectedProficiency}" level. Make these notes concise, well-organized, and easy to understand. Format them with clear headings, bullet points, and examples.`;
        responseTitle = "Study Notes";
        break;
      case 'mindmap':
        prompt = `Create a detailed concept map or mind map for the skill "${skillName}" at the "${selectedProficiency}" level. Describe the key concepts, their relationships, and how they connect together in a hierarchical structure.`;
        responseTitle = "Concept Map";
        break;
      case 'podcast':
        prompt = `Create a script for a microlearning podcast between a male and female host explaining the key concepts of "${skillName}" at the "${selectedProficiency}" level. Make it conversational, engaging, and cover the most important aspects in a concise manner.`;
        responseTitle = "Microlearning Podcast Script";
        break;
      case 'questionnaire':
        prompt = `Create a comprehensive question bank for the skill "${skillName}" at the "${selectedProficiency}" level. Include a variety of question types (multiple choice, true/false, short answer, etc.) and organize them by topic or difficulty level.`;
        responseTitle = "Question Bank";
        break;
      case 'overview':
        prompt = `Provide a brief but comprehensive overview of the skill "${skillName}" at the "${selectedProficiency}" level. Include key concepts, importance, applications, and learning resources.`;
        responseTitle = "Skill Overview";
        break;
      default:
        prompt = `Tell me more about the skill "${skillName}" at the "${selectedProficiency}" level.`;
        responseTitle = "Skill Information";
    }
    
    try {
      // Notify the user we're generating content
      onToolResponse("system", `Generating ${responseTitle}...`);
      
      // Get response from Gemini
      const result = await generateResponse({
        prompt: prompt,
        context: context
      });
      
      // Add AI response to chat
      onToolResponse("assistant", `## ${responseTitle}\n\n${result.generatedText}`);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
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
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('assess')} disabled={isLoading}>
          <FileQuestion className="h-6 w-6 text-primary" />
          <span className="text-xs">Assessment Plan</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('notes')} disabled={isLoading}>
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xs">Study Notes</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('mindmap')} disabled={isLoading}>
          <Network className="h-6 w-6 text-primary" />
          <span className="text-xs">Concept Map</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('podcast')} disabled={isLoading}>
          <Headphones className="h-6 w-6 text-primary" />
          <span className="text-xs">Podcast Script</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('questionnaire')} disabled={isLoading}>
          <FileSpreadsheet className="h-6 w-6 text-primary" />
          <span className="text-xs">Question Bank</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('overview')} disabled={isLoading}>
          <Info className="h-6 w-6 text-primary" />
          <span className="text-xs">Skill Overview</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LearningTools;
