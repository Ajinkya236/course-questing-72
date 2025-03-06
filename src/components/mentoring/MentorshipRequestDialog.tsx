
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface MentorshipRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentor: {
    id: string;
    name: string;
    role: string;
    department: string;
    avatarUrl?: string;
    topics: string[];
  };
  onSubmit: (topic: string, message: string) => void;
}

const MentorshipRequestDialog = ({ 
  open, 
  onOpenChange, 
  mentor, 
  onSubmit 
}: MentorshipRequestDialogProps) => {
  const [selectedTopic, setSelectedTopic] = useState(mentor.topics[0] || '');
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleSubmit = () => {
    onSubmit(selectedTopic, message);
  };
  
  const isFormValid = selectedTopic !== '' && message.trim() !== '' && termsAccepted;
  
  // Get initials for avatar fallback
  const initials = mentor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Mentorship</DialogTitle>
          <DialogDescription>
            Send a request to {mentor.name} for mentorship.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-4 py-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={mentor.avatarUrl} alt={mentor.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{mentor.name}</h3>
            <p className="text-sm text-muted-foreground">{mentor.role}</p>
          </div>
        </div>
        
        <div className="space-y-4 my-2">
          <div>
            <Label htmlFor="topic" className="block mb-2">
              Select Topic
            </Label>
            <RadioGroup value={selectedTopic} onValueChange={setSelectedTopic}>
              {mentor.topics.map(topic => (
                <div key={topic} className="flex items-center space-x-2">
                  <RadioGroupItem value={topic} id={`topic-${topic}`} />
                  <Label htmlFor={`topic-${topic}`}>{topic}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="message" className="block mb-2">
              Message to Mentor
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain why you'd like to be mentored on this topic..."
              className="h-32"
            />
          </div>
          
          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <Label htmlFor="terms" className="text-sm">
              I confirm this is a genuine request and I'll be responsive to my mentor's communications. I understand I can have a maximum of 2 active engagements at a time.
            </Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MentorshipRequestDialog;
