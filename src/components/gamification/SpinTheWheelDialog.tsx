
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SpinTheWheel from "@/components/gamification/SpinTheWheel";
import { Trophy, Sparkles, Gift, Check, ArrowRight, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface SpinTheWheelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const SpinTheWheelDialog: React.FC<SpinTheWheelDialogProps> = ({ open, onOpenChange }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showReward, setShowReward] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [spinCount, setSpinCount] = useState(1); // Track available spins
  const [showClaimSuccess, setShowClaimSuccess] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Reset dialog state when opened
  useEffect(() => {
    if (open) {
      setResult(null);
      setShowReward(false);
      setShowShareSuccess(false);
      setShowClaimSuccess(false);
      setRotation(0);
    }
  }, [open]);

  // Show reward after spinning completes
  useEffect(() => {
    if (result && !showReward) {
      const timer = setTimeout(() => {
        setShowReward(true);
        
        // Trigger confetti effect
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 }
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [result, showReward]);

  const handleSpin = () => {
    if (spinCount <= 0) {
      toast({
        title: "No spins available",
        description: "You don't have any spins remaining. Come back tomorrow for more!",
        variant: "destructive"
      });
      return;
    }

    setSpinning(true);
    setShowReward(false);
    
    // Determine a random reward
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const selectedReward = rewards[randomIndex];
    
    // Calculate the degrees to rotate to land on the selected reward
    // Each segment is 360 / number of rewards degrees
    const degreesPerSegment = 360 / rewards.length;
    // Add extra rotations for more spinning effect (5 full rotations + the target segment)
    const targetRotation = 1800 + (randomIndex * degreesPerSegment);
    
    // Set the rotation
    setRotation(targetRotation);
    
    // Simulate spin result after 3 seconds
    setTimeout(() => {
      setResult(selectedReward);
      setSpinning(false);
      
      // Reduce available spins
      setSpinCount(prev => prev - 1);
      
      toast({
        title: "You won a reward!",
        description: `Congratulations! You won ${selectedReward.name}!`,
      });
    }, 3000);
  };

  const handleClaimReward = () => {
    setShowClaimSuccess(true);
    
    // Trigger smaller confetti to celebrate claiming
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
    
    // Hide claim success and close dialog after a delay
    setTimeout(() => {
      toast({
        title: "Reward Claimed!",
        description: `${result.name} has been added to your account.`,
      });
      
      // Close dialog
      onOpenChange(false);
      
      // Reset states for next time
      setResult(null);
      setShowReward(false);
      setShowClaimSuccess(false);
    }, 2000);
  };

  const handleShareReward = () => {
    setShowShareSuccess(true);
    
    setTimeout(() => {
      toast({
        title: "Reward Shared!",
        description: "You've shared your reward with your friends and earned a bonus spin!",
      });
      
      // Give bonus spin for sharing
      setSpinCount(prev => prev + 1);
      
      // Reset share success state
      setShowShareSuccess(false);
    }, 1500);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "points":
        return <Trophy className="h-10 w-10 text-primary" />;
      case "badge":
        return <Sparkles className="h-10 w-10 text-amber-500" />;
      default:
        return <Gift className="h-10 w-10 text-purple-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Spin The Wheel</DialogTitle>
          <DialogDescription className="text-center">
            Try your luck and win amazing rewards! 
            {spinCount > 0 ? (
              <span className="font-medium"> You have {spinCount} spin{spinCount !== 1 ? 's' : ''} remaining.</span>
            ) : (
              <span className="font-medium text-amber-500"> Come back tomorrow for more spins!</span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          {showClaimSuccess ? (
            <div className="flex flex-col items-center justify-center p-6 animate-fade-in">
              <Check className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Successfully Claimed!</h3>
              <p className="text-center mb-4">
                {result.name} has been added to your account.
              </p>
            </div>
          ) : !showReward ? (
            <>
              <div 
                ref={wheelRef}
                className="w-full max-w-[300px] aspect-square relative" 
              >
                <div 
                  className="w-full h-full transition-transform duration-3000 ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <SpinTheWheel
                    spinning={spinning}
                    segments={rewards}
                    onSpinComplete={(segment) => setResult(segment)}
                  />
                </div>
                {/* Triangle indicator */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 z-10 w-0 h-0" style={{
                  borderLeft: '15px solid transparent',
                  borderRight: '15px solid transparent',
                  borderTop: '20px solid #ef4444'
                }}></div>
              </div>
              <Button 
                onClick={handleSpin} 
                disabled={spinning || spinCount <= 0}
                className="mt-4 px-8"
                size="lg"
              >
                {spinning ? "Spinning..." : "Spin Now"}
              </Button>
              {spinCount <= 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  No spins remaining. Share to earn a bonus spin!
                </p>
              )}
            </>
          ) : showShareSuccess ? (
            <div className="flex flex-col items-center justify-center p-6 animate-fade-in">
              <Check className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Successfully Shared!</h3>
              <p className="text-center mb-4">
                Thanks for sharing! You've earned a bonus spin.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 bg-secondary/20 rounded-lg animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {renderIcon(result?.type)}
              </div>
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="text-center mb-4">
                You won <span className="font-bold text-primary">{result?.name}</span>!
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button onClick={handleClaimReward} className="flex-1">
                  Claim Reward
                </Button>
                <Button onClick={handleShareReward} variant="outline" className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" />
                  Share (+1 Spin)
                </Button>
              </div>
              {spinCount > 0 && (
                <Button 
                  variant="ghost" 
                  className="mt-4 text-sm"
                  onClick={() => {
                    setShowReward(false);
                    setResult(null);
                  }}
                >
                  Spin Again ({spinCount} left) <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpinTheWheelDialog;
