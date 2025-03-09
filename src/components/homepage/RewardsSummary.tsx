
import React, { useState } from 'react';
import { Trophy, Award, Gift, Zap, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MysteryBox from '@/components/gamification/MysteryBox';
import { useToast } from '@/hooks/use-toast';

interface RewardsSummaryProps {
  rank?: number;
  points?: number;
  badges?: number;
  streakDays?: number;
  onSpinWheel?: () => void;
  onOpenMysteryBox?: () => void;
  onRedeemPoints?: () => void;
}

const RewardsSummary: React.FC<RewardsSummaryProps> = ({
  rank = 23,
  points = 1250,
  badges = 12,
  streakDays = 15,
  onSpinWheel,
  onOpenMysteryBox,
  onRedeemPoints
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  
  const handleSpinWheel = () => {
    if (onSpinWheel) {
      onSpinWheel();
    } else {
      toast({
        title: "Spin the Wheel",
        description: "Coming soon! Spin the wheel to win amazing rewards.",
      });
    }
  };
  
  const handleOpenMysteryBox = () => {
    setIsBoxOpening(true);
    
    // Simulate opening animation
    setTimeout(() => {
      setIsBoxOpening(false);
      
      if (onOpenMysteryBox) {
        onOpenMysteryBox();
      } else {
        toast({
          title: "Congratulations!",
          description: "You've earned 50 bonus points from the Mystery Box!",
        });
      }
    }, 2000);
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Summary of My Rewards</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/my-learning?tab=rewards')}
          >
            View Details
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <div className="rounded-full bg-primary/10 p-2 mr-3">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Rank</p>
              <p className="text-lg font-medium">#{rank}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="rounded-full bg-primary/10 p-2 mr-3">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
              <p className="text-lg font-medium">{badges}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="rounded-full bg-primary/10 p-2 mr-3">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-lg font-medium">{points}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="rounded-full bg-primary/10 p-2 mr-3">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Learning Streak</p>
              <p className="text-lg font-medium">{streakDays} days</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border overflow-hidden h-32">
            <div className="h-full flex items-center justify-center cursor-pointer" onClick={handleSpinWheel}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm font-medium">Spin the Wheel</p>
                <p className="text-xs text-muted-foreground">Try your luck daily</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border overflow-hidden h-32">
            <div className="h-full" onClick={handleOpenMysteryBox}>
              <MysteryBox isOpening={isBoxOpening} />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full" 
            onClick={onRedeemPoints || (() => navigate('/my-learning?tab=rewards'))}
          >
            <Gift className="h-4 w-4 mr-2" /> Redeem {points} Points
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RewardsSummary;
