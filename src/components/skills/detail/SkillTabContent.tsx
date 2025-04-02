
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Source } from '@/components/skills/knowledge/types';
import RecommendedCourses from '@/components/skills/RecommendedCourses';

interface SkillTabContentProps {
  skill: any;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  children?: React.ReactNode;
}

const SkillTabContent: React.FC<SkillTabContentProps> = ({
  skill,
  sources,
  setSources,
  children
}) => {
  const [activeContentTab, setActiveContentTab] = useState<string>("resources");

  return (
    <div className="space-y-8">
      {children}
      
      <Tabs 
        value={activeContentTab} 
        onValueChange={setActiveContentTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          <TabsTrigger value="certification">Certification Path</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="mt-6 space-y-8">
          <RecommendedCourses 
            skillName={skill.name}
            selectedProficiency={skill.proficiency}
          />
        </TabsContent>
        
        <TabsContent value="certification" className="mt-6">
          <div className="bg-muted p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">Certification Path</h3>
            <p className="text-muted-foreground">
              This feature is coming soon. You'll be able to see recommended certifications
              for {skill.name} at the {skill.proficiency} level.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillTabContent;
