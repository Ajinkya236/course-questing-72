
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Award, Gift, TrendingUp, Zap, Star, Trophy } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface SpinTheWheelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample wheel segments
const wheelSegments = [
  { label: '500 Points', color: '#3b82f6', icon: Star, reward: '500 Points' },
  { label: '2x Multiplier', color: '#8b5cf6', icon: Zap, reward: '2x Points Multiplier for next course' },
  { label: 'Badge', color: '#10b981', icon: Award, reward: 'Fast Learner Badge' },
  { label: 'Try Again', color: '#6b7280', icon: TrendingUp, reward: 'Better luck next time' },
  { label: '1000 Points', color: '#ef4444', icon: Trophy, reward: '1000 Points' },
  { label: 'Mystery Gift', color: '#f59e0b', icon: Gift, reward: 'Special access to premium course' },
  { label: '100 Points', color: '#6366f1', icon: Star, reward: '100 Points' },
  { label: 'Try Again', color: '#6b7280', icon: TrendingUp, reward: 'Better luck next time' },
];

const SpinTheWheel: React.FC<SpinTheWheelProps> = ({ open, onOpenChange }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowReward(false);
    
    // Random number of full rotations (2-5) plus random segment
    const fullRotations = 2 + Math.floor(Math.random() * 4); // 2-5 rotations
    const segmentIndex = Math.floor(Math.random() * wheelSegments.length);
    const segmentDegrees = 360 / wheelSegments.length;
    const segmentOffset = segmentIndex * segmentDegrees;
    
    // Calculate final rotation (multiple full rotations + segment)
    // Add a small random offset within the segment for more randomness
    const randomOffset = Math.random() * (segmentDegrees * 0.5) - (segmentDegrees * 0.25);
    const totalRotation = fullRotations * 360 + segmentOffset + randomOffset;
    
    setRotationDegrees(totalRotation);
    setSelectedSegment(segmentIndex);
    
    // Show reward after spinning animation completes
    setTimeout(() => {
      setIsSpinning(false);
      setShowReward(true);
      
      // Trigger confetti if it's a good reward
      if (['500 Points', '1000 Points', 'Badge', '2x Multiplier', 'Mystery Gift'].includes(wheelSegments[segmentIndex].reward)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      // Show toast
      toast({
        title: "Reward Earned!",
        description: `You've won: ${wheelSegments[segmentIndex].reward}`,
      });
    }, 5000); // Match this with the CSS transition duration
  };
  
  const resetWheel = () => {
    setRotationDegrees(0);
    setSelectedSegment(null);
    setShowReward(false);
  };
  
  // Reset wheel when dialog is opened
  useEffect(() => {
    if (open) {
      resetWheel();
    }
  }, [open]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-2">Spin The Wheel</DialogTitle>
          <DialogDescription className="text-center">
            Test your luck and win points, badges or special rewards!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4 relative">
          {/* Wheel */}
          <div className="relative w-64 h-64 mb-6">
            {/* Wheel pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary z-10"></div>
            
            {/* Wheel */}
            <div 
              ref={wheelRef}
              className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 shadow-lg transition-transform duration-5000 ease-out"
              style={{ transform: `rotate(${rotationDegrees}deg)` }}
            >
              {wheelSegments.map((segment, index) => {
                const segmentDegrees = 360 / wheelSegments.length;
                const rotation = index * segmentDegrees;
                const SegmentIcon = segment.icon;
                
                return (
                  <div 
                    key={index}
                    className="absolute top-0 left-0 w-full h-full origin-center"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div 
                      className="absolute top-0 left-0 right-0 h-1/2 origin-bottom"
                      style={{ 
                        backgroundColor: segment.color,
                        clipPath: `polygon(0 0, 100% 0, 50% 100%)` 
                      }}
                    >
                      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 text-white text-xs font-bold flex flex-col items-center">
                        <SegmentIcon className="h-4 w-4 mb-1" />
                        <span className="text-center whitespace-nowrap" style={{ transform: `rotate(180deg)` }}>
                          {segment.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Spin button */}
          <Button 
            onClick={handleSpin} 
            disabled={isSpinning}
            className="mt-4 px-6"
          >
            {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
          </Button>
          
          {/* Reward popup */}
          {showReward && selectedSegment !== null && (
            <div className="mt-6 p-4 text-center bg-secondary rounded-lg animate-fade-in">
              <h3 className="text-lg font-semibold mb-2">
                Congratulations!
              </h3>
              <div className="flex items-center justify-center gap-2 text-primary">
                {React.createElement(wheelSegments[selectedSegment].icon, { className: 'h-5 w-5' })}
                <span className="font-medium">You won: {wheelSegments[selectedSegment].reward}</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpinTheWheel;
