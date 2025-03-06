
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

const TaskDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit 
}: TaskDialogProps) => {
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  
  const handleSubmit = () => {
    onSubmit();
    setNotes('');
    setFiles(null);
  };
  
  const isFormValid = files !== null || notes.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Task</DialogTitle>
          <DialogDescription>
            Upload your task completion or progress.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div>
            <Label htmlFor="files" className="block mb-2">
              Upload Files
            </Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
              <Input
                id="files"
                type="file"
                className="hidden"
                onChange={(e) => setFiles(e.target.files)}
                multiple
              />
              <Label htmlFor="files" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium mb-1">
                    {files ? `${files.length} file(s) selected` : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG (max 10MB)
                  </p>
                </div>
              </Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes" className="block mb-2">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any comments or context for your submission..."
              className="h-24"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Submit Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
