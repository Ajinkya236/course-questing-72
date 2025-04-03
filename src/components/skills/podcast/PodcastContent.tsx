
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Mic, Loader2 } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import { useToast } from '@/hooks/use-toast';

interface PodcastContentProps {
  transcript: string | null;
  audioUrl: string | null;
  skillName: string;
  proficiency: string;
  onRegenerateClick: () => void;
  isGenerating: boolean;
}

const PodcastContent: React.FC<PodcastContentProps> = ({
  transcript,
  audioUrl,
  skillName,
  proficiency,
  onRegenerateClick,
  isGenerating
}) => {
  const [activeTab, setActiveTab] = useState<string>(audioUrl ? 'audio' : 'transcript');
  const { toast } = useToast();

  const downloadTranscript = () => {
    if (!transcript) return;
    
    const element = document.createElement("a");
    const file = new Blob([transcript], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${skillName}_Podcast_Transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    
    toast({
      title: "Transcript Downloaded",
      description: "Podcast transcript has been downloaded as a text file.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-2">
        {transcript && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadTranscript}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Transcript
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerateClick}
          disabled={isGenerating}
          className="flex items-center gap-2 ml-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> 
              Regenerating...
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" /> 
              Regenerate
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="audio" disabled={!audioUrl && !transcript}>
            {audioUrl ? "Audio Player" : "Audio (Unavailable)"}
          </TabsTrigger>
          <TabsTrigger value="transcript" disabled={!transcript}>Transcript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="audio" className="min-h-[300px]">
          {audioUrl ? (
            <div className="audio-player-container min-h-[300px] flex justify-center items-center">
              <AudioPlayer 
                audioUrl={audioUrl} 
                title={`${skillName} Learning Podcast`}
                subtitle={`${proficiency} level overview`}
              />
            </div>
          ) : transcript ? (
            <div className="bg-muted rounded-md p-6 text-center min-h-[300px]">
              <p>Audio generation is currently unavailable.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Please view the transcript instead.
              </p>
              <Button onClick={() => setActiveTab('transcript')} className="mt-4">
                View Transcript
              </Button>
            </div>
          ) : (
            <div className="bg-muted rounded-md p-6 text-center">
              <p>No podcast available. Please generate one first.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="transcript">
          {transcript ? (
            <div className="bg-muted rounded-md p-6 max-h-[400px] overflow-y-auto">
              <div className="prose prose-sm dark:prose-invert max-w-none">
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
  );
};

export default PodcastContent;
