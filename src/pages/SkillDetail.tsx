
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import SkillHeader from '@/components/skills/SkillHeader';
import { ChatInterface, type ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import { Skill } from '@/components/skills/types';
import { mockSkills, proficiencyColors } from '@/data/skillsData';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SkillDetail: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProficiency, setSelectedProficiency] = useState<string>("");
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {role: 'assistant', content: 'Hello! I\'m your AI skill assistant. Ask me anything about this skill or use the tools on the right to explore further.'}
  ]);

  // Safely find the skill, with fallback
  const skill = mockSkills ? mockSkills.find(s => s.id === Number(skillId)) : null;
  
  useEffect(() => {
    if (skill && !selectedProficiency) {
      setSelectedProficiency(skill.proficiency);
    }
  }, [skill, selectedProficiency]);

  const handleBack = () => {
    navigate('/skills');
  };

  const handleProficiencyChange = (value: string) => {
    setSelectedProficiency(value);
    toast({
      title: "Proficiency Updated",
      description: `Proficiency level set to ${value}`,
    });
  };

  const handleSourcesSubmit = () => {
    if (sources.length > 0) {
      toast({
        title: "Sources added",
        description: "Your sources have been added as context for the AI assistant.",
      });
      
      setChatMessages(prev => [
        ...prev, 
        {role: 'system', content: 'New context sources have been added. The AI will now use this information to provide more relevant responses.'}
      ]);
    }
  };

  if (!skill) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="mb-4 flex items-center gap-1"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Skills
          </Button>
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-bold font-archivo-black text-gray-700">Skill Not Found</h1>
          </div>
          <p className="text-muted-foreground">The skill you are looking for does not exist or has been removed.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <SkillHeader 
            skill={skill}
            proficiency={selectedProficiency}
            onBack={handleBack}
          />
          
          <div className="w-full md:w-48">
            <Select value={selectedProficiency} onValueChange={handleProficiencyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Set proficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Awareness">Awareness</SelectItem>
                <SelectItem value="Knowledge">Knowledge</SelectItem>
                <SelectItem value="Skill">Skill</SelectItem>
                <SelectItem value="Mastery">Mastery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <ChatInterface 
              skillName={skill.name}
              skillDescription={skill.description || ""}
              selectedProficiency={selectedProficiency}
              sources={sources}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
          
          <div className="space-y-6">
            <LearningTools 
              skillName={skill.name}
              skillDescription={skill.description || ""}
              selectedProficiency={selectedProficiency}
              sources={sources}
              setChatMessages={setChatMessages}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            
            <KnowledgeSources 
              sources={sources}
              setSources={setSources}
              onSubmit={handleSourcesSubmit}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SkillDetail;
