
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioControlsProps {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onTimeUpdate: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  audioUrl?: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  duration,
  currentTime,
  volume,
  isMuted,
  onPlayPause,
  onSkipForward,
  onSkipBackward,
  onTimeUpdate,
  onVolumeChange,
  onToggleMute,
  audioUrl
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'podcast-audio.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={(values) => onTimeUpdate(values[0])}
          className="mx-2 flex-1"
        />
        <span className="text-xs">{formatTime(duration)}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSkipBackward}
            title="Skip 10 seconds backward"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSkipForward}
            title="Skip 10 seconds forward"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            onValueChange={(values) => onVolumeChange(values[0] / 100)}
            className="w-20"
          />
          
          {audioUrl && (
            <Button
              variant="ghost"
              size="icon"
              onClick={downloadAudio}
              title="Download audio"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
