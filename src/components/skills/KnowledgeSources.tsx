import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, LinkIcon, Plus, X } from 'lucide-react';
import SourceList from '@/components/skills/knowledge/SourceList';
import SourceFormDialog from '@/components/skills/knowledge/SourceFormDialog';

interface KnowledgeSourcesProps {
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit?: () => void;
  minimal?: boolean;
}

const KnowledgeSources: React.FC<KnowledgeSourcesProps> = ({ 
  sources, 
  setSources, 
  onSubmit,
  minimal = false
}) => {
  const [newSource, setNewSource] = useState<string>('');
  const [showSourceDialog, setShowSourceDialog] = useState<boolean>(false);
  
  const handleAddSource = () => {
    if (newSource.trim()) {
      setSources([...sources, newSource.trim()]);
      setNewSource('');
    }
  };

  const handleRemoveSource = (index: number) => {
    const updatedSources = [...sources];
    updatedSources.splice(index, 1);
    setSources(updatedSources);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  if (minimal) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-primary" />
            Knowledge Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sources.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {sources.map((source, index) => (
                  <div
                    key={index}
                    className="bg-muted text-muted-foreground text-xs py-1 px-2 rounded-full flex items-center"
                  >
                    <span className="truncate max-w-[180px]">{source}</span>
                    <button
                      className="ml-1.5 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveSource(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                No knowledge sources added yet.
              </p>
            )}
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
              <Input
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                placeholder="Add website URL, document, or text..."
                className="text-xs h-8"
              />
              <Button 
                type="button" 
                size="sm"
                variant="outline"
                className="h-8 px-2"
                onClick={handleAddSource}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Knowledge Sources</CardTitle>
        <CardDescription>Add resources to help customize AI responses</CardDescription>
      </CardHeader>
      <CardContent>
        <SourceList sources={sources} onRemove={handleRemoveSource} />
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Input
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
            placeholder="Add website URL, document, or text..."
          />
          <Button type="button" variant="outline" onClick={handleAddSource}>
            Add Source
          </Button>
        </form>
        <Button onClick={handleSubmit} className="w-full mt-4">
          Update Knowledge Sources
        </Button>
      </CardContent>
    </Card>
  );
};

export default KnowledgeSources;
