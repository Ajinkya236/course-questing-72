
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from '@/components/skills/ChatInterface';
import SkillHeader from '@/components/skills/SkillHeader';
import SkillDetailTabs from './SkillDetailTabs';
import SkillSidebar from './SkillSidebar';
import { Source } from '@/components/skills/knowledge/types';

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
  return (
    <>
      <Helmet>
        <title>{skill.name} Skill | Learning Platform</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/skills">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Skills
            </Link>
          </Button>
        </div>
        
        <SkillHeader 
          skill={skill} 
          onProficiencyChange={onProficiencyChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="col-span-1 lg:col-span-3">
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
          
          <SkillSidebar skill={skill} />
        </div>
      </div>
    </>
  );
};

export default SkillDetailLayout;
