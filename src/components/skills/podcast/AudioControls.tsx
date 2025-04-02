
import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioControlsProps {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  onPlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onTimeUpdate: (value: number) => void;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
}

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
  // Format time in MM:SS
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={1}
          onValueChange={(value) => onTimeUpdate(value[0])}
          className="flex-grow"
        />
        <span className="text-xs text-gray-500">{formatTime(duration)}</span>
      </div>

      {/* Playback controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSkipBackward}
          title="Rewind 10 seconds"
        >
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          className="h-10 w-10 rounded-full"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onSkipForward}
          title="Forward 10 seconds"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Volume control */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
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
  );
};

export default AudioControls;
