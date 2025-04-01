
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { KnowledgeSourcesProps, Source, SourceType } from './knowledge/types';
import SourceList from './knowledge/SourceList';
import SourceFormDialog from './knowledge/SourceFormDialog';

const KnowledgeSources: React.FC<KnowledgeSourcesProps> = ({ 
  sources, 
  setSources, 
  onSubmit 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSourceContent, setNewSourceContent] = useState("");
  const [newSourceDescription, setNewSourceDescription] = useState("");
  const [newSourceType, setNewSourceType] = useState<SourceType>("link");
  const [editSourceId, setEditSourceId] = useState<string | null>(null);
  const [managedSources, setManagedSources] = useState<Source[]>([]);

  // Convert string sources to managed sources when component mounts
  useEffect(() => {
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
    const updatedSources = managedSources.map(source => source.content);
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

  const openNewSourceDialog = () => {
    setEditSourceId(null);
    setNewSourceContent("");
    setNewSourceDescription("");
    setNewSourceType("link");
    setIsOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-heading text-gray-700">Knowledge Sources</CardTitle>
        <CardDescription>Add multiple sources to improve AI responses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SourceList 
            sources={managedSources} 
            onEditSource={handleEditSource} 
            onDeleteSource={handleDeleteSource}
          />
        </div>

        <SourceFormDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sourceContent={newSourceContent}
          setSourceContent={setNewSourceContent}
          sourceDescription={newSourceDescription}
          setSourceDescription={setNewSourceDescription}
          sourceType={newSourceType}
          setSourceType={setNewSourceType}
          onAddOrUpdateSource={handleAddSource}
          isEditing={!!editSourceId}
        />

        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={openNewSourceDialog}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Source
        </Button>
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
