
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle, Upload, Link as LinkIcon, FileText } from 'lucide-react';
import { SourceType } from './types';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [fileUploadName, setFileUploadName] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!sourceContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter content for your source",
        variant: "destructive"
      });
      return;
    }
    
    onAddOrUpdateSource();
  };

  const handleTypeChange = (value: string) => {
    setSourceType(value as SourceType);
    // Reset content when changing type
    if (!isEditing) {
      setSourceContent('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileUploadName(file.name);
      // For demonstration, we'll just use the filename
      // In a real app, you would upload this file to storage
      setSourceContent(file.name);
    }
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
              <Label htmlFor="link" className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-1 text-blue-500" />
                <span>URL / Link</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text" className="flex items-center">
                <FileText className="h-4 w-4 mr-1 text-green-500" />
                <span>Notes / Text</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="file" id="file" />
              <Label htmlFor="file" className="flex items-center">
                <Upload className="h-4 w-4 mr-1 text-amber-500" />
                <span>File Reference</span>
              </Label>
            </div>
          </RadioGroup>
          
          <div className="grid gap-2">
            <Label htmlFor="source-content">
              {sourceType === 'link' ? 'URL' : 
               sourceType === 'file' ? 'File Reference' : 'Text Content'}
            </Label>
            
            {sourceType === 'file' ? (
              <div className="space-y-2">
                <div className="border-2 border-dashed rounded-md p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {fileUploadName || 'Select a file to use as reference'}
                  </p>
                  <Input 
                    ref={fileInputRef}
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileSelect}
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, etc.
                  </p>
                </div>
                {fileUploadName && (
                  <Input
                    id="source-content"
                    value={sourceContent}
                    onChange={(e) => setSourceContent(e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
            ) : sourceType === 'text' ? (
              <Textarea
                id="source-content"
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                placeholder="Enter your notes, information or content..."
                className="min-h-[100px]"
              />
            ) : (
              <Input
                id="source-content"
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                placeholder="https://example.com"
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
