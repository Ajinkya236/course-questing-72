
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface KnowledgeSourcesProps {
  sources: string;
  setSources: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

const KnowledgeSources: React.FC<KnowledgeSourcesProps> = ({ sources, setSources, onSubmit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add Knowledge Sources</CardTitle>
        <CardDescription>Improve AI responses with more context</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          placeholder="Add links to documentation, research papers, or other resources related to this skill..."
          value={sources}
          onChange={(e) => setSources(e.target.value)}
          className="h-32 resize-none"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} disabled={!sources.trim()} className="w-full">Add Sources</Button>
      </CardFooter>
    </Card>
  );
};

export default KnowledgeSources;
