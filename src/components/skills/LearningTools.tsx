
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SquareDashed, Pen, Mic, ScrollText, FileTextIcon, RefreshCw, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/components/skills/ChatInterface';
import { Source } from '@/components/skills/knowledge/types';
import { useGemini } from '@/hooks/useGemini';
import ConceptMap from './ConceptMap';

interface LearningToolsProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency: string;
  sources: Source[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onGeneratePodcast: () => void;
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
  const { generateResponse, loading, apiCallFailed } = useGemini();

  const isBusy = isLoading || loading;

  const handleToolClick = async (toolType: string) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Tools</CardTitle>
        <CardDescription>
          Generate learning resources for {skillName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToolClick('summary')}
            disabled={isBusy}
            className="h-auto py-3 flex flex-col items-center text-center"
          >
            <FileTextIcon className="h-4 w-4 mb-1" />
            <span>Summary</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToolClick('quiz')}
            disabled={isBusy}
            className="h-auto py-3 flex flex-col items-center text-center"
          >
            <ScrollText className="h-4 w-4 mb-1" />
            <span>Quiz</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToolClick('study-guide')}
            disabled={isBusy}
            className="h-auto py-3 flex flex-col items-center text-center"
          >
            <Pen className="h-4 w-4 mb-1" />
            <span>Study Guide</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToolClick('examples')}
            disabled={isBusy}
            className="h-auto py-3 flex flex-col items-center text-center"
          >
            <SquareDashed className="h-4 w-4 mb-1" />
            <span>Examples</span>
          </Button>

          {!hidePodcastButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={onGeneratePodcast}
              disabled={isBusy}
              className="h-auto py-3 flex flex-col items-center text-center"
            >
              <Mic className="h-4 w-4 mb-1" />
              <span>Podcast</span>
            </Button>
          )}
          
          <ConceptMap 
            skillName={skillName}
            skillDescription={skillDescription}
            proficiency={selectedProficiency}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningTools;
