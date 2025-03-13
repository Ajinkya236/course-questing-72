
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Mentor } from './types';

interface MentorDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentor: Mentor | null;
  onSendRequest: () => void;
}

const MentorDetailsDialog: React.FC<MentorDetailsDialogProps> = ({
  open,
  onOpenChange,
  mentor,
  onSendRequest
}) => {
  if (!mentor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mentor Details</DialogTitle>
          <DialogDescription>
            Review mentor information before sending a request
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">{mentor.name}</h3>
              <p className="text-muted-foreground">{mentor.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span className="text-sm">{mentor.rating}</span>
                <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold">Bio</h4>
              <p className="text-sm">{mentor.bio}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold">Experience</h4>
              <p className="text-sm">{mentor.experience}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold">Availability</h4>
              <p className="text-sm">{mentor.availability}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold">Expectations</h4>
              <p className="text-sm">{mentor.expectations}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold">Topics</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {mentor.topics.map(topic => (
                  <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSendRequest}>Send Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MentorDetailsDialog;
