
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SpinTheWheel from "@/components/gamification/SpinTheWheel";
import { Trophy, Sparkles, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface SpinTheWheelDialogProps {
  open: boolean;
  onClose: () => void;
}

const rewards = [
  { id: 1, name: "500 Points", value: 500, type: "points", color: "#4CAF50" },
  { id: 2, name: "Leadership Badge", value: "Leadership", type: "badge", color: "#2196F3" },
  { id: 3, name: "100 Points", value: 100, type: "points", color: "#FFC107" },
  { id: 4, name: "2x Multiplier", value: "2x", type: "multiplier", color: "#9C27B0" },
  { id: 5, name: "200 Points", value: 200, type: "points", color: "#F44336" },
  { id: 6, name: "Premium Course", value: "Premium", type: "course", color: "#3F51B5" },
  { id: 7, name: "50 Points", value: 50, type: "points", color: "#FF9800" },
  { id: 8, name: "Mystery Reward", value: "Mystery", type: "mystery", color: "#607D8B" },
];

const SpinTheWheelDialog: React.FC<SpinTheWheelDialogProps> = ({ open, onClose }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showReward, setShowReward] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setShowReward(true);
        
        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleSpin = () => {
    setSpinning(true);
    setShowReward(false);
    
    // Simulate spin result after 3 seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rewards.length);
      setResult(rewards[randomIndex]);
      setSpinning(false);
      
      toast({
        title: "You won a reward!",
        description: `Congratulations! You won ${rewards[randomIndex].name}!`,
      });
    }, 3000);
  };

  const handleClaimReward = () => {
    toast({
      title: "Reward Claimed!",
      description: `${result.name} has been added to your account.`,
    });
    onClose();
    setResult(null);
    setShowReward(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Spin The Wheel</DialogTitle>
          <DialogDescription className="text-center">
            Try your luck and win amazing rewards!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          {!showReward ? (
            <>
              <div className="w-full max-w-[300px] aspect-square">
                <SpinTheWheel
                  spinning={spinning}
                  segments={rewards}
                  onSpinComplete={(segment) => setResult(segment)}
                />
              </div>
              <Button 
                onClick={handleSpin} 
                disabled={spinning}
                className="mt-4 px-8"
                size="lg"
              >
                {spinning ? "Spinning..." : "Spin Now"}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 bg-secondary/20 rounded-lg animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {result.type === "points" && <Trophy className="h-10 w-10 text-primary" />}
                {result.type === "badge" && <Sparkles className="h-10 w-10 text-amber-500" />}
                {(result.type === "multiplier" || result.type === "course" || result.type === "mystery") && (
                  <Gift className="h-10 w-10 text-purple-500" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="text-center mb-4">
                You won <span className="font-bold text-primary">{result.name}</span>!
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

export default SpinTheWheelDialog;
