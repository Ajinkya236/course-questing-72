
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FileQuestion, 
  FileText, 
  Network, 
  Headphones, 
  FileSpreadsheet, 
  Info,
  Upload,
  X,
  Play,
  Pause
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGemini } from '@/hooks/useGemini';
import { ChatMessage } from './ChatInterface';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { Progress } from "@/components/ui/progress";

interface LearningToolsProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency: string;
  sources: string[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LearningTools: React.FC<LearningToolsProps> = ({
  skillName,
  skillDescription,
  selectedProficiency,
  sources,
  setChatMessages,
  isLoading,
  setIsLoading
}) => {
  const { toast } = useToast();
  const { generateResponse } = useGemini();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<string>("");
  const [podcastDialogOpen, setPodcastDialogOpen] = useState(false);
  const [podcastScript, setPodcastScript] = useState("");
  const [audioContent, setAudioContent] = useState("");
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, you would process the file upload
    // For now, we'll just simulate a file upload
    toast({
      title: "File Received",
      description: "Your file has been received and will be processed.",
    });
    
    setUploadDialogOpen(false);
    
    // After closing the dialog, generate the assessment with the file content context
    if (currentTool) {
      handleToolClick(currentTool, true);
    }
  };

  const handleToolClick = async (tool: string, hasUploadedFile = false) => {
    if (tool === 'assess' && !hasUploadedFile) {
      setCurrentTool(tool);
      setUploadDialogOpen(true);
      return;
    }

    if (tool === 'podcast') {
      setCurrentTool(tool);
      setIsLoading(true);
      
      try {
        // Notify the user we're generating content
        setChatMessages(prev => [...prev, {role: 'system', content: `Generating Microlearning Podcast Script...`}]);
        
        // Generate podcast script with Gemini
        const context = `Skill: ${skillName}\nProficiency Level: ${selectedProficiency}\nDescription: ${skillDescription}\n`;
        const prompt = `Create a script for a microlearning podcast between a male host named Michael and a female host named Sarah explaining the key concepts of "${skillName}" at the "${selectedProficiency}" level. Make it conversational, engaging, and cover the most important aspects in a concise manner. Format this as a script with clear speaker indicators (Michael: and Sarah:). The podcast should be around 5-7 minutes long when read aloud at a normal pace.`;
        
        const result = await generateResponse({
          prompt: prompt,
          context: context,
          model: "gemini-1.5-pro"
        });
        
        // Store the script
        setPodcastScript(result.generatedText);
        
        // Add AI response to chat
        setChatMessages(prev => [...prev, {role: 'assistant', content: `## Microlearning Podcast Script Generated\n\nI've created a podcast script about ${skillName}. Would you like to listen to it?\n\n${result.generatedText.substring(0, 300)}...`}]);
        
        // Open the podcast dialog
        setPodcastDialogOpen(true);
      } catch (error) {
        console.error("Error generating podcast script:", error);
        toast({
          title: "Error",
          description: "Failed to generate podcast script. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    setIsLoading(true);
    
    // Prepare context information
    let context = `Skill: ${skillName}\nProficiency Level: ${selectedProficiency}\nDescription: ${skillDescription}\n`;
    if (sources && sources.length > 0) {
      context += `Additional Context Sources: ${sources.join(", ")}\n`;
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
      setChatMessages(prev => [...prev, {role: 'system', content: `Generating ${responseTitle}...`}]);
      
      // Use Gemini 2.5 Pro model with specified prompt
      const result = await generateResponse({
        prompt: prompt,
        context: context,
        model: "gemini-1.5-pro" // Specify Gemini 2.5 Pro model
      });
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, {role: 'assistant', content: `## ${responseTitle}\n\n${result.generatedText}`}]);
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

  const handleGenerateAudio = async () => {
    if (!podcastScript) {
      toast({
        title: "Error",
        description: "No podcast script available to convert to audio.",
        variant: "destructive"
      });
      return;
    }

    setIsAudioLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { script: podcastScript }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.audioContent) {
        setAudioContent(data.audioContent);
        
        // Create audio element for playback
        if (audioElement) {
          audioElement.pause();
          setIsPlaying(false);
        }
        
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        setAudioElement(audio);
        
        toast({
          title: "Audio Generated",
          description: "Your podcast is ready to play.",
        });
      } else {
        throw new Error("No audio content received");
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Audio Generation Failed",
        description: "Sorry, we couldn't generate the audio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAudioLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    
    setIsPlaying(!isPlaying);
    
    // Add event listener for when audio ends
    audioElement.onended = () => {
      setIsPlaying(false);
    };
  };

  return (
    <>
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
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2" 
            onClick={() => handleToolClick('podcast')} 
            disabled={isLoading}
          >
            <Headphones className="h-6 w-6 text-primary" />
            <span className="text-xs">Podcast</span>
          </Button>
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

      {/* File Upload Dialog for Assessment */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Content for Assessment</DialogTitle>
            <DialogDescription>
              Upload documents, videos, texts, PDFs, PPTs, or other materials to help customize your skill assessment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload File</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your files here, or click to browse
                </p>
                <Input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Browse Files
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Podcast Dialog */}
      <Dialog open={podcastDialogOpen} onOpenChange={setPodcastDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Microlearning Podcast: {skillName}</DialogTitle>
            <DialogDescription>
              A conversational podcast explaining the key concepts of {skillName} at the {selectedProficiency} level.
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-y-auto mt-2 border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
            {podcastScript.split('\n').map((line, index) => {
              // Style the speaker lines differently
              const speakerMatch = line.match(/^(Michael|Sarah):/);
              
              if (speakerMatch) {
                const speaker = speakerMatch[1];
                const isMichael = speaker === 'Michael';
                
                return (
                  <p 
                    key={index} 
                    className={`mb-2 ${isMichael ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-purple-600 dark:text-purple-400 font-semibold'}`}
                  >
                    {line}
                  </p>
                );
              }
              
              return <p key={index} className="mb-2">{line}</p>;
            })}
          </div>
          
          <div className="flex flex-col items-center gap-4 mt-4">
            {!audioContent && (
              <Button 
                onClick={handleGenerateAudio} 
                disabled={isAudioLoading || !podcastScript}
                className="w-full"
              >
                {isAudioLoading ? 'Generating Audio...' : 'Generate Audio'}
              </Button>
            )}
            
            {isAudioLoading && (
              <div className="w-full space-y-2">
                <p className="text-sm text-center text-muted-foreground">Converting script to audio...</p>
                <Progress value={45} className="h-2" />
              </div>
            )}
            
            {audioContent && (
              <div className="w-full flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <div className="text-sm text-muted-foreground">
                  {isPlaying ? 'Playing...' : 'Ready to play'}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" /> Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LearningTools;
