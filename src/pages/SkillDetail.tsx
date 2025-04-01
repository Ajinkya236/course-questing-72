
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
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Skill not found</h1>
            <Button onClick={handleBack}>Back to Skills</Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">{skill.name}</h1>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">{skill.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Proficiency Level:</span>
              <Select value={selectedProficiency} onValueChange={setSelectedProficiency}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Sources input */}
          <div className="lg:col-span-3 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Learning Sources</CardTitle>
                <CardDescription>
                  Add sources like videos, websites, documents, or any other learning materials to enhance the AI's context
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add YouTube links, website URLs, or text resources here..." 
                  className="min-h-[100px]"
                  value={sources}
                  onChange={(e) => setSources(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleSourcesSubmit} className="ml-auto">
                  <Upload className="h-4 w-4 mr-2" />
                  Add Sources
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Middle column - Chat */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>AI Skill Assistant</CardTitle>
                <CardDescription>
                  Chat with AI to learn more about {skill.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto max-h-[400px]">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${msg.role === 'system' ? 'justify-center' : ''}`}
                    >
                      <div 
                        className={`
                          max-w-[80%] rounded-lg p-3 
                          ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : ''} 
                          ${msg.role === 'assistant' ? 'bg-muted' : ''}
                          ${msg.role === 'system' ? 'bg-amber-100 text-amber-800 text-sm italic' : ''}
                        `}
                      >
                        <div className="whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full gap-2">
                  <Textarea
                    placeholder="Ask about this skill..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow resize-none"
                    rows={1}
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !userQuery.trim()}>
                    {isLoading ? "Sending..." : "Send"}
                  </Button>
                </div>
                <div className="w-full mt-2 text-xs text-gray-500">
                  <p>Sample prompts:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>What are the key concepts of {skill.name}?</li>
                    <li>How can I apply {skill.name} in my current role?</li>
                    <li>What resources would you recommend for learning {skill.name}?</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right column - Tools */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Tools</CardTitle>
                <CardDescription>Explore this skill with AI-powered tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => handleToolClick('assess')}
                  disabled={isLoading}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Assess Yourself
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleToolClick('notes')}
                  disabled={isLoading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create Study Notes
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleToolClick('mindmap')}
                  disabled={isLoading}
                >
                  <Network className="h-4 w-4 mr-2" />
                  Create Mindmap
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleToolClick('podcast')}
                  disabled={isLoading}
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Create Microlearning Podcast
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleToolClick('questionnaire')}
                  disabled={isLoading}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Create Questionnaire
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleToolClick('overview')}
                  disabled={isLoading}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Create Brief Overview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SkillDetail;
