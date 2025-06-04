
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Award } from "lucide-react";

interface H5PPlayerProps {
  title: string;
  description?: string;
  coverImage?: string;
  earnablePoints?: number;
}

const H5PPlayer: React.FC<H5PPlayerProps> = ({ 
  title, 
  description, 
  coverImage = "/placeholder.svg",
  earnablePoints
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  return (
    <Card className="modern-card overflow-hidden">
      <div className="relative aspect-video bg-gray-900">
        {!isPlaying ? (
          <>
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <Button 
                size="lg" 
                variant="ghost" 
                className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary text-white"
                onClick={() => setIsPlaying(true)}
              >
                <Play className="h-8 w-8" />
              </Button>
              {earnablePoints && (
                <div className="mt-4 flex items-center gap-2 bg-black/60 rounded-full px-4 py-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="font-medium">Earn {earnablePoints} points</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-gray-900 w-full h-full flex items-center justify-center text-white">
            {/* This is where the actual H5P content would be rendered */}
            <p className="text-lg">H5P Content is playing...</p>
          </div>
        )}
        
        {/* Player Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8" 
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <span className="h-3 w-3 bg-white rounded"></span>
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8" 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="text-sm text-white/80 ml-2">01:24 / 15:30</div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: "15%" }}></div>
          </div>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default H5PPlayer;
