
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Upload, 
  Brain, 
  FileText, 
  Network, 
  Headphones,
  FileQuestion,
  FileSpreadsheet,
  Info,
  Youtube,
  File,
  Globe,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useSupabase } from '@/hooks/useSupabase';
import { useGemini } from '@/hooks/useGemini';

type ProficiencyLevel = "awareness" | "knowledge" | "mastery";

type SourceItem = {
  id: string;
  type: 'youtube' | 'website' | 'video' | 'image' | 'document' | 'text';
  content: string;
  label?: string;
  file?: File;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const SkillDetail: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [skill, setSkill] = useState<any>(null);
  const [userProficiency, setUserProficiency] = useState<ProficiencyLevel | ''>('');
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [sourceType, setSourceType] = useState<SourceItem['type']>('text');
  const [sourceContent, setSourceContent] = useState('');
  const [sourceLabel, setSourceLabel] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { getSkill, updateSkillProficiency, getSkillWithCourses } = useSupabase();
  const { generateResponse } = useGemini();

  useEffect(() => {
    const fetchSkillData = async () => {
      if (!skillId) return;
      
      try {
        setLoading(true);
        
        // Get skill details with related courses
        const skillResponse = await getSkillWithCourses(skillId);
        
        if (skillResponse?.data) {
          setSkill(skillResponse.data);
          
          // Set user proficiency if available
          if (skillResponse.data.proficiency) {
            const profLevel = getProficiencyLevelFromValue(skillResponse.data.proficiency);
            setUserProficiency(profLevel);
          }
        } else {
          toast({
            title: "Skill not found",
            description: "The requested skill could not be found.",
            variant: "destructive",
          });
          navigate('/skills');
        }
      } catch (error) {
        console.error('Error fetching skill data:', error);
        toast({
          title: "Error loading skill",
          description: "There was a problem loading the skill details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkillData();
  }, [skillId, getSkill, getSkillWithCourses, navigate]);

  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getProficiencyLevelFromValue = (value?: number): ProficiencyLevel => {
    if (!value || value < 30) return "awareness";
    if (value < 70) return "knowledge";
    return "mastery";
  };

  const getProficiencyValue = (level: ProficiencyLevel): number => {
    switch (level) {
      case "awareness": return 25;
      case "knowledge": return 60;
      case "mastery": return 95;
      default: return 0;
    }
  };

  const handleProficiencyChange = async (level: ProficiencyLevel) => {
    if (!skillId) return;
    
    try {
      setUserProficiency(level);
      const proficiencyValue = getProficiencyValue(level);
      
      await updateSkillProficiency(skillId, proficiencyValue);
      
      toast({
        title: "Proficiency updated",
        description: `Your proficiency for ${skill?.name} has been updated to ${level}.`,
      });
    } catch (error) {
      console.error('Error updating proficiency:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your proficiency level.",
        variant: "destructive",
      });
    }
  };

  const addSource = () => {
    if (!sourceContent.trim()) {
      toast({
        title: "Empty source",
        description: "Please provide content for the source.",
        variant: "destructive",
      });
      return;
    }
    
    const newSource: SourceItem = {
      id: Date.now().toString(),
      type: sourceType,
      content: sourceContent,
      label: sourceLabel || `${sourceType} source`,
    };
    
    setSources([...sources, newSource]);
    setSourceContent('');
    setSourceLabel('');
    
    toast({
      title: "Source added",
      description: `Your ${sourceType} source has been added.`,
    });
  };

  const removeSource = (id: string) => {
    setSources(sources.filter(source => source.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileSource: SourceItem = {
      id: Date.now().toString(),
      type: 'document',
      content: file.name,
      label: file.name,
      file
    };
    
    setSources([...sources, fileSource]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast({
      title: "File added",
      description: `${file.name} has been added as a source.`,
    });
  };

  const handleSendMessage = async () => {
    if (!userQuery.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userQuery,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    const currentQuery = userQuery;
    setUserQuery('');
    
    // Prepare sources context
    const sourcesContext = sources.map(source => {
      return `Source (${source.type}): ${source.content}`;
    }).join('\n\n');
    
    try {
      setGenerating(true);
      
      // Generate response with Gemini
      const { generatedText } = await generateResponse({
        prompt: currentQuery,
        context: `Skill: ${skill?.name}\n\nSources:\n${sourcesContext}`,
      });
      
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: generatedText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: "AI response failed",
        description: "There was a problem generating the AI response.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const generateContentWithActiveTool = async () => {
    if (!activeTool || !skill) return;
    
    try {
      setGenerating(true);
      
      // Prepare sources context
      const sourcesContext = sources.map(source => {
        return `Source (${source.type}): ${source.content}`;
      }).join('\n\n');
      
      // Generate content based on the active tool
      let prompt = '';
      let title = '';
      
      switch (activeTool) {
        case 'assess':
          title = "Self Assessment";
          prompt = `Create an interactive self-assessment quiz for the skill "${skill.name}" at the ${userProficiency || 'beginner'} level. Include 5-7 questions with a mix of multiple choice, true/false, and short answer questions. For each question, provide a correct answer and explanation.`;
          break;
        case 'notes':
          title = "Study Notes";
          prompt = `Create comprehensive, well-organized study notes for "${skill.name}" at the ${userProficiency || 'beginner'} level. Include key concepts, definitions, examples, and best practices. Structure the notes in a clear, readable format with headings, subheadings, and bullet points where appropriate.`;
          break;
        case 'mindmap':
          title = "Mind Map";
          prompt = `Create a detailed text-based mind map for learning "${skill.name}" at the ${userProficiency || 'beginner'} level. Start with the central concept and branch out to key topics, subtopics, and their relationships. Use indentation and symbols to show the hierarchy and connections between concepts.`;
          break;
        case 'podcast':
          title = "Microlearning Podcast Script";
          prompt = `Create a script for a 5-minute microlearning podcast between a male host (Alex) and female expert (Maya) explaining "${skill.name}" at the ${userProficiency || 'beginner'} level. The conversation should be engaging, informative, and cover key concepts in a conversational way. Structure it as a dialogue with speaker names.`;
          break;
        case 'questionnaire':
          title = "Question Bank";
          prompt = `Create a comprehensive question bank for "${skill.name}" at the ${userProficiency || 'beginner'} level. Include 15-20 questions of varying difficulty, with a mix of multiple choice, true/false, short answer, and scenario-based questions. Organize questions by topic and provide answer keys.`;
          break;
        case 'overview':
          title = "Brief Overview";
          prompt = `Provide a concise overview of "${skill.name}" suitable for someone at the ${userProficiency || 'beginner'} level. Cover the definition, importance, key concepts, applications, and career relevance in a clear, digestible format of 300-500 words.`;
          break;
      }
      
      // Generate response with Gemini
      const { generatedText } = await generateResponse({
        prompt,
        context: `Skill: ${skill.name}\n\nSources:\n${sourcesContext}`,
      });
      
      setGeneratedContent(generatedText);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Content generation failed",
        description: "There was a problem generating the content.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with back button and skill info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/skills')} 
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{skill?.name}</h1>
            {skill?.category && (
              <p className="text-muted-foreground">{skill.category}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground mr-2">Your proficiency:</span>
          <Select
            value={userProficiency}
            onValueChange={(value) => handleProficiencyChange(value as ProficiencyLevel)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Set proficiency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awareness">Awareness</SelectItem>
              <SelectItem value="knowledge">Knowledge</SelectItem>
              <SelectItem value="mastery">Mastery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Source materials section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Learning Sources</CardTitle>
          <CardDescription>
            Add sources to help the AI provide more relevant and accurate information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            {/* Source type selection */}
            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={sourceType}
                onValueChange={(value) => setSourceType(value as SourceItem['type'])}
              >
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Source type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                </SelectContent>
              </Select>

              {sourceType === 'document' ? (
                <div className="flex-grow">
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                  />
                </div>
              ) : (
                <div className="flex-grow flex flex-col md:flex-row gap-2">
                  <Input
                    placeholder={`Enter ${sourceType} content...`}
                    value={sourceContent}
                    onChange={(e) => setSourceContent(e.target.value)}
                    className="flex-grow"
                  />
                  <Input
                    placeholder="Label (optional)"
                    value={sourceLabel}
                    onChange={(e) => setSourceLabel(e.target.value)}
                    className="md:w-40"
                  />
                </div>
              )}
              
              {sourceType !== 'document' && (
                <Button onClick={addSource} className="whitespace-nowrap">
                  Add Source
                </Button>
              )}
            </div>

            {/* List of added sources */}
            {sources.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Added Sources:</h3>
                <div className="flex flex-wrap gap-2">
                  {sources.map((source) => (
                    <Badge 
                      key={source.id} 
                      variant="secondary" 
                      className="flex items-center gap-1 py-1.5 px-3"
                    >
                      {source.type === 'youtube' && <Youtube className="h-3 w-3" />}
                      {source.type === 'website' && <Globe className="h-3 w-3" />}
                      {source.type === 'video' && <Youtube className="h-3 w-3" />}
                      {source.type === 'image' && <ImageIcon className="h-3 w-3" />}
                      {source.type === 'document' && <File className="h-3 w-3" />}
                      {source.type === 'text' && <FileText className="h-3 w-3" />}
                      <span className="max-w-[200px] truncate">{source.label || source.content}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeSource(source.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main content area - split into chatbot and tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Chatbot */}
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Ask questions about {skill?.name} to get personalized learning assistance.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <div 
                ref={chatContainerRef}
                className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4"
              >
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-10">
                    <p>Ask a question to get started</p>
                    <div className="mt-4 text-sm">
                      <p className="font-medium mb-2">Sample prompts:</p>
                      <p className="mb-1 cursor-pointer hover:text-primary" onClick={() => setUserQuery(`What is ${skill?.name}?`)}>
                        What is {skill?.name}?
                      </p>
                      <p className="mb-1 cursor-pointer hover:text-primary" onClick={() => setUserQuery(`How can I learn ${skill?.name} as a beginner?`)}>
                        How can I learn {skill?.name} as a beginner?
                      </p>
                      <p className="mb-1 cursor-pointer hover:text-primary" onClick={() => setUserQuery(`What are the key components of ${skill?.name}?`)}>
                        What are the key components of {skill?.name}?
                      </p>
                      <p className="cursor-pointer hover:text-primary" onClick={() => setUserQuery(`How is ${skill?.name} applied in real-world scenarios?`)}>
                        How is {skill?.name} applied in real-world scenarios?
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {generating && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Textarea
                  placeholder="Ask about this skill..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!userQuery.trim() || generating}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Tools */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Learning Tools</CardTitle>
              <CardDescription>
                Generate personalized learning resources for {skill?.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTool('assess');
                    setGeneratedContent(null);
                    generateContentWithActiveTool();
                  }}
                  disabled={generating}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Assess Yourself
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTool('notes');
                    setGeneratedContent(null);
                    generateContentWithActiveTool();
                  }}
                  disabled={generating}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create Study Notes
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTool('mindmap');
                    setGeneratedContent(null);
                    generateContentWithActiveTool();
                  }}
                  disabled={generating}
                >
                  <Network className="h-4 w-4 mr-2" />
                  Create Mindmap
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTool('podcast');
                    setGeneratedContent(null);
                    generateContentWithActiveTool();
                  }}
                  disabled={generating}
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Create Microlearning Podcast
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTool('questionnaire');
                    setGeneratedContent(null);
                    generateContentWithActiveTool();
                  }}
                  disabled={generating}
                >
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Create Questionnaire
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTool('overview');
                    setGeneratedContent(null);
                    generateContentWithActiveTool();
                  }}
                  disabled={generating}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Create Brief Overview
                </Button>
              </div>

              {generating && (
                <div className="mt-6 text-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4">Generating content...</p>
                </div>
              )}

              {generatedContent && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">
                    {activeTool === 'assess' && "Self Assessment"}
                    {activeTool === 'notes' && "Study Notes"}
                    {activeTool === 'mindmap' && "Mind Map"}
                    {activeTool === 'podcast' && "Microlearning Podcast Script"}
                    {activeTool === 'questionnaire' && "Question Bank"}
                    {activeTool === 'overview' && "Brief Overview"}
                  </h3>
                  <div className="border rounded-md p-4 bg-muted/50 mt-2 max-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{generatedContent}</pre>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const blob = new Blob([generatedContent], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${skill?.name}-${activeTool}.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        
                        toast({
                          title: "Content downloaded",
                          description: "Your generated content has been downloaded.",
                        });
                      }}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
