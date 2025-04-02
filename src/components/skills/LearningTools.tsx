
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Mic, FileText, Video, Brain } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ChatMessage } from './ChatInterface';
import PodcastPlayer from './PodcastPlayer';

interface LearningToolsProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency: string;
  sources: string[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LearningTools: React.FC<LearningToolsProps> = ({
  skillName,
  skillDescription,
  selectedProficiency,
  sources,
  setChatMessages,
  isLoading,
  setIsLoading
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const startAssessment = () => {
    navigate(`/skill-assessment?skill=${encodeURIComponent(skillName)}&proficiency=${encodeURIComponent(selectedProficiency)}`);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">Learning Tools</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="podcast" className="text-xs">
              <Mic className="h-3 w-3 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Podcast</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-xs">
              <FileText className="h-3 w-3 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="text-xs">
              <Brain className="h-3 w-3 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Assessment</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium text-base">About {skillName}</h3>
              <p className="text-sm text-muted-foreground">{skillDescription}</p>
              <div className="grid gap-2">
                <h4 className="font-medium text-sm">Learn this skill by:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary" />
                    Listening to the skill podcast
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary" />
                    Reviewing learning resources
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary" />
                    Taking an assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary" />
                    Asking questions to the AI assistant
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="podcast" className="p-4">
            <PodcastPlayer 
              skillName={skillName} 
              proficiency={selectedProficiency} 
            />
          </TabsContent>
          
          <TabsContent value="resources" className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium text-base">Learning Resources</h3>
              <p className="text-sm text-muted-foreground">
                Explore these recommended resources to develop your {skillName} skills at the {selectedProficiency} level.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between" size="sm">
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Skill Guide
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between" size="sm">
                  <span className="flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    Video Tutorials
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between" size="sm">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Recommended Reading
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assessment" className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium text-base">Skill Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Test your knowledge and get certified in {skillName} at the {selectedProficiency} level.
              </p>
              <Button onClick={startAssessment} className="w-full">
                Start Assessment
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningTools;
