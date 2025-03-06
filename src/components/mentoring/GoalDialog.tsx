
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface GoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (goal: string) => void;
}

const GoalDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit 
}: GoalDialogProps) => {
  const [goal, setGoal] = useState('');
  const [timeframe, setTimeframe] = useState('medium');
  
  const handleSubmit = () => {
    onSubmit(goal);
    setGoal('');
  };
  
  const isFormValid = goal.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Set Mentorship Goal</DialogTitle>
          <DialogDescription>
            Define clear, achievable goals for your mentorship journey.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div>
            <Label htmlFor="goal" className="block mb-2">
              Goal Description
            </Label>
            <Textarea
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="What specific outcome would you like to achieve through this mentorship? Be specific and measurable."
              className="h-32"
            />
          </div>
          
          <div>
            <Label className="block mb-2">
              Timeframe
            </Label>
            <RadioGroup value={timeframe} onValueChange={setTimeframe}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="timeframe-short" />
                <Label htmlFor="timeframe-short">Short-term (1-4 weeks)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="timeframe-medium" />
                <Label htmlFor="timeframe-medium">Medium-term (1-3 months)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="timeframe-long" />
                <Label htmlFor="timeframe-long">Long-term (3+ months)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Add Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
