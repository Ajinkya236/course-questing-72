
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface KnowledgeSourcesProps {
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}

type SourceType = 'link' | 'text' | 'file';

interface Source {
  id: string;
  type: SourceType;
  content: string;
  description?: string;
}

const KnowledgeSources: React.FC<KnowledgeSourcesProps> = ({ sources, setSources, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSourceContent, setNewSourceContent] = useState("");
  const [newSourceDescription, setNewSourceDescription] = useState("");
  const [newSourceType, setNewSourceType] = useState<SourceType>("link");
  const [editSourceId, setEditSourceId] = useState<string | null>(null);
  const [managedSources, setManagedSources] = useState<Source[]>([]);

  // Convert string sources to managed sources when component mounts
  React.useEffect(() => {
    if (sources.length > 0 && managedSources.length === 0) {
      const initialSources = sources.map((source, index) => ({
        id: `source-${index}`,
        type: 'text' as SourceType,
        content: source
      }));
      setManagedSources(initialSources);
    }
  }, [sources, managedSources]);

  const handleAddSource = () => {
    if (!newSourceContent.trim()) return;

    if (editSourceId) {
      // Update existing source
      setManagedSources(prev => 
        prev.map(source => 
          source.id === editSourceId 
            ? {...source, content: newSourceContent, description: newSourceDescription || undefined, type: newSourceType}
            : source
        )
      );
      setEditSourceId(null);
    } else {
      // Add new source
      const newSource: Source = {
        id: `source-${Date.now()}`,
        type: newSourceType,
        content: newSourceContent,
        description: newSourceDescription || undefined
      };
      setManagedSources(prev => [...prev, newSource]);
    }

    // Update parent source array
    const updatedSources = [...managedSources].map(source => source.content);
    setSources(updatedSources);
    
    // Reset form
    setNewSourceContent("");
    setNewSourceDescription("");
    setNewSourceType("link");
    setIsOpen(false);
  };

  const handleEditSource = (source: Source) => {
    setEditSourceId(source.id);
    setNewSourceContent(source.content);
    setNewSourceDescription(source.description || "");
    setNewSourceType(source.type);
    setIsOpen(true);
  };

  const handleDeleteSource = (id: string) => {
    setManagedSources(prev => prev.filter(source => source.id !== id));
    // Update parent source array
    const updatedSources = managedSources
      .filter(source => source.id !== id)
      .map(source => source.content);
    setSources(updatedSources);
  };

  const handleSubmitSources = () => {
    // Update parent source array
    const updatedSources = managedSources.map(source => source.content);
    setSources(updatedSources);
    onSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Knowledge Sources</CardTitle>
        <CardDescription>Add multiple sources to improve AI responses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {managedSources.length > 0 ? (
            <div className="space-y-2">
              {managedSources.map((source) => (
                <div key={source.id} className="flex items-start justify-between p-3 bg-muted rounded-md">
                  <div className="flex-1 mr-2">
                    <p className="text-sm break-words">{source.content}</p>
                    {source.description && (
                      <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => handleEditSource(source)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-destructive" 
                      onClick={() => handleDeleteSource(source.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No sources added yet. Add sources to improve AI responses.
            </div>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => {
                setEditSourceId(null);
                setNewSourceContent("");
                setNewSourceDescription("");
                setNewSourceType("link");
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editSourceId ? "Edit Source" : "Add Knowledge Source"}</DialogTitle>
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
                    variant={newSourceType === "link" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewSourceType("link")}
                  >
                    Link
                  </Button>
                  <Button 
                    type="button" 
                    variant={newSourceType === "text" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewSourceType("text")}
                  >
                    Text
                  </Button>
                  <Button 
                    type="button" 
                    variant={newSourceType === "file" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewSourceType("file")}
                    disabled
                  >
                    File (Coming Soon)
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source-content">
                  {newSourceType === "link" ? "URL" : newSourceType === "text" ? "Content" : "File"}
                </Label>
                {newSourceType === "text" ? (
                  <Textarea
                    id="source-content"
                    placeholder={
                      newSourceType === "link" 
                        ? "https://example.com/resource" 
                        : "Enter your source content here..."
                    }
                    value={newSourceContent}
                    onChange={(e) => setNewSourceContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                ) : (
                  <Input
                    id="source-content"
                    placeholder={
                      newSourceType === "link" 
                        ? "https://example.com/resource" 
                        : "Select file..."
                    }
                    type={newSourceType === "file" ? "file" : "text"}
                    value={newSourceContent}
                    onChange={(e) => setNewSourceContent(e.target.value)}
                    disabled={newSourceType === "file"}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source-description">Description (optional)</Label>
                <Input
                  id="source-description"
                  placeholder="Brief description of this source"
                  value={newSourceDescription}
                  onChange={(e) => setNewSourceDescription(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleAddSource} disabled={!newSourceContent.trim()}>
                {editSourceId ? "Update Source" : "Add Source"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubmitSources} 
          disabled={managedSources.length === 0} 
          className="w-full"
        >
          Use These Sources
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KnowledgeSources;
