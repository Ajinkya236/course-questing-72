
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  // Helper function to get the appropriate placeholder based on source type
  const getPlaceholder = (type: SourceType): string => {
    switch (type) {
      case "text":
        return "Enter your source content here...";
      case "link":
        return "https://example.com/resource";
      case "file":
        return "Select file...";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Source" : "Add Knowledge Source"}</DialogTitle>
          <DialogDescription>
            Add links to documentation, research papers, or other resources related to this skill.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="source-type">Source Type</Label>
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant={sourceType === "link" ? "default" : "outline"}
                size="sm"
                onClick={() => setSourceType("link")}
              >
                Link
              </Button>
              <Button 
                type="button" 
                variant={sourceType === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => setSourceType("text")}
              >
                Text
              </Button>
              <Button 
                type="button" 
                variant={sourceType === "file" ? "default" : "outline"}
                size="sm"
                onClick={() => setSourceType("file")}
                disabled
              >
                File (Coming Soon)
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="source-content">
              {sourceType === "link" ? "URL" : sourceType === "text" ? "Content" : "File"}
            </Label>
            {sourceType === "text" ? (
              <Textarea
                id="source-content"
                placeholder={getPlaceholder(sourceType)}
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                id="source-content"
                placeholder={getPlaceholder(sourceType)}
                type={sourceType === "file" ? "file" : "text"}
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                disabled={sourceType === "file"}
              />
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="source-description">Description (optional)</Label>
            <Input
              id="source-description"
              placeholder="Brief description of this source"
              value={sourceDescription}
              onChange={(e) => setSourceDescription(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={onAddOrUpdateSource} 
            disabled={!sourceContent.trim()}
          >
            {isEditing ? "Update Source" : "Add Source"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SourceFormDialog;
