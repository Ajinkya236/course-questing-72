
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SkillBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name?: string;
    image?: string;
    description?: string;
    level?: string;
    skill?: string;
  };
  skillName?: string;
}

export const SkillBadgeModal: React.FC<SkillBadgeModalProps> = ({
  isOpen,
  onClose,
  badge,
  skillName
}) => {
  if (!badge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Congratulations! 🎉</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          {badge.image ? (
            <div className="rounded-full bg-primary/10 p-2 w-32 h-32 flex items-center justify-center">
              <img 
                src={badge.image} 
                alt={badge.name || 'Skill Badge'} 
                className="w-24 h-24 object-contain"
              />
            </div>
          ) : (
            <div className="rounded-full bg-primary/10 p-6 w-32 h-32 flex items-center justify-center">
              <span className="text-5xl">🏆</span>
            </div>
          )}
          
          <h3 className="text-xl font-bold">
            {badge.name || `${skillName || 'Skill'} Badge Earned!`}
          </h3>
          
          <p className="text-muted-foreground">
            {badge.description || `You have successfully demonstrated your ${badge.level || ''} proficiency in ${badge.skill || skillName || 'this skill'}.`}
          </p>
          
          <div className="flex gap-2 mt-4">
            <Button variant="default" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline">
              Share Achievement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillBadgeModal;
