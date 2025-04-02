
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume, Volume2, VolumeX } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  onPlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onTimeUpdate: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

// Format time in MM:SS
const formatTime = (time: number): string => {
  if (isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  duration,
  currentTime,
  volume,
  isMuted,
  onPlayPause,
  onSkipBackward,
  onSkipForward,
  onTimeUpdate,
  onVolumeChange,
  onToggleMute
}) => {
  // Get volume icon based on current state
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.5) return <Volume className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center space-x-2">
        <span className="text-xs tabular-nums">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={1}
          onValueChange={(value) => onTimeUpdate(value[0])}
          className="flex-1"
        />
        <span className="text-xs tabular-nums">{formatTime(duration)}</span>
      </div>
      
      {/* Playback controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full" 
            onClick={onSkipBackward}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="h-10 w-10 p-0 rounded-full" 
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full" 
            onClick={onSkipForward}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center space-x-2 w-32">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full" 
            onClick={onToggleMute}
          >
            {getVolumeIcon()}
          </Button>
          
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onVolumeChange(value[0] / 100)}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
