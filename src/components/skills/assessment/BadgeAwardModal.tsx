
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Star, Trophy } from 'lucide-react';
import { SkillBadge } from './types';
import { proficiencyColors } from '@/data/skillsData';
import confetti from 'canvas-confetti';

interface BadgeAwardModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: SkillBadge | null;
  skillName?: string; // Added skillName prop as optional
}

const BadgeAwardModal: React.FC<BadgeAwardModalProps> = ({
  isOpen,
  onClose,
  badge,
  skillName
}) => {
  // Trigger confetti when modal is opened
  React.useEffect(() => {
    if (isOpen && badge) {
      launchConfetti();
    }
  }, [isOpen, badge]);

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!badge) return null;

  const badgeColors = badge.proficiency ? 
    proficiencyColors[badge.proficiency as keyof typeof proficiencyColors] : 
    'bg-primary/10 text-primary';

  // Use either the provided skillName or the badge's skillName
  const displaySkillName = skillName || badge.skillName;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Congratulations!</DialogTitle>
          <DialogDescription className="text-center text-base">
            You've earned a new skill badge!
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-8 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center mb-4 bg-primary/10 animate-pulse">
            {badge.imageUrl ? (
              <img 
                src={badge.imageUrl} 
                alt={`${displaySkillName} Badge`} 
                className="w-24 h-24 object-contain"
              />
            ) : (
              <Trophy className="w-16 h-16 text-primary" />
            )}
          </div>
          
          <h3 className="text-lg font-bold">{displaySkillName}</h3>
          
          <div className={`mt-2 px-3 py-1 rounded-full text-sm ${badgeColors}`}>
            {badge.proficiency} Level
          </div>
          
          <div className="mt-4 flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          
          <p className="mt-4 text-muted-foreground">
            Awarded on {new Date(badge.dateEarned).toLocaleDateString()}
          </p>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose}>
            <Award className="mr-2 h-4 w-4" />
            View My Badges
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeAwardModal;
