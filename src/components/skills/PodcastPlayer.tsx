
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import AudioPlayer from './podcast/AudioPlayer';
import { generatePodcast } from './podcast/utils';

interface PodcastPlayerProps {
  skillName: string;
  proficiency: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ skillName, proficiency }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const handleGeneratePodcast = async () => {
    setIsLoading(true);
    try {
      const url = await generatePodcast(skillName, proficiency);
      if (url) {
        setAudioUrl(url);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Skill Microlearning Podcast</CardTitle>
      </CardHeader>
      <CardContent>
        {!audioUrl ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Generate a short podcast about {skillName} at {proficiency} level featuring a conversation 
              between two experts.
            </p>
            <Button 
              onClick={handleGeneratePodcast} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Podcast"
              )}
            </Button>
          </div>
        ) : (
          <AudioPlayer audioUrl={audioUrl} />
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>AI-generated podcast about {skillName} at {proficiency} level</p>
      </CardFooter>
    </Card>
  );
};

export default PodcastPlayer;
