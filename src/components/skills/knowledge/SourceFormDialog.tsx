
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SourceType } from './types';

interface SourceFormDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sourceContent: string;
  setSourceContent: React.Dispatch<React.SetStateAction<string>>;
  sourceDescription: string;
  setSourceDescription: React.Dispatch<React.SetStateAction<string>>;
  sourceType: SourceType;
  setSourceType: React.Dispatch<React.SetStateAction<SourceType>>;
  onAddOrUpdateSource: () => void;
  isEditing: boolean;
}

const SourceFormDialog: React.FC<SourceFormDialogProps> = ({
  isOpen,
  setIsOpen,
  sourceContent,
  setSourceContent,
  sourceDescription,
  setSourceDescription,
  sourceType,
  setSourceType,
  onAddOrUpdateSource,
  isEditing
}) => {
  const handleSave = () => {
    onAddOrUpdateSource();
  };

  const handleTypeChange = (value: string) => {
    setSourceType(value as SourceType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Knowledge Source</DialogTitle>
          <DialogDescription>
            Add sources such as URLs, articles, documents or your own notes to enhance the AI's understanding.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <RadioGroup 
            defaultValue={sourceType} 
            value={sourceType}
            onValueChange={handleTypeChange}
            className="grid grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="link" id="link" />
              <Label htmlFor="link">URL / Link</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text">Notes / Text</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="file" id="file" />
              <Label htmlFor="file">File Reference</Label>
            </div>
          </RadioGroup>
          
          <div className="grid gap-2">
            <Label htmlFor="source-content">
              {sourceType === 'link' ? 'URL' : 
               sourceType === 'file' ? 'File Reference' : 'Text Content'}
            </Label>
            {sourceType === 'text' ? (
              <Textarea
                id="source-content"
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                placeholder={
                  sourceType === 'text' ? 'Enter your notes, information or content...' :
                  sourceType === 'link' ? 'https://example.com' : 
                  'Reference to file or document'
                }
                className="min-h-[100px]"
              />
            ) : (
              <Input
                id="source-content"
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                placeholder={
                  sourceType === 'link' ? 'https://example.com' : 
                  'Reference to file or document'
                }
              />
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="source-description">Description (Optional)</Label>
            <Input
              id="source-description"
              value={sourceDescription}
              onChange={(e) => setSourceDescription(e.target.value)}
              placeholder="Brief description of this source"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!sourceContent.trim()}
          >
            {isEditing ? 'Update' : 'Add'} Source
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SourceFormDialog;
