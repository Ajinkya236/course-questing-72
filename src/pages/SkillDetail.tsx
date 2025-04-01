
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, ChevronLeft, Upload, Bookmark, BookmarkCheck, FileText, Network, Headphones, FileQuestion, FileSpreadsheet, Info } from "lucide-react";
import { useGemini } from '@/hooks/useGemini';

// Mock skill data - would come from API in a real app
const mockSkillsDetailed = [
  { 
    id: 1, 
    name: "Leadership", 
    proficiency: "Knowledge",
    description: "Leadership is the ability to influence, motivate, and enable others to contribute to organizational success. Effective leadership inspires vision, drives change, and empowers team members to achieve results beyond their individual capabilities.",
    courses: [1, 4, 11]
  },
  { 
    id: 2, 
    name: "Project Management", 
    proficiency: "Skill",
    description: "Project management is the practice of initiating, planning, executing, controlling, and closing work to achieve specific goals and meet specific success criteria within a given timeframe. The key skills include planning, budgeting, scheduling, risk assessment, and team coordination.",
    courses: [3, 4, 11]
  },
  { 
    id: 3, 
    name: "Data Analysis", 
    proficiency: "Awareness",
    description: "Data analysis involves inspecting, cleaning, transforming, and modeling data to discover useful information, inform conclusions, and support decision-making. It encompasses various techniques and approaches to extract insights from structured and unstructured data.",
    courses: [2, 5, 19]
  },
  { 
    id: 4, 
    name: "Machine Learning", 
    proficiency: "Awareness",
    description: "Machine learning is a field of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.",
    courses: [5, 19]
  },
  { 
    id: 5, 
    name: "React Development", 
    proficiency: "Knowledge",
    description: "React development involves building user interfaces using the React JavaScript library. React's component-based architecture allows developers to create reusable UI components that manage their own state, resulting in efficient updates and rendering of the right components when data changes.",
    courses: [6, 8]
  },
  { 
    id: 6, 
    name: "UX Design", 
    proficiency: "Awareness",
    description: "UX Design (User Experience Design) is the process of creating products that provide meaningful and relevant experiences to users. It involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.",
    courses: [8, 16]
  },
  { 
    id: 7, 
    name: "Cloud Computing", 
    proficiency: "Skill",
    description: "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.",
    courses: [13, 22]
  },
  { 
    id: 8, 
    name: "Cybersecurity", 
    proficiency: "Awareness",
    description: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.",
    courses: [13]
  },
  { 
    id: 9, 
    name: "DevOps", 
    proficiency: "Knowledge",
    description: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.",
    courses: [6, 11, 15]
  },
  { 
    id: 10, 
    name: "Blockchain", 
    proficiency: "Awareness",
    description: "Blockchain is a distributed, decentralized, public ledger technology that records transactions across many computers so that any involved record cannot be altered retroactively, without the alteration of all subsequent blocks.",
    courses: [19, 22]
  },
];

const proficiencyLevels = ["Awareness", "Knowledge", "Skill", "Mastery"];

const SkillDetail: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProficiency, setSelectedProficiency] = useState<string>("");
  const [sources, setSources] = useState<string>("");
  const [userQuery, setUserQuery] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([
    {role: 'assistant', content: 'Hello! I\'m your AI skill assistant. Ask me anything about this skill or use the tools on the right to explore further.'}
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { loading, generateResponse } = useGemini();

  // Find the skill details based on skillId
  const skill = mockSkillsDetailed.find(s => s.id === Number(skillId));
  
  useEffect(() => {
    if (skill && !selectedProficiency) {
      setSelectedProficiency(skill.proficiency);
    }
  }, [skill, selectedProficiency]);

  useEffect(() => {
    // Scroll to bottom of chat when new messages appear
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleBack = () => {
    navigate('/skills');
  };

  const handleSourcesSubmit = () => {
    if (sources.trim()) {
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

  const handleSendMessage = async () => {
    if (!userQuery.trim()) return;
    
    // Add user message to chat
    setChatMessages(prev => [...prev, {role: 'user', content: userQuery}]);
    
    // Prepare context for the AI
    let context = `Skill: ${skill?.name}\nProficiency Level: ${selectedProficiency}\nDescription: ${skill?.description}\n`;
    if (sources) {
      context += `Additional Context Sources: ${sources}\n`;
    }
    
    setIsLoading(true);
    
    try {
      // Get response from Gemini
      const result = await generateResponse({
        prompt: userQuery,
        context: context
      });
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, {role: 'assistant', content: result.generatedText}]);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setUserQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToolClick = async (tool: string) => {
    setIsLoading(true);
    
    // Prepare context information
    let context = `Skill: ${skill?.name}\nProficiency Level: ${selectedProficiency}\nDescription: ${skill?.description}\n`;
    if (sources) {
      context += `Additional Context Sources: ${sources}\n`;
    }
    
    let prompt = "";
    let responseTitle = "";
    
    switch (tool) {
      case 'assess':
        prompt = `Create an adaptive assessment plan for the skill "${skill?.name}" at the "${selectedProficiency}" level. Include various assessment types like quizzes, interactive activities, and project evaluations. Format this as a comprehensive assessment plan with clear sections.`;
        responseTitle = "Skill Assessment Plan";
        break;
      case 'notes':
        prompt = `Create comprehensive study notes for the skill "${skill?.name}" at the "${selectedProficiency}" level. Make these notes concise, well-organized, and easy to understand. Format them with clear headings, bullet points, and examples.`;
        responseTitle = "Study Notes";
        break;
      case 'mindmap':
        prompt = `Create a detailed concept map or mind map for the skill "${skill?.name}" at the "${selectedProficiency}" level. Describe the key concepts, their relationships, and how they connect together in a hierarchical structure.`;
        responseTitle = "Concept Map";
        break;
      case 'podcast':
        prompt = `Create a script for a microlearning podcast between a male and female host explaining the key concepts of "${skill?.name}" at the "${selectedProficiency}" level. Make it conversational, engaging, and cover the most important aspects in a concise manner.`;
        responseTitle = "Microlearning Podcast Script";
        break;
      case 'questionnaire':
        prompt = `Create a comprehensive question bank for the skill "${skill?.name}" at the "${selectedProficiency}" level. Include a variety of question types (multiple choice, true/false, short answer, etc.) and organize them by topic or difficulty level.`;
        responseTitle = "Question Bank";
        break;
      case 'overview':
        prompt = `Provide a brief but comprehensive overview of the skill "${skill?.name}" at the "${selectedProficiency}" level. Include key concepts, importance, applications, and learning resources.`;
        responseTitle = "Skill Overview";
        break;
      default:
        prompt = `Tell me more about the skill "${skill?.name}" at the "${selectedProficiency}" level.`;
        responseTitle = "Skill Information";
    }
    
    try {
      // Add user tool request to chat
      setChatMessages(prev => [...prev, {role: 'system', content: `Generating ${responseTitle}...`}]);
      
      // Get response from Gemini
      const result = await generateResponse({
        prompt: prompt,
        context: context
      });
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, {role: 'assistant', content: `## ${responseTitle}\n\n${result.generatedText}`}]);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!skill) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
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
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{skill.name}</h1>
          <span className={`px-3 py-1 rounded-full text-xs bg-${skill.proficiency === 'Awareness' ? 'blue-100 text-blue-800' : 
                              skill.proficiency === 'Knowledge' ? 'purple-100 text-purple-800' : 
                              skill.proficiency === 'Skill' ? 'green-100 text-green-800' : 
                              'orange-100 text-orange-800'}`}>
            {skill.proficiency}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  About this Skill
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-full sm:w-auto">
                    <p className="text-sm font-medium mb-1">Current Proficiency</p>
                    <Select value={selectedProficiency} onValueChange={setSelectedProficiency}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Awareness">Awareness</SelectItem>
                        <SelectItem value="Knowledge">Knowledge</SelectItem>
                        <SelectItem value="Skill">Skill</SelectItem>
                        <SelectItem value="Mastery">Mastery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-xs gap-1">
                      <Bookmark className="h-3.5 w-3.5" />
                      Save
                    </Button>
                    <Button variant="outline" className="text-xs gap-1">
                      <Upload className="h-3.5 w-3.5" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Chat Interface */}
            <Card className="h-[500px] flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Skill Assistant
                </CardTitle>
                <CardDescription>
                  Ask questions about this skill or how to improve it
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden flex flex-col h-full">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : message.role === 'system'
                          ? 'bg-muted text-muted-foreground text-sm italic'
                          : 'bg-muted'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                
                <div className="flex gap-2">
                  <Textarea 
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about this skill..."
                    className="min-h-[60px] resize-none"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!userQuery.trim() || isLoading}
                    className="self-end"
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - Right Column (1/3 on desktop) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Tools</CardTitle>
                <CardDescription>Generate personalized learning resources</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('assess')}>
                  <FileQuestion className="h-6 w-6 text-primary" />
                  <span className="text-xs">Assessment Plan</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('notes')}>
                  <FileText className="h-6 w-6 text-primary" />
                  <span className="text-xs">Study Notes</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('mindmap')}>
                  <Network className="h-6 w-6 text-primary" />
                  <span className="text-xs">Concept Map</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('podcast')}>
                  <Headphones className="h-6 w-6 text-primary" />
                  <span className="text-xs">Podcast Script</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('questionnaire')}>
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                  <span className="text-xs">Question Bank</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => handleToolClick('overview')}>
                  <Info className="h-6 w-6 text-primary" />
                  <span className="text-xs">Skill Overview</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Knowledge Sources</CardTitle>
                <CardDescription>Improve AI responses with more context</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add links to documentation, research papers, or other resources related to this skill..."
                  value={sources}
                  onChange={(e) => setSources(e.target.value)}
                  className="h-32 resize-none"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleSourcesSubmit} disabled={!sources.trim()} className="w-full">Add Sources</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SkillDetail;
