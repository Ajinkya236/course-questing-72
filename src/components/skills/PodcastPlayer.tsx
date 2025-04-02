
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface PodcastPlayerProps {
  skillName: string;
  proficiency: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ skillName, proficiency }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const generatePodcast = async () => {
    setIsLoading(true);
    try {
      // Generate a conversation script first
      const scriptResponse = await supabase.functions.invoke('gemini-generate-transcript', {
        body: {
          skillName,
          proficiency
        }
      });

      if (scriptResponse.error) {
        throw new Error(`Script generation failed: ${scriptResponse.error.message}`);
      }

      const script = scriptResponse.data.generatedText;
      
      // Now generate the audio from the script
      const audioResponse = await supabase.functions.invoke('text-to-speech', {
        body: { script }
      });

      if (audioResponse.error) {
        throw new Error(`Audio generation failed: ${audioResponse.error.message}`);
      }

      // Convert base64 audio to URL
      const base64Audio = audioResponse.data.audioContent;
      const audioBlob = base64ToBlob(base64Audio, 'audio/mp3');
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      // Prepare audio player
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
      
      toast({
        title: "Podcast Generated",
        description: "Your microlearning podcast is ready to play!",
      });
    } catch (error) {
      console.error("Error generating podcast:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate podcast",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: mimeType });
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };
  
  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleSeek = (value: number[]) => {
    const seekTime = value[0];
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };
  
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
              onClick={generatePodcast} 
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
          <div className="space-y-4">
            <audio 
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              className="hidden"
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <Slider 
                value={[currentTime]} 
                min={0} 
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="mx-2 flex-1"
              />
              <span className="text-sm text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider 
                  value={[isMuted ? 0 : volume]} 
                  min={0} 
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24"
                />
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Button variant="ghost" size="icon" onClick={skipBackward}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={togglePlayPause} 
                  className="h-10 w-10 rounded-full"
                  variant="default"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={skipForward}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="w-24"></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>AI-generated podcast about {skillName} at {proficiency} level</p>
      </CardFooter>
    </Card>
  );
};

export default PodcastPlayer;
