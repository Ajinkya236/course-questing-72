
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SessionNotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  initialNotes?: string;
  sessionTitle?: string;
  sessionDate?: string;
  isViewOnly?: boolean;
}

const SessionNotesDialog: React.FC<SessionNotesDialogProps> = ({
  open,
  onOpenChange,
  sessionId,
  initialNotes = '',
  sessionTitle = 'Session',
  sessionDate,
  isViewOnly = false,
}) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (isViewOnly) return;
    
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      
      toast({
        title: "Notes saved",
        description: "Your session notes have been saved successfully.",
      });
      
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isViewOnly ? 'Session Notes' : 'Edit Session Notes'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div>
            <h3 className="font-medium">{sessionTitle}</h3>
            {sessionDate && <p className="text-sm text-muted-foreground">{sessionDate}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter your session notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px]"
              readOnly={isViewOnly}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isViewOnly ? 'Close' : 'Cancel'}
          </Button>
          
          {!isViewOnly && (
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notes
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionNotesDialog;
