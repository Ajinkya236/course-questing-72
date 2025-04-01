
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
  Play,
  Pause,
  X
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
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';

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
  const [podcastDialogOpen, setPodcastDialogOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<string>("");
  const [podcastAudio, setPodcastAudio] = useState<string | null>(null);
  const [podcastScript, setPodcastScript] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

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

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleGeneratePodcast = async () => {
    setIsGeneratingPodcast(true);
    toast({
      title: "Generating Podcast",
      description: "Creating an audio podcast for this skill. This may take a moment...",
    });

    try {
      const { data, error } = await supabase.functions.invoke('generate-podcast', {
        body: {
          skillName,
          skillDescription,
          proficiencyLevel: selectedProficiency
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setPodcastScript(data.script);
      setPodcastAudio(data.audioContent);
      
      toast({
        title: "Podcast Generated",
        description: "Your podcast has been created successfully!",
      });
    } catch (err: any) {
      console.error("Error generating podcast:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to generate podcast. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPodcast(false);
    }
  };

  const handleToolClick = async (tool: string, hasUploadedFile = false) => {
    if (tool === 'assess' && !hasUploadedFile) {
      setCurrentTool(tool);
      setUploadDialogOpen(true);
      return;
    }

    if (tool === 'podcast') {
      setPodcastDialogOpen(true);
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Skill Podcast</span>
              <DialogClose className="rounded-full hover:bg-gray-200 p-1">
                <X className="h-4 w-4" />
              </DialogClose>
            </DialogTitle>
            <DialogDescription>
              Listen to a microlearning podcast about {skillName} at the {selectedProficiency} level.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!podcastAudio && !isGeneratingPodcast && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleGeneratePodcast}
                  className="flex items-center gap-2"
                >
                  <Headphones className="h-4 w-4" />
                  Generate Podcast
                </Button>
              </div>
            )}

            {isGeneratingPodcast && (
              <div className="text-center p-8">
                <div className="animate-pulse flex flex-col items-center">
                  <Headphones className="h-12 w-12 text-primary mb-4" />
                  <p>Generating your podcast...</p>
                  <p className="text-sm text-muted-foreground mt-2">This may take up to a minute</p>
                </div>
              </div>
            )}

            {podcastAudio && (
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button 
                      onClick={handlePlayPause}
                      variant="outline"
                      size="icon"
                      className="rounded-full h-12 w-12 bg-primary text-white hover:bg-primary/90"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <div>
                      <h3 className="font-semibold">Skill Spotlight: {skillName}</h3>
                      <p className="text-sm text-muted-foreground">Michael & Sarah • {selectedProficiency} Level</p>
                    </div>
                  </div>
                  
                  <audio 
                    ref={audioRef}
                    src={`data:audio/mp3;base64,${podcastAudio}`}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full" 
                    controls
                  />
                </div>
                
                {podcastScript && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Podcast Transcript</h3>
                    <div className="max-h-[300px] overflow-y-auto bg-muted/40 p-4 rounded-md">
                      {podcastScript.split('\n').map((line, index) => (
                        <p key={index} className={`mb-2 ${
                          line.startsWith('Michael:') ? 'text-blue-600 dark:text-blue-400' : 
                          line.startsWith('Sarah:') ? 'text-rose-600 dark:text-rose-400' : ''
                        }`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LearningTools;
