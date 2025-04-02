
import React, { useState, useEffect } from 'react';
import { Mic, Loader2, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import AudioPlayer from './AudioPlayer';
import { generatePodcast } from './PodcastUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PodcastPlayerProps {
  skillName: string;
  skillDescription: string;
  proficiency: string;
  inChatMode?: boolean;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ 
  skillName, 
  skillDescription,
  proficiency,
  inChatMode = false
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('audio');
  const { toast } = useToast();

  const handleGeneratePodcast = async () => {
    if (isGenerating) {
      toast({
        title: "Generation in progress",
        description: "Please wait for the current generation to complete.",
        variant: "default",
      });
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    
    try {
      // Generate podcast via edge function
      const result = await generatePodcast(skillName, skillDescription, proficiency);
      
      if (result.error) {
        setErrorMessage(result.error);
        return;
      }
      
      if (result.transcript) {
        setTranscript(result.transcript);
      }
      
      if (result.audioUrl) {
        setAudioUrl(result.audioUrl);
      } else {
        setErrorMessage("No audio URL was returned");
      }
      
      if (result.mockMode) {
        setIsMockMode(true);
        setActiveTab('transcript');
        toast({
          title: "Transcript Generated",
          description: "Podcast transcript is ready. Audio generation was skipped to improve performance.",
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error("Podcast generation error:", error);
      setErrorMessage(error.message || "Failed to generate podcast");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={inChatMode ? "mt-4" : ""}>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Skill Learning Podcast</h3>
            {!transcript && !audioUrl && (
              <Button 
                onClick={handleGeneratePodcast}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> 
                    Generating...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" /> 
                    Generate Podcast
                  </>
                )}
              </Button>
            )}
          </div>
          
          {(transcript || audioUrl) ? (
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="audio" disabled={isMockMode}>Audio</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
              </TabsList>
              
              <TabsContent value="audio">
                {audioUrl && !isMockMode ? (
                  <AudioPlayer 
                    audioUrl={audioUrl} 
                    title={`${skillName} Learning Podcast`}
                    subtitle={`${proficiency} level overview`}
                  />
                ) : (
                  <div className="bg-muted rounded-md p-6 text-center">
                    <p>Audio generation is currently unavailable.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please view the transcript instead.
                    </p>
                    <Button onClick={() => setActiveTab('transcript')} className="mt-4">
                      View Transcript
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="transcript">
                {transcript ? (
                  <div className="bg-muted rounded-md p-6 max-h-[400px] overflow-y-auto">
                    <div className="prose prose-sm">
                      <h4 className="text-md font-semibold mb-2">{skillName} Podcast Transcript</h4>
                      <div className="whitespace-pre-line">
                        {transcript}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted rounded-md p-6 text-center">
                    <p>No transcript available.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="bg-muted rounded-md p-6 text-center">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Creating your personalized learning podcast...</p>
                  <p className="text-sm text-muted-foreground">This may take a minute or two</p>
                </div>
              ) : errorMessage ? (
                <div>
                  <p className="text-destructive">{errorMessage}</p>
                  <Button onClick={handleGeneratePodcast} className="mt-4">Try Again</Button>
                </div>
              ) : (
                <div>
                  <p>Generate a learning podcast to help you master {skillName}.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    The podcast will cover key concepts and practical applications 
                    at the {proficiency} level.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastPlayer;
