
import React, { useState } from 'react';
import { Trophy, Award, Gift, Zap, Flame, Crown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import MysteryBox from '@/components/gamification/MysteryBox';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';

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
  onRedeemPoints
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  const [showMysteryBoxDialog, setShowMysteryBoxDialog] = useState(false);
  const [showSpinWheelDialog, setShowSpinWheelDialog] = useState(false);
  
  // Calculate progress to next milestone (e.g., 2000 points)
  const nextMilestone = 2000;
  const progress = Math.min(100, (points / nextMilestone) * 100);
  
  const handleSpinWheel = () => {
    setShowSpinWheelDialog(true);
  };
  
  const handleOpenMysteryBox = () => {
    setShowMysteryBoxDialog(true);
  };

  return (
    <>
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold flex items-center">
              <Crown className="h-5 w-5 mr-2" /> My Rewards
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-white hover:bg-white/20"
              onClick={() => navigate('/my-learning?tab=rewards')}
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-5">
          {/* Progress to next milestone */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress to next milestone</span>
              <span className="text-sm font-bold">{points}/{nextMilestone} pts</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 flex items-center shadow-sm">
              <div className="rounded-full bg-blue-100 p-3 mr-3">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Current Rank</p>
                <p className="text-xl font-bold text-gray-900">#{rank}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 flex items-center shadow-sm">
              <div className="rounded-full bg-purple-100 p-3 mr-3">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Badges Earned</p>
                <p className="text-xl font-bold text-gray-900">{badges}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 flex items-center shadow-sm">
              <div className="rounded-full bg-teal-100 p-3 mr-3">
                <Zap className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Points</p>
                <p className="text-xl font-bold text-gray-900">{points}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 flex items-center shadow-sm">
              <div className="rounded-full bg-orange-100 p-3 mr-3">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Learning Streak</p>
                <p className="text-xl font-bold text-gray-900">{streakDays} days</p>
              </div>
            </div>
          </div>
          
          {/* Interactive reward elements */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 overflow-hidden h-32 hover:border-blue-400 transition-colors">
              <div className="h-full flex items-center justify-center cursor-pointer hover:bg-blue-100/50 transition-colors" onClick={handleSpinWheel}>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium">Spin the Wheel</p>
                  <p className="text-xs text-muted-foreground">Try your luck daily</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border-2 border-dashed border-purple-200 bg-purple-50 overflow-hidden h-32 hover:border-purple-400 transition-colors">
              <div className="h-full cursor-pointer" onClick={handleOpenMysteryBox}>
                <MysteryBox isOpening={isBoxOpening} />
              </div>
            </div>
          </div>
          
          {/* Redeem points button */}
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={onRedeemPoints || (() => navigate('/my-learning?tab=rewards'))}
          >
            <Gift className="h-4 w-4 mr-2" /> Redeem {points} Points
          </Button>
        </CardContent>
      </Card>

      {/* Dialogs for gamification elements */}
      <SpinTheWheelDialog 
        open={showSpinWheelDialog}
        onOpenChange={setShowSpinWheelDialog}
      />
      
      <MysteryBoxDialog
        open={showMysteryBoxDialog}
        onOpenChange={setShowMysteryBoxDialog}
      />
    </>
  );
};

export default RewardsSummary;
