
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Gift, Star, Award, Sparkle, Rocket } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface MysteryBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample rewards
const possibleRewards = [
  { 
    id: 'points_small', 
    name: '100 Points', 
    description: 'A small boost to your learning journey', 
    icon: Star, 
    rarity: 'common',
    color: '#3b82f6'
  },
  { 
    id: 'points_medium', 
    name: '500 Points', 
    description: 'A solid reward for your efforts', 
    icon: Star, 
    rarity: 'uncommon',
    color: '#8b5cf6'
  },
  { 
    id: 'points_large', 
    name: '1000 Points', 
    description: 'A major point boost!', 
    icon: Star, 
    rarity: 'rare',
    color: '#f59e0b'
  },
  { 
    id: 'badge_engagement', 
    name: 'Engagement Badge', 
    description: 'For active participation in the learning community', 
    icon: Award, 
    rarity: 'uncommon',
    color: '#10b981'
  },
  { 
    id: 'badge_streak', 
    name: 'Learning Streak Badge', 
    description: 'For consistent daily learning', 
    icon: Rocket, 
    rarity: 'rare',
    color: '#ef4444'
  },
  { 
    id: 'exclusive_course', 
    name: 'Exclusive Course Access', 
    description: 'Special access to a premium learning course', 
    icon: Sparkle, 
    rarity: 'epic',
    color: '#6366f1'
  }
];

const MysteryBox: React.FC<MysteryBoxProps> = ({ open, onOpenChange }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [reward, setReward] = useState<(typeof possibleRewards)[0] | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const handleOpenBox = () => {
    if (isOpening) return;
    
    setIsOpening(true);
    
    // Randomize reward (could adjust probabilities based on rarity)
    const randomIndex = Math.floor(Math.random() * possibleRewards.length);
    const selectedReward = possibleRewards[randomIndex];
    setReward(selectedReward);
    
    // Simulate box opening animation
    setTimeout(() => {
      setIsOpening(false);
      setIsOpened(true);
      
      // Trigger confetti for all rewards (adjust based on rarity for real app)
      confetti({
        particleCount: selectedReward.rarity === 'epic' ? 200 : 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Show toast
      toast({
        title: "Mystery Box Opened!",
        description: `You've received: ${selectedReward.name}`,
      });
    }, 2000); // Animation timing
  };
  
  const resetBox = () => {
    setIsOpened(false);
    setReward(null);
  };
  
  // Reset box when dialog is closed
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => resetBox(), 300); // Reset after close animation
    }
    onOpenChange(newOpen);
  };
  
  // Get rarity class
  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-blue-500/20 border-blue-500';
      case 'uncommon': return 'bg-green-500/20 border-green-500';
      case 'rare': return 'bg-purple-500/20 border-purple-500';
      case 'epic': return 'bg-amber-500/20 border-amber-500';
      default: return 'bg-gray-500/20 border-gray-500';
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-2">Mystery Box</DialogTitle>
          <DialogDescription className="text-center">
            Open the box to discover your surprise reward!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8 relative">
          {!isOpened ? (
            // Unopened box
            <div 
              ref={boxRef}
              className={`relative w-40 h-40 cursor-pointer transition-all duration-300 ${isOpening ? 'animate-pulse' : 'hover:scale-105'}`}
              onClick={!isOpening ? handleOpenBox : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg shadow-xl border-2 border-white/30 flex items-center justify-center">
                <div className={`w-full h-full flex items-center justify-center ${isOpening ? 'animate-spin' : ''}`}>
                  <Gift className={`h-20 w-20 text-primary ${isOpening ? 'opacity-50' : ''}`} />
                </div>
                
                {isOpening && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Sparkles around the box */}
                <div className="absolute -top-2 -right-2">
                  <Sparkle className="h-6 w-6 text-yellow-400 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Sparkle className="h-6 w-6 text-purple-400 animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            // Revealed reward
            <div className="flex flex-col items-center text-center">
              {reward && (
                <div className={`p-8 rounded-lg ${getRarityClass(reward.rarity)} border animate-scale-in`}>
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-4 mx-auto"
                    style={{ backgroundColor: `${reward.color}20`, color: reward.color }}
                  >
                    {React.createElement(reward.icon, { className: 'h-12 w-12' })}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                  
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium capitalize" style={{ backgroundColor: `${reward.color}20`, color: reward.color }}>
                    {reward.rarity} Reward
                  </div>
                </div>
              )}
            </div>
          )}
          
          <Button 
            onClick={isOpened ? resetBox : handleOpenBox} 
            disabled={isOpening}
            className="mt-6"
          >
            {isOpened ? 'Claim Reward' : (isOpening ? 'Opening...' : 'Open Mystery Box')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MysteryBox;
