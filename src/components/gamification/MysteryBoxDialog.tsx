
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MysteryBox from "@/components/gamification/MysteryBox";
import { Gift, Award, Zap, BookOpen, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface MysteryBoxDialogProps {
  open: boolean;
  onClose: () => void;
}

const possibleRewards = [
  { type: "points", value: 500, icon: <DollarSign className="h-8 w-8 text-amber-500" />, label: "500 Points" },
  { type: "points", value: 250, icon: <DollarSign className="h-8 w-8 text-amber-500" />, label: "250 Points" },
  { type: "points", value: 100, icon: <DollarSign className="h-8 w-8 text-amber-500" />, label: "100 Points" },
  { type: "badge", value: "Leadership Master", icon: <Award className="h-8 w-8 text-blue-500" />, label: "Leadership Master Badge" },
  { type: "badge", value: "Curious Mind", icon: <Award className="h-8 w-8 text-purple-500" />, label: "Curious Mind Badge" },
  { type: "multiplier", value: 2, icon: <Zap className="h-8 w-8 text-orange-500" />, label: "2x Points Multiplier for 24 hours" },
  { type: "course", value: "Premium Access", icon: <BookOpen className="h-8 w-8 text-green-500" />, label: "Premium Course Access" },
];

const MysteryBoxDialog: React.FC<MysteryBoxDialogProps> = ({ open, onClose }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [reward, setReward] = useState<any>(null);
  const [boxOpened, setBoxOpened] = useState(false);
  const { toast } = useToast();

  const handleOpenBox = () => {
    setIsOpening(true);
    
    // Simulate opening box
    setTimeout(() => {
      const randomReward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];
      setReward(randomReward);
      setBoxOpened(true);
      setIsOpening(false);
      
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
      
      toast({
        title: "Mystery Box Opened!",
        description: `You received: ${randomReward.label}`,
      });
    }, 2000);
  };

  const handleClaimReward = () => {
    toast({
      title: "Reward Claimed!",
      description: `${reward.label} has been added to your account.`,
    });
    onClose();
    // Reset state for next open
    setReward(null);
    setBoxOpened(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Mystery Box</DialogTitle>
          <DialogDescription className="text-center">
            Open the box to reveal your surprise reward!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6">
          {!boxOpened ? (
            <>
              <div className="w-full max-w-[200px] aspect-square">
                <MysteryBox isOpening={isOpening} />
              </div>
              <Button 
                onClick={handleOpenBox} 
                disabled={isOpening}
                className="mt-6 px-8"
                size="lg"
              >
                {isOpening ? "Opening..." : "Open Box"}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 bg-secondary/20 rounded-lg animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {reward.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">Amazing Reward!</h3>
              <p className="text-center mb-4">
                You received <span className="font-bold text-primary">{reward.label}</span>!
              </p>
              <Button onClick={handleClaimReward} className="w-full">
                Claim Reward
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MysteryBoxDialog;
