
import React, { useState, useEffect } from 'react';
import { Mic, Loader2, FileText, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import AudioPlayer from './AudioPlayer';
import { generatePodcast } from './PodcastUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [activeTab, setActiveTab] = useState<string>('transcript');
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
      toast({
        title: "Generating podcast",
        description: "This may take up to 2 minutes for longer podcasts. Please be patient.",
        variant: "default",
      });
      
      // Generate podcast via edge function
      const result = await generatePodcast(skillName, skillDescription, proficiency);
      
      if (result.error) {
        setErrorMessage(result.error);
        return;
      }
      
      if (result.transcript) {
        setTranscript(result.transcript);
        setActiveTab('transcript');
        
        toast({
          title: "Transcript Generated",
          description: "Podcast transcript is ready to read.",
          variant: "default",
        });
      }
      
      if (result.audioUrl) {
        setAudioUrl(result.audioUrl);
      }
      
      setIsMockMode(result.mockMode || false);
    } catch (error: any) {
      console.error("Podcast generation error:", error);
      setErrorMessage(error.message || "Failed to generate podcast");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadTranscript = () => {
    if (!transcript) return;
    
    const element = document.createElement("a");
    const file = new Blob([transcript], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${skillName}_Podcast_Transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Transcript Downloaded",
      description: "Podcast transcript has been downloaded as a text file.",
    });
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
            <div className="space-y-4">
              {transcript && (
                <div className="flex justify-end mb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadTranscript}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Transcript
                  </Button>
                </div>
              )}
              
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="audio" disabled={!audioUrl}>Audio</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                </TabsList>
                
                <TabsContent value="audio">
                  {audioUrl ? (
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
            </div>
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
                    The podcast will feature a conversation between hosts discussing 
                    key concepts and practical applications at the {proficiency} level.
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
