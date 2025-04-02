
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles, Share, Save, Pen } from "lucide-react";
import ChatInterface, { ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import SkillTabContent from './SkillTabContent';
import { Source } from '@/components/skills/knowledge/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SkillDetailTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  skill: any;
  sources: string[] | Source[];
  setSources: React.Dispatch<React.SetStateAction<string[] | Source[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
}

const SkillDetailTabs: React.FC<SkillDetailTabsProps> = ({
  activeTab,
  setActiveTab,
  skill,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  isGeneratingPodcast,
  setIsGeneratingPodcast
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [employeeIds, setEmployeeIds] = useState('');
  const { toast } = useToast();

  const handleShareSkill = () => {
    toast({
      title: "Skill shared",
      description: `Skill ${skill.name} has been shared with the specified employees.`,
      variant: "default",
    });
    setShowShareDialog(false);
    setEmployeeIds('');
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> AI Assistant
            </TabsTrigger>
            <TabsTrigger value="learn">
              Learning Resources
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowShareDialog(true)}
              className="flex items-center gap-2"
            >
              <Share className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>
        
        <TabsContent value="chat" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ChatInterface
                skillName={skill.name}
                skillDescription={skill.description || ''}
                selectedProficiency={skill.proficiency}
                sources={sources}
                messages={chatMessages}
                setMessages={setChatMessages}
                placeholder={`Ask me anything about ${skill.name}...`}
                apiParams={{ 
                  skillName: skill.name,
                  skillProficiency: skill.proficiency,
                  sources: sources
                }}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
            <div className="space-y-6">
              <LearningTools 
                skillName={skill.name}
                skillDescription={skill.description || ''}
                selectedProficiency={skill.proficiency}
                sources={sources}
                setChatMessages={setChatMessages}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              
              <KnowledgeSources
                sources={sources}
                setSources={setSources}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="learn" className="mt-0">
          <SkillTabContent 
            skill={skill}
            sources={sources}
            setSources={setSources}
          >
            <div className="mb-8">
              <PodcastPlayer
                skillName={skill.name}
                skillDescription={skill.description || ''}
                proficiency={skill.proficiency}
              />
            </div>
          </SkillTabContent>
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share skill</DialogTitle>
            <DialogDescription>
              Share this skill with team members or colleagues.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employee-ids">Employee IDs</Label>
              <Input
                id="employee-ids"
                placeholder="Enter employee IDs (comma separated)"
                value={employeeIds}
                onChange={(e) => setEmployeeIds(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleShareSkill}
              disabled={!employeeIds.trim()}
            >
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillDetailTabs;
