
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChatMessage } from '@/components/skills/ChatInterface';
import SkillHeader from '@/components/skills/SkillHeader';
import SkillDetailTabs from './SkillDetailTabs';
import SkillSidebar from './SkillSidebar';
import SkillDetailHeader from './SkillDetailHeader';
import EarnSkillButton from './EarnSkillButton';
import { Source } from '@/components/skills/knowledge/types';

// Mapping of proficiency levels to progress percentages
const proficiencyProgress = {
  "Awareness": 25,
  "Knowledge": 50,
  "Skill": 75,
  "Mastery": 100
};

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
  onProficiencyChange?: (value: string) => void;
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
  // Get progress value based on current proficiency
  const progressValue = proficiencyProgress[skill.proficiency] || 0;

  return (
    <>
      <Helmet>
        <title>{skill.name} Skill | Learning Platform</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <SkillDetailHeader 
          skill={skill}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onProficiencyChange={onProficiencyChange}
        />
        
        <div className="my-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Current Proficiency:</span>
                  <Badge variant="outline" className="font-semibold">
                    {skill.proficiency}
                  </Badge>
                </div>
                
                <EarnSkillButton 
                  skillId={skill.id} 
                  skillName={skill.name} 
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Awareness</span>
                  <span>Knowledge</span>
                  <span>Skill</span>
                  <span>Mastery</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>
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
    </>
  );
};

export default SkillDetailLayout;
