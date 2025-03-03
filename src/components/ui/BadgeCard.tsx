
import React, { useState } from 'react';
import { Share2, Info, Download, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface BadgeProps {
  id: string;
  name: string;
  description: string;
  image: string;
  dateEarned?: string;
  category: string;
  isLocked?: boolean;
  progress?: number;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  expiresOn?: string;
}

const BadgeCard: React.FC<BadgeProps> = ({
  id,
  name,
  description,
  image,
  dateEarned,
  category,
  isLocked = false,
  progress = 0,
  rarity = 'Common',
  expiresOn,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine rarity color
  const rarityColorMap = {
    Common: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    Rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    Epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    Legendary: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  };

  const getBadgeGlow = () => {
    if (isLocked) return '';
    
    switch (rarity) {
      case 'Legendary':
        return 'before:bg-amber-500/30 before:animate-pulse';
      case 'Epic':
        return 'before:bg-purple-500/30 before:animate-pulse';
      case 'Rare':
        return 'before:bg-blue-500/20 before:animate-pulse';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-xl card-glass cursor-pointer badge-glow ${getBadgeGlow()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Image */}
      <div className="relative aspect-square p-6 flex items-center justify-center bg-gradient-to-b from-transparent via-gray-50/50 to-gray-100/50 dark:from-transparent dark:via-gray-900/20 dark:to-gray-900/30">
        <div className={`relative transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${isLocked ? 'opacity-30 filter grayscale' : ''}`}>
          <img 
            src={image} 
            alt={name} 
            className={`w-28 h-28 object-contain drop-shadow-md`}
          />
          
          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        {/* Rarity indicator */}
        <Badge className={`${rarityColorMap[rarity]} absolute top-3 right-3`}>
          {rarity}
        </Badge>
        
        {/* Category badge */}
        <Badge variant="outline" className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 text-center">
        <h3 className="text-base font-semibold leading-tight">{name}</h3>
        
        {!isLocked && dateEarned && (
          <div className="flex items-center justify-center text-xs text-muted-foreground">
            <Award className="h-3 w-3 mr-1" />
            Earned on {dateEarned}
          </div>
        )}
        
        {isLocked && progress > 0 && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="text-xs text-muted-foreground mt-1">Progress: {progress}%</div>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Hover actions */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3 p-6 text-white">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-center">{description}</p>
          
          {expiresOn && (
            <div className="text-xs text-gray-300">Expires on {expiresOn}</div>
          )}
          
          <div className="flex space-x-2 pt-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {!isLocked && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
