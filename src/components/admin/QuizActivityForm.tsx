
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface QuizActivityFormProps {
  courseData: any;
  updateCourseData: (data: any) => void;
}

const QuizActivityForm: React.FC<QuizActivityFormProps> = ({ courseData, updateCourseData }) => {
  const [quizActivities, setQuizActivities] = useState(courseData.quizActivities || []);
  const [selectedModule, setSelectedModule] = useState("");
  
  const handleAddQuizActivity = () => {
    if (!selectedModule) {
      toast({
        title: "Module selection required",
        description: "Please select a module to add a quiz activity to",
        variant: "destructive"
      });
      return;
    }
    
    const newQuizActivity = {
      id: `quiz-${Date.now()}`,
      moduleId: selectedModule,
      title: "New Quiz",
      description: "Quiz description",
      questions: [],
      timeLimit: 10,
      passingScore: 70,
      shuffleQuestions: true,
      maxAttempts: 3
    };
    
    const updatedQuizActivities = [...quizActivities, newQuizActivity];
    setQuizActivities(updatedQuizActivities);
    updateCourseData({ quizActivities: updatedQuizActivities });
    
    toast({
      title: "Quiz activity added",
      description: "A new quiz activity has been added to the module"
    });
  };
  
  const handleDeleteQuizActivity = (id: string) => {
    const updatedQuizActivities = quizActivities.filter((activity: any) => activity.id !== id);
    setQuizActivities(updatedQuizActivities);
    updateCourseData({ quizActivities: updatedQuizActivities });
    
    toast({
      title: "Quiz activity deleted",
      description: "The quiz activity has been removed"
    });
  };
  
  const getModuleTitle = (moduleId: string) => {
    const module = courseData.modules.find((m: any) => m.id === moduleId);
    return module ? module.title : "Unknown Module";
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Activities</CardTitle>
          <CardDescription>
            Add quiz activities to course modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="module-select">Select Module</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a module" />
                </SelectTrigger>
                <SelectContent>
                  {courseData.modules && courseData.modules.length > 0 ? (
                    courseData.modules.map((module: any) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-modules" disabled>
                      No modules available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleAddQuizActivity}
              disabled={!selectedModule || courseData.modules.length === 0}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Quiz Activity
            </Button>

            {courseData.modules && courseData.modules.length === 0 && (
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm text-muted-foreground">
                  You need to add modules first before adding quiz activities.
                </p>
              </div>
            )}
            
            {quizActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No quiz activities added yet</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {quizActivities.map((activity: any, index: number) => (
                  <AccordionItem key={activity.id} value={activity.id}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="text-left">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Module: {getModuleTitle(activity.moduleId)}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`quiz-title-${index}`}>Quiz Title</Label>
                            <Input
                              id={`quiz-title-${index}`}
                              defaultValue={activity.title}
                              onChange={(e) => {
                                const updatedActivities = [...quizActivities];
                                updatedActivities[index].title = e.target.value;
                                setQuizActivities(updatedActivities);
                                updateCourseData({ quizActivities: updatedActivities });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`time-limit-${index}`}>Time Limit (minutes)</Label>
                            <Input
                              id={`time-limit-${index}`}
                              type="number"
                              min="1"
                              defaultValue={activity.timeLimit}
                              onChange={(e) => {
                                const updatedActivities = [...quizActivities];
                                updatedActivities[index].timeLimit = parseInt(e.target.value);
                                setQuizActivities(updatedActivities);
                                updateCourseData({ quizActivities: updatedActivities });
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`quiz-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`quiz-desc-${index}`}
                            defaultValue={activity.description}
                            onChange={(e) => {
                              const updatedActivities = [...quizActivities];
                              updatedActivities[index].description = e.target.value;
                              setQuizActivities(updatedActivities);
                              updateCourseData({ quizActivities: updatedActivities });
                            }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`passing-score-${index}`}>Passing Score (%)</Label>
                            <Input
                              id={`passing-score-${index}`}
                              type="number"
                              min="1"
                              max="100"
                              defaultValue={activity.passingScore}
                              onChange={(e) => {
                                const updatedActivities = [...quizActivities];
                                updatedActivities[index].passingScore = parseInt(e.target.value);
                                setQuizActivities(updatedActivities);
                                updateCourseData({ quizActivities: updatedActivities });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`max-attempts-${index}`}>Maximum Attempts</Label>
                            <Input
                              id={`max-attempts-${index}`}
                              type="number"
                              min="1"
                              defaultValue={activity.maxAttempts}
                              onChange={(e) => {
                                const updatedActivities = [...quizActivities];
                                updatedActivities[index].maxAttempts = parseInt(e.target.value);
                                setQuizActivities(updatedActivities);
                                updateCourseData({ quizActivities: updatedActivities });
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`shuffle-${index}`}
                            checked={activity.shuffleQuestions}
                            onCheckedChange={(checked) => {
                              const updatedActivities = [...quizActivities];
                              updatedActivities[index].shuffleQuestions = checked;
                              setQuizActivities(updatedActivities);
                              updateCourseData({ quizActivities: updatedActivities });
                            }}
                          />
                          <Label htmlFor={`shuffle-${index}`}>Shuffle questions</Label>
                        </div>
                        
                        <div className="pt-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteQuizActivity(activity.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Quiz
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizActivityForm;
