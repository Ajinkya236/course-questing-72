
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import SkillHeader from '@/components/skills/SkillHeader';
import { ChatInterface, type ChatMessage } from '@/components/skills/ChatInterface';
import LearningTools from '@/components/skills/LearningTools';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import { Skill } from '@/components/skills/types';
import SkillSearch from '@/components/skills/SkillSearch';

// Mock skill data - would come from API in a real app
const mockSkillsDetailed: Skill[] = [
  { 
    id: 1, 
    name: "Leadership", 
    proficiency: "Knowledge",
    description: "Leadership is the ability to influence, motivate, and enable others to contribute to organizational success. Effective leadership inspires vision, drives change, and empowers team members to achieve results beyond their individual capabilities.",
    icon: "Award", // Add icon property
    category: "role", // Add category property
    courses: [1, 4, 11]
  },
  { 
    id: 2, 
    name: "Project Management", 
    proficiency: "Skill",
    description: "Project management is the practice of initiating, planning, executing, controlling, and closing work to achieve specific goals and meet specific success criteria within a given timeframe. The key skills include planning, budgeting, scheduling, risk assessment, and team coordination.",
    icon: "BrainCircuit",
    category: "role",
    courses: [3, 4, 11]
  },
  { 
    id: 3, 
    name: "Data Analysis", 
    proficiency: "Awareness",
    description: "Data analysis involves inspecting, cleaning, transforming, and modeling data to discover useful information, inform conclusions, and support decision-making. It encompasses various techniques and approaches to extract insights from structured and unstructured data.",
    icon: "Database",
    category: "recommended",
    courses: [2, 5, 19]
  },
  { 
    id: 4, 
    name: "Machine Learning", 
    proficiency: "Awareness",
    description: "Machine learning is a field of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.",
    icon: "BrainCircuit",
    category: "trending",
    courses: [5, 19]
  },
  { 
    id: 5, 
    name: "React Development", 
    proficiency: "Knowledge",
    description: "React development involves building user interfaces using the React JavaScript library. React's component-based architecture allows developers to create reusable UI components that manage their own state, resulting in efficient updates and rendering of the right components when data changes.",
    icon: "Code",
    category: "recommended",
    courses: [6, 8]
  },
  { 
    id: 6, 
    name: "UX Design", 
    proficiency: "Awareness",
    description: "UX Design (User Experience Design) is the process of creating products that provide meaningful and relevant experiences to users. It involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.",
    icon: "Lightbulb",
    category: "role",
    courses: [8, 16]
  },
  { 
    id: 7, 
    name: "Cloud Computing", 
    proficiency: "Skill",
    description: 'Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.',
    icon: "Cloud",
    category: "trending",
    courses: [13, 22]
  },
  { 
    id: 8, 
    name: "Cybersecurity", 
    proficiency: "Awareness",
    description: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.",
    icon: "Shield",
    category: "trending",
    courses: [13]
  },
  { 
    id: 9, 
    name: "DevOps", 
    proficiency: "Knowledge",
    description: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.",
    icon: "Code",
    category: "trending",
    courses: [6, 11, 15]
  },
  { 
    id: 10, 
    name: "Blockchain", 
    proficiency: "Awareness",
    description: "Blockchain is a distributed, decentralized, public ledger technology that records transactions across many computers so that any involved record cannot be altered retroactively, without the alteration of all subsequent blocks.",
    icon: "Database",
    category: "trending",
    courses: [19, 22]
  },
];

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

  // Find the skill details based on skillId
  const skill = mockSkillsDetailed.find(s => s.id === Number(skillId));
  
  useEffect(() => {
    if (skill && !selectedProficiency) {
      setSelectedProficiency(skill.proficiency);
    }
  }, [skill, selectedProficiency]);

  const handleBack = () => {
    navigate('/skills');
  };

  const handleSourcesSubmit = () => {
    if (sources.length > 0) {
      toast({
        title: "Sources added",
        description: "Your sources have been added as context for the AI assistant.",
      });
      
      // Add a system message in the chat about sources being added
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
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-bold">Skill Not Found</h1>
          </div>
          <p className="text-muted-foreground">The skill you are looking for does not exist or has been removed.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Pass the skill object directly to SkillHeader */}
        <SkillHeader 
          skill={skill}
          proficiency={selectedProficiency}
          onProficiencyChange={setSelectedProficiency}
          onBack={handleBack}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content - Left Column (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <ChatInterface 
              skillName={skill.name}
              skillDescription={skill.description}
              selectedProficiency={selectedProficiency}
              sources={sources}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
          
          {/* Sidebar - Right Column (1/3 on desktop) */}
          <div className="space-y-6">
            <LearningTools 
              skillName={skill.name}
              skillDescription={skill.description}
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
