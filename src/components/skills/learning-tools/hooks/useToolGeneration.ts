
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useGemini } from '@/hooks/useGemini';
import { Source } from '@/components/skills/knowledge/types';
import { ChatMessage } from '@/components/skills/ChatInterface';

type ToolType = 'summary' | 'quiz' | 'study-guide' | 'examples';

export const useToolGeneration = (
  skillName: string,
  skillDescription: string,
  selectedProficiency: string,
  sources: Source[],
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { generateResponse, loading, apiCallFailed } = useGemini();
  const isBusy = loading;

  const handleToolGeneration = async (toolType: ToolType) => {
    if (isBusy) {
      toast({
        title: "In progress",
        description: "Please wait for the current operation to complete.",
        variant: "default",
      });
      return;
    }

    if (apiCallFailed) {
      toast({
        title: "API Error",
        description: "There was an error connecting to the AI service. Please refresh the page and try again.",
        variant: "destructive",
      });
      return;
    }

    let prompt = '';
    let systemMessage = '';

    setIsLoading(true);

    try {
      switch (toolType) {
        case 'summary':
          prompt = `Create a concise summary of ${skillName} at the ${selectedProficiency} proficiency level.`;
          systemMessage = `# ${skillName} Summary (${selectedProficiency} level)`;
          break;
        case 'quiz':
          prompt = `Create a 5-question quiz about ${skillName} at the ${selectedProficiency} proficiency level with answers.`;
          systemMessage = `# ${skillName} Quiz (${selectedProficiency} level)`;
          break;
        case 'study-guide':
          prompt = `Create a comprehensive study guide for ${skillName} at the ${selectedProficiency} proficiency level.`;
          systemMessage = `# ${skillName} Study Guide (${selectedProficiency} level)`;
          break;
        case 'examples':
          prompt = `Provide practical examples and use cases of ${skillName} at the ${selectedProficiency} proficiency level.`;
          systemMessage = `# ${skillName} Examples (${selectedProficiency} level)`;
          break;
        default:
          setIsLoading(false);
          return;
      }

      // Append source information if available
      if (sources.length > 0) {
        prompt += "\n\nConsider the following sources in your response:";
        sources.forEach((source, index) => {
          const sourceContent = source.content || 'No content available';
          prompt += `\n${index + 1}. ${sourceContent.substring(0, 100)}...`;
        });
      }

      const { generatedText } = await generateResponse({
        prompt,
        context: `You are an expert in ${skillName} providing educational content for a student at the ${selectedProficiency} proficiency level.`,
        structuredFormat: true,
        model: 'gemini-1.5-pro',
      });

      // Update the chat interface with the AI response
      setChatMessages(prev => [
        ...prev,
        {
          role: 'user',
          content: `Generate a ${toolType.replace('-', ' ')} for ${skillName}.`
        },
        {
          role: 'assistant',
          content: `${systemMessage}\n\n${generatedText}`
        }
      ]);

      toast({
        title: "Content generated",
        description: `${toolType.replace('-', ' ')} for ${skillName} has been created.`,
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleToolGeneration,
    isBusy,
    apiCallFailed
  };
};
