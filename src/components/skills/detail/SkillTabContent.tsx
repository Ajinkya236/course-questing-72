
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import ChatInterface from '@/components/skills/ChatInterface';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import { useToast } from '@/hooks/use-toast';

interface SkillTabContentProps {
  activeTab: string;
  skillName: string;
  skillDescription: string;
  skillId: number;
  proficiency: string;
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setActiveTab: (tab: string) => void;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
}

const SkillTabContent: React.FC<SkillTabContentProps> = ({
  activeTab,
  skillName,
  skillDescription,
  skillId,
  proficiency,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  setActiveTab,
  isGeneratingPodcast,
  setIsGeneratingPodcast
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSkillAssessment = () => {
    navigate(`/skills/${skillId}/assessment`);
  };

  return (
    <>
      {activeTab === "learning" && (
        <>
          <LearningTools 
            skillName={skillName}
            skillDescription={skillDescription}
            selectedProficiency={proficiency}
            sources={sources}
            setChatMessages={setChatMessages}
            isLoading={isGeneratingPodcast}
            setIsLoading={setIsGeneratingPodcast}
          />
          <div className="mt-6">
            <KnowledgeSources 
              sources={sources}
              setSources={setSources}
              onSubmit={() => {
                toast({
                  title: "Knowledge Sources Updated",
                  description: `${sources.length} sources will be used for AI responses.`,
                });
              }}
            />
          </div>
        </>
      )}
      
      {activeTab === "chat" && (
        <ChatInterface 
          skillName={skillName}
          skillDescription={skillDescription}
          selectedProficiency={proficiency}
          sources={sources}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      )}
      
      {activeTab === "assessment" && (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-background border rounded-lg space-y-4">
          <Trophy className="h-12 w-12 text-primary" />
          <h3 className="text-xl font-semibold">Skill Assessment</h3>
          <p className="text-muted-foreground max-w-md">
            Test your knowledge and proficiency in {skillName} with our adaptive assessment.
            Upload files or provide resources to customize your assessment experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button 
              onClick={handleSkillAssessment}
              size="lg" 
              className="flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Start Assessment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setActiveTab('learning')}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Materials First
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <PodcastPlayer 
          skillName={skillName}
          skillDescription={skillDescription}
          proficiency={proficiency}
        />
      </div>
    </>
  );
};

export default SkillTabContent;
