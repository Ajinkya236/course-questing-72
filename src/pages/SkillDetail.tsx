
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Bookmark,
  BookmarkPlus,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { mockSkills } from '@/data/skillsData';
import SkillHeader from '@/components/skills/SkillHeader';
import LearningTools from '@/components/skills/LearningTools';
import ChatInterface from '@/components/skills/ChatInterface';
import KnowledgeSources from '@/components/skills/KnowledgeSources';
import PodcastPlayer from '@/components/skills/podcast/PodcastPlayer';
import { generatePodcast } from '@/components/skills/podcast/PodcastUtils';
import { useToast } from '@/hooks/use-toast';

const SkillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('learning');
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState<any>(null);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [podcastAudio, setPodcastAudio] = useState<string | null>(null);
  const [podcastError, setPodcastError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Fetch skill data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (id) {
        const skillId = parseInt(id);
        const foundSkill = mockSkills.find(s => s.id === skillId);
        
        if (foundSkill) {
          setSkill(foundSkill);
        }
      }
      
      setIsLoading(false);
    }, 800);
  }, [id]);

  // Handle podcast generation
  const handleGeneratePodcast = async () => {
    if (!skill) return;
    
    setIsGeneratingPodcast(true);
    setPodcastError(null);
    
    try {
      const result = await generatePodcast(
        skill.name,
        skill.description || `A skill related to ${skill.name}`,
        skill.proficiency
      );
      
      if (result.error) {
        setPodcastError(result.error);
        toast({
          title: "Error",
          description: `Failed to generate podcast: ${result.error}`,
          variant: "destructive",
        });
      } else if (result.audioUrl) {
        setPodcastAudio(result.audioUrl);
        toast({
          title: "Success",
          description: "Podcast generated successfully!",
        });
      }
    } catch (error: any) {
      setPodcastError(error.message || "An unexpected error occurred");
      toast({
        title: "Error",
        description: `Failed to generate podcast: ${error.message || "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPodcast(false);
    }
  };
  
  // If loading, show spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  // If skill not found
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
        {/* Back button */}
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/skills">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Skills
            </Link>
          </Button>
        </div>
        
        {/* Skill Header */}
        <SkillHeader 
          skill={skill} 
          onGeneratePodcast={handleGeneratePodcast}
          isGeneratingPodcast={isGeneratingPodcast}
        />
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Tabs */}
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
                <LearningTools skill={skill} />
                <KnowledgeSources skill={skill} />
              </TabsContent>
              
              <TabsContent value="chat" className="mt-4">
                <ChatInterface skillId={skill.id} skillName={skill.name} />
              </TabsContent>
              
              <TabsContent value="assessment" className="mt-4">
                <div className="flex flex-col items-center justify-center p-8 text-center bg-background border rounded-lg space-y-4">
                  <Trophy className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Skill Assessment</h3>
                  <p className="text-muted-foreground max-w-md">
                    Test your knowledge and proficiency in {skill.name} with our adaptive assessment.
                  </p>
                  <Button asChild size="lg" className="mt-2">
                    <Link to={`/skills/${skill.id}/assessment`}>
                      Start Assessment
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Podcast Player (only shown when podcast is generated) */}
            {podcastAudio && (
              <div className="mt-8">
                <PodcastPlayer 
                  audioUrl={podcastAudio} 
                  title={`${skill.name} Podcast`}
                  subtitle={`${skill.proficiency} level overview`}
                />
              </div>
            )}
            
            {podcastError && (
              <div className="mt-8 p-4 border border-destructive/30 bg-destructive/10 rounded-md text-destructive">
                <h3 className="font-medium mb-2">Error Generating Podcast</h3>
                <p className="text-sm">{podcastError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGeneratePodcast} 
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
          
          {/* Right Column - Related Info */}
          <div className="col-span-1">
            {/* Skill information card */}
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
            
            {/* Related skills */}
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Related Skills</h3>
              
              <div className="space-y-3">
                {/* Generate 5 related skills */}
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
