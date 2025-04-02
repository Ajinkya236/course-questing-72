
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  BookOpen,
  Trophy,
  MessageSquare,
  Headphones,
  Clock,
  Calendar,
  Users,
  BookmarkPlus,
  Share2,
  Upload,
  Network,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { mockSkills } from '@/data/skillsData';
import SkillHeader from '@/components/skills/SkillHeader';
import LearningTools from '@/components/skills/LearningTools';
import { ChatInterface, type ChatMessage } from '@/components/skills/ChatInterface';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import { useToast } from '@/hooks/use-toast';

const SkillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learning');
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState<any>(null);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  
  const { toast } = useToast();
  
  useEffect(() => {
    setTimeout(() => {
      if (id) {
        console.log("Looking for skill with ID:", id);
        
        // Fix: Properly handle string IDs by ensuring numeric conversion
        let foundSkill;
        
        // Try to find by numeric ID first
        const numericId = parseInt(id);
        if (!isNaN(numericId)) {
          console.log("Searching for numeric ID:", numericId);
          foundSkill = mockSkills.find(s => s.id === numericId);
        }
        
        // If not found, try to find by name match (case insensitive)
        if (!foundSkill) {
          console.log("Searching by name:", id);
          foundSkill = mockSkills.find(s => 
            s.name.toLowerCase() === id.toLowerCase() ||
            s.name.toLowerCase().includes(id.toLowerCase())
          );
        }
        
        // Debug: log all skills to see what's available
        console.log("Available skills:", mockSkills.map(s => ({ id: s.id, name: s.name })));
        
        if (foundSkill) {
          console.log("Found skill:", foundSkill);
          setSkill(foundSkill);
        } else {
          console.log("No skill found for ID or name:", id);
        }
      }
      
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  const handleSkillAssessment = () => {
    if (skill) {
      navigate(`/skills/${skill.id}/assessment`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Skill Not Found</h2>
        <p className="text-muted-foreground mb-6">The skill you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/skills">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Skills
          </Link>
        </Button>
      </div>
    );
  }

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
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="col-span-1 lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="learning" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline-block">Learning</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline-block">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="assessment" className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline-block">Assessment</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learning" className="rounded-md mt-4">
                <LearningTools 
                  skillName={skill.name}
                  skillDescription={skill.description || ""}
                  selectedProficiency={skill.proficiency}
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
              </TabsContent>
              
              <TabsContent value="chat" className="mt-4">
                <ChatInterface 
                  skillName={skill.name}
                  skillDescription={skill.description || ""}
                  selectedProficiency={skill.proficiency}
                  sources={sources}
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
                />
              </TabsContent>
              
              <TabsContent value="assessment" className="mt-4">
                <div className="flex flex-col items-center justify-center p-8 text-center bg-background border rounded-lg space-y-4">
                  <Trophy className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-semibold">Skill Assessment</h3>
                  <p className="text-muted-foreground max-w-md">
                    Test your knowledge and proficiency in {skill.name} with our adaptive assessment.
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
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <PodcastPlayer 
                skillName={skill.name}
                skillDescription={skill.description || ""}
                proficiency={skill.proficiency}
              />
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Skill Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Estimated Time to Achieve</p>
                    <p className="text-sm text-muted-foreground">
                      {skill.proficiency === "Awareness" ? "1-2 weeks" : 
                       skill.proficiency === "Knowledge" ? "3-6 weeks" : 
                       skill.proficiency === "Skill" ? "2-4 months" : "6+ months"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">2 months ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Learners</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 5000) + 1000} enrolled
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-6">
                <Button variant="outline" size="sm" className="flex-1">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Related Skills</h3>
              
              <div className="space-y-3">
                {mockSkills
                  .filter(s => s.id !== skill.id && s.category === skill.category)
                  .slice(0, 5)
                  .map(relatedSkill => (
                    <Link 
                      key={relatedSkill.id} 
                      to={`/skills/${relatedSkill.id}`}
                      className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        {React.createElement(
                          mockSkills.find(s => s.id === relatedSkill.id)?.icon ? 
                            require('lucide-react')[mockSkills.find(s => s.id === relatedSkill.id)?.icon || 'Zap'] : 
                            require('lucide-react').Zap
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{relatedSkill.name}</p>
                        <p className="text-xs text-muted-foreground">{relatedSkill.proficiency}</p>
                      </div>
                    </Link>
                  ))}
              </div>
              
              <Button variant="link" size="sm" className="mt-2 w-full" asChild>
                <Link to="/skills">View All Skills</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillDetail;
