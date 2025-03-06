
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (note: string) => void;
}

const NoteDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit 
}: NoteDialogProps) => {
  const [note, setNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  
  const handleSubmit = () => {
    onSubmit(note);
    setNote('');
  };
  
  const isFormValid = note.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Journal Entry</DialogTitle>
          <DialogDescription>
            Keep track of your learnings and reflections from this mentorship.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div>
            <Label htmlFor="note" className="block mb-2">
              Journal Entry
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What did you learn today? What reflections do you have about your mentorship journey?"
              className="h-40"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="private"
              checked={isPrivate}
              onCheckedChange={(checked) => setIsPrivate(checked === true)}
            />
            <Label htmlFor="private" className="text-sm">
              Keep this entry private (visible only to you)
            </Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Save Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
