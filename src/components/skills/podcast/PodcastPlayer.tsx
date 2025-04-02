
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { generatePodcast } from './PodcastUtils';
import AudioPlayer from './AudioPlayer';

export interface PodcastPlayerProps {
  skillName: string;
  skillDescription: string;
  proficiency: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  skillName,
  skillDescription,
  proficiency
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGeneratePodcast = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generatePodcast(skillName, skillDescription, proficiency);

      if (response.error) {
        setError(response.error);
        toast({
          title: "Failed to generate podcast",
          description: response.error,
          variant: "destructive",
        });
      } else if (response.audioUrl) {
        setAudioUrl(response.audioUrl);
        toast({
          title: "Podcast generated",
          description: "Your microlearning podcast is ready to play",
          variant: "default",
        });
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Headphones className="h-5 w-5 text-primary" />
          Microlearning Podcast
        </CardTitle>
      </CardHeader>
      <CardContent>
        {audioUrl ? (
          <AudioPlayer 
            audioUrl={audioUrl} 
            title={`${skillName} - Microlearning Podcast`} 
            subtitle={`${proficiency} level overview`}
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Generate a short podcast explaining the key concepts of {skillName} at {proficiency} level.
            </p>
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            <Button
              onClick={handleGeneratePodcast}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <Spinner className="mr-2" /> : <Headphones className="mr-2 h-4 w-4" />}
              Generate Podcast
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PodcastPlayer;
