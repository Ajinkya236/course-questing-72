
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { formatTime } from './utils';

interface AudioControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  onPlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onSeek: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  onToggleMute: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onPlayPause,
  onSkipBackward,
  onSkipForward,
  onSeek,
  onVolumeChange,
  onToggleMute
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {formatTime(currentTime)}
        </span>
        <Slider 
          value={[currentTime]} 
          min={0} 
          max={duration || 100}
          step={0.1}
          onValueChange={onSeek}
          className="mx-2 flex-1"
        />
        <span className="text-sm text-muted-foreground">
          {formatTime(duration)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onToggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider 
            value={[isMuted ? 0 : volume]} 
            min={0} 
            max={1}
            step={0.01}
            onValueChange={onVolumeChange}
            className="w-24"
          />
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onSkipBackward}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button 
            onClick={onPlayPause} 
            className="h-10 w-10 rounded-full"
            variant="default"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onSkipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="w-24"></div>
      </div>
    </div>
  );
};

export default AudioControls;
