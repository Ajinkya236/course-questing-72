
import React, { useState, useEffect } from 'react';
import { Mic, Play, Pause, SkipForward, Volume2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AudioPlayer from './AudioPlayer';

interface PodcastPlayerProps {
  skillName: string;
  skillDescription: string;
  proficiency: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ 
  skillName, 
  skillDescription,
  proficiency 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generationFailed, setGenerationFailed] = useState(false);
  const { toast } = useToast();

  const handleGeneratePodcast = async () => {
    if (generationFailed) {
      toast({
        title: "Generation previously failed",
        description: "Please refresh the page and try again later.",
        variant: "destructive",
      });
      return;
    }
    
    if (isGenerating) {
      toast({
        title: "Generation in progress",
        description: "Please wait for the current generation to complete.",
        variant: "default",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create a simulated podcast title based on skill name
      const podcastTitle = `Learning ${skillName} at ${proficiency} level`;
      
      // Call the generate-podcast edge function
      const { data, error } = await supabase.functions.invoke('generate-podcast', {
        body: {
          title: podcastTitle,
          description: skillDescription,
          skillName,
          proficiency,
          format: "beginner_friendly",
          duration: "short",
          voice: "en-US-Neural2-F" // Female voice
        },
      });
      
      if (error) {
        throw new Error(`Failed to generate podcast: ${error.message}`);
      }
      
      if (!data || !data.audioUrl) {
        throw new Error("No audio URL returned from podcast generator");
      }
      
      setAudioUrl(data.audioUrl);
      
      toast({
        title: "Podcast generated",
        description: "Your learning podcast is ready to play.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Podcast generation error:", error);
      setGenerationFailed(true);
      toast({
        title: "Failed to generate podcast",
        description: error.message || "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Skill Learning Podcast</h3>
            {!audioUrl && (
              <Button 
                onClick={handleGeneratePodcast}
                disabled={isGenerating || generationFailed}
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
          
          {audioUrl ? (
            <AudioPlayer audioUrl={audioUrl} />
          ) : (
            <div className="bg-muted rounded-md p-6 text-center">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Creating your personalized learning podcast...</p>
                  <p className="text-sm text-muted-foreground">This may take a minute or two</p>
                </div>
              ) : generationFailed ? (
                <div>
                  <p>Failed to generate podcast. Please try again later.</p>
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
