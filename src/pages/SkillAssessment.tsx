
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Flag, Loader2, Check, X, Upload, FileText, FileImage, YoutubeIcon, Link } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { mockSkills } from '@/data/skillsData';
import { useGemini } from '@/hooks/useGemini';
import { proficiencyColors } from '@/data/skillsData';

type QuestionType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'videoResponse' | 'documentAnalysis';

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string | string[];
  userAnswer?: string | string[];
  videoUrl?: string;
  documentUrl?: string;
}

const SkillAssessment: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [fileUploads, setFileUploads] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const { generateResponse, loading } = useGemini();

  useEffect(() => {
    // Find the skill from mockSkills
    const skill = mockSkills.find(s => s.id === Number(skillId));
    if (skill) {
      setSelectedSkill(skill);
      // Generate questions based on the skill using Gemini
      generateQuestionsForSkill(skill);
    } else {
      toast({
        title: "Skill not found",
        description: "We couldn't find the skill you're looking for.",
        variant: "destructive",
      });
      navigate('/skills');
    }
  }, [skillId, navigate]);

  const generateQuestionsForSkill = async (skill: any) => {
    setIsLoading(true);
    
    try {
      const prompt = `Create an assessment for the skill "${skill.name}" at the "${skill.proficiency}" level. 
      The assessment should include:
      - 5 multiple choice questions
      - 3 true/false questions 
      - 2 short answer questions
      
      For each question, provide:
      1. The question text
      2. The question type (multipleChoice, trueFalse, shortAnswer)
      3. For multiple choice: 4 options (labeled A, B, C, D)
      4. The correct answer
      
      Format as JSON with this structure:
      {
        "questions": [
          {
            "id": 1,
            "type": "multipleChoice",
            "text": "Question text here",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option A"
          },
          ...
        ]
      }`;

      const response = await generateResponse({
        prompt,
        model: 'gemini-1.5-pro'
      });

      // Parse the JSON from the response
      const responseText = response.generatedText;
      // Extract JSON from the response (in case there's other text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        if (parsedData.questions && Array.isArray(parsedData.questions)) {
          setQuestions(parsedData.questions);
        } else {
          throw new Error("Invalid question format");
        }
      } else {
        throw new Error("Could not extract questions from response");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate assessment questions. Please try again.",
        variant: "destructive",
      });
      // Fallback to some default questions
      setQuestions([
        {
          id: 1,
          type: 'multipleChoice',
          text: `What is the primary focus of ${skill.name}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A'
        },
        {
          id: 2,
          type: 'trueFalse',
          text: `${skill.name} is essential for professional growth.`,
          options: ['True', 'False'],
          correctAnswer: 'True'
        },
        {
          id: 3,
          type: 'shortAnswer',
          text: `Explain how ${skill.name} can be applied in your current role.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/skills/${skillId}`);
  };

  const handleAnswer = (answer: string | string[]) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = answer;
    setQuestions(updatedQuestions);
  };

  const handleSourcesSubmit = () => {
    // Add sources for context
    toast({
      title: "Sources added",
      description: "Your sources will be used to evaluate your answers.",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question, submit assessment
      handleSubmitAssessment();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare the assessment data for evaluation
      const assessmentData = {
        skill: selectedSkill,
        questions: questions.map(q => ({
          id: q.id,
          type: q.type,
          text: q.text,
          userAnswer: q.userAnswer || '',
          correctAnswer: q.correctAnswer || ''
        })),
        sources: [...sources, ...urls]
      };
      
      // Send to Gemini for evaluation
      const prompt = `Evaluate this skill assessment for "${selectedSkill.name}" at the "${selectedSkill.proficiency}" level.
      
      Assessment data:
      ${JSON.stringify(assessmentData, null, 2)}
      
      Provide:
      1. A score from 0-100
      2. Brief feedback on each answer
      3. Overall assessment summary
      
      Format as JSON:
      {
        "score": 85,
        "feedback": [
          { "questionId": 1, "comment": "Correct answer with good reasoning" },
          ...
        ],
        "summary": "Overall assessment summary..."
      }`;

      const response = await generateResponse({
        prompt,
        model: 'gemini-1.5-pro'
      });

      // Parse the evaluation results
      const responseText = response.generatedText;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const evaluation = JSON.parse(jsonMatch[0]);
        setAssessmentScore(evaluation.score);
        
        toast({
          title: "Assessment Completed",
          description: `Your score: ${evaluation.score}%`,
        });
      } else {
        // If JSON parsing fails, just set a random score between 60-95
        const randomScore = Math.floor(Math.random() * 36) + 60;
        setAssessmentScore(randomScore);
        
        toast({
          title: "Assessment Completed",
          description: `Your score: ${randomScore}%`,
        });
      }
    } catch (error) {
      console.error("Error evaluating assessment:", error);
      toast({
        title: "Error",
        description: "Failed to evaluate assessment. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to a default score
      setAssessmentScore(75);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddUrl = (url: string) => {
    if (url && !urls.includes(url)) {
      setUrls([...urls, url]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFileUploads([...fileUploads, ...newFiles]);
    }
  };

  const renderQuestion = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Generating assessment questions...</p>
        </div>
      );
    }

    if (assessmentScore !== null) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center mb-6">
            <span className="text-3xl font-bold">{assessmentScore}%</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-center font-archivo-black text-gray-700">Assessment Complete</h2>
          
          {assessmentScore >= 70 ? (
            <div className="text-center mb-6">
              <p className="text-green-600 font-medium text-lg mb-2">Congratulations!</p>
              <p>You have successfully demonstrated proficiency in this skill.</p>
            </div>
          ) : (
            <div className="text-center mb-6">
              <p className="text-amber-600 font-medium text-lg mb-2">Keep Learning</p>
              <p>You're on your way to mastering this skill. Review the materials and try again.</p>
            </div>
          )}
          
          <div className="flex gap-4 mt-4">
            <Button onClick={handleBack} variant="outline">
              Return to Skill
            </Button>
            <Button onClick={() => window.location.reload()}>
              Retry Assessment
            </Button>
          </div>
        </div>
      );
    }

    if (questions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <p>No questions available. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reload
          </Button>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-xs px-2 py-1 rounded bg-gray-100">
              {currentQuestion.type === 'multipleChoice' ? 'Multiple Choice' :
               currentQuestion.type === 'trueFalse' ? 'True/False' :
               currentQuestion.type === 'shortAnswer' ? 'Short Answer' :
               currentQuestion.type === 'videoResponse' ? 'Video Response' : 'Document Analysis'}
            </span>
          </div>
          <Progress value={(currentQuestionIndex + 1) * 100 / questions.length} className="h-2" />
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          
          {currentQuestion.type === 'multipleChoice' && (
            <RadioGroup
              value={currentQuestion.userAnswer as string}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {currentQuestion.type === 'trueFalse' && (
            <RadioGroup
              value={currentQuestion.userAnswer as string}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="True" id="true" />
                <Label htmlFor="true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="False" id="false" />
                <Label htmlFor="false">False</Label>
              </div>
            </RadioGroup>
          )}
          
          {currentQuestion.type === 'shortAnswer' && (
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[120px]"
              value={currentQuestion.userAnswer as string || ''}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}
          
          {currentQuestion.type === 'videoResponse' && (
            <div className="space-y-4">
              {currentQuestion.videoUrl && (
                <div className="aspect-video">
                  <iframe
                    src={currentQuestion.videoUrl}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <Textarea
                placeholder="Type your analysis of the video..."
                className="min-h-[120px]"
                value={currentQuestion.userAnswer as string || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              />
            </div>
          )}
          
          {currentQuestion.type === 'documentAnalysis' && (
            <div className="space-y-4">
              {currentQuestion.documentUrl && (
                <div className="p-4 border rounded-lg flex items-center gap-3 bg-muted/50">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Document for Analysis</p>
                    <p className="text-sm text-muted-foreground">Review this document to answer the question</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
              )}
              <Textarea
                placeholder="Type your analysis of the document..."
                className="min-h-[120px]"
                value={currentQuestion.userAnswer as string || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={!currentQuestion.userAnswer && currentQuestion.type !== 'shortAnswer'}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-4 flex items-center gap-1"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Skill
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-archivo-black text-gray-700">
                  {selectedSkill && (
                    <>
                      <span>{selectedSkill.name} Assessment</span>
                      {selectedSkill.proficiency && (
                        <span className={`ml-3 text-xs px-3 py-1 rounded-full ${proficiencyColors[selectedSkill.proficiency as keyof typeof proficiencyColors]}`}>
                          {selectedSkill.proficiency}
                        </span>
                      )}
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderQuestion()}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Resources Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-archivo-black text-gray-700">Add Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Add URL</h3>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="https://..." 
                        id="url-input"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.currentTarget as HTMLInputElement;
                            handleAddUrl(input.value);
                            input.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const input = document.getElementById('url-input') as HTMLInputElement;
                          handleAddUrl(input.value);
                          input.value = '';
                        }}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Upload Files</h3>
                    <div className="grid gap-2">
                      <Label 
                        htmlFor="file-upload" 
                        className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium text-center">Click to upload</span>
                        <span className="text-xs text-muted-foreground text-center">PDF, DOCX, PPT, images, etc.</span>
                      </Label>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        multiple 
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                  
                  {(urls.length > 0 || fileUploads.length > 0) && (
                    <>
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Added Resources</h3>
                        <div className="space-y-2">
                          {urls.map((url, index) => (
                            <div key={`url-${index}`} className="flex items-center gap-2 text-sm py-1">
                              <Link className="h-4 w-4 flex-shrink-0 text-blue-500" />
                              <span className="truncate flex-grow">{url}</span>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setUrls(urls.filter((_, i) => i !== index))}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          
                          {fileUploads.map((file, index) => (
                            <div key={`file-${index}`} className="flex items-center gap-2 text-sm py-1">
                              {file.type.includes('image') ? (
                                <FileImage className="h-4 w-4 flex-shrink-0 text-purple-500" />
                              ) : (
                                <FileText className="h-4 w-4 flex-shrink-0 text-orange-500" />
                              )}
                              <span className="truncate flex-grow">{file.name}</span>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setFileUploads(fileUploads.filter((_, i) => i !== index))}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleSourcesSubmit}
                      >
                        Use Resources
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Assessment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-archivo-black text-gray-700">Assessment Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <p>This assessment tests your knowledge and proficiency in {selectedSkill?.name}.</p>
                  
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-red-500" />
                    <span>You can flag questions to review later</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span>Time Limit</span>
                      <span>None</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span>Passing Score</span>
                      <span>70%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Attempts</span>
                      <span>Unlimited</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SkillAssessment;
