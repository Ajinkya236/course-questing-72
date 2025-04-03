
import React, { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { generatePodcast } from './PodcastUtils';
import PodcastLoading from './PodcastLoading';
import PodcastEmpty from './PodcastEmpty';
import PodcastError from './PodcastError';
import PodcastContent from './PodcastContent';

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
  const { toast } = useToast();

  // Auto-generate podcast on component mount if not in chat mode
  useEffect(() => {
    if (!inChatMode && !transcript && !audioUrl && !isGenerating) {
      handleGeneratePodcast();
    }
  }, []);

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
        
        toast({
          title: "Transcript Generated",
          description: "Podcast transcript is ready to read.",
          variant: "default",
        });
      }
      
      if (result.audioUrl) {
        setAudioUrl(result.audioUrl);
        
        toast({
          title: "Podcast Generated",
          description: "Your learning podcast is ready to play.",
          variant: "default",
        });
      }
      
      setIsMockMode(result.mockMode || false);
    } catch (error: any) {
      console.error("Podcast generation error:", error);
      setErrorMessage(error.message || "Failed to generate podcast");
      
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate podcast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderPodcastContent = () => {
    if (transcript || audioUrl) {
      return (
        <PodcastContent
          transcript={transcript}
          audioUrl={audioUrl}
          skillName={skillName}
          proficiency={proficiency}
          onRegenerateClick={handleGeneratePodcast}
          isGenerating={isGenerating}
        />
      );
    }

    if (isGenerating) {
      return <PodcastLoading />;
    }

    if (errorMessage) {
      return <PodcastError errorMessage={errorMessage} onRetry={handleGeneratePodcast} />;
    }

    return <PodcastEmpty skillName={skillName} proficiency={proficiency} />;
  };

  return (
    <Card className={`${inChatMode ? "mt-4" : ""} overflow-hidden`}>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center">
              <Volume2 className="h-5 w-5 text-primary mr-2" />
              Skill Learning Podcast
            </h3>
            {!transcript && !audioUrl && (
              <Button 
                onClick={handleGeneratePodcast}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <Mic className="h-4 w-4" /> 
                Generate Podcast
              </Button>
            )}
          </div>
          
          <div className="bg-muted rounded-md p-6 text-center min-h-[250px] flex items-center justify-center">
            {renderPodcastContent()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastPlayer;
