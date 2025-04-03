
import React, { useState } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import SkillDetailHeader from './SkillDetailHeader';
import SkillDetailTabs from './SkillDetailTabs';
import { Source } from '@/components/skills/knowledge/types';
import { ChatMessage } from '@/components/skills/ChatInterface';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import EarnSkillButton from './EarnSkillButton';

interface SkillDetailLayoutProps {
  skill: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isGeneratingPodcast: boolean;
  setIsGeneratingPodcast: React.Dispatch<React.SetStateAction<boolean>>;
  onProficiencyChange: (proficiency: string) => void;
}

const SkillDetailLayout: React.FC<SkillDetailLayoutProps> = ({
  skill,
  activeTab,
  setActiveTab,
  sources,
  setSources,
  chatMessages,
  setChatMessages,
  isGeneratingPodcast,
  setIsGeneratingPodcast,
  onProficiencyChange
}) => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <SkillDetailHeader 
          skill={skill} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onProficiencyChange={onProficiencyChange}
        />
        
        <div className="my-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Current Proficiency:</span>
                <Badge variant="outline" className="font-semibold">
                  {skill.proficiency}
                </Badge>
              </div>
              
              <EarnSkillButton skillId={skill.id} skillName={skill.name} />
            </CardContent>
          </Card>
        </div>
        
        <SkillDetailTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          skill={skill}
          sources={sources}
          setSources={setSources}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          isGeneratingPodcast={isGeneratingPodcast}
          setIsGeneratingPodcast={setIsGeneratingPodcast}
        />
      </div>
    </PageLayout>
  );
};

export default SkillDetailLayout;
