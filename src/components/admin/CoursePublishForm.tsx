
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { 
  Alert,
  AlertDescription,
  AlertTitle 
} from "@/components/ui/alert";
import {
  BookText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Award,
  FileCheck,
  Users,
  Upload,
  VideoIcon, // Changed Video to VideoIcon
  Link2 // Changed Link to Link2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CoursePublishFormProps {
  courseData: any;
  onPublish: () => void;
}

const CoursePublishForm: React.FC<CoursePublishFormProps> = ({ courseData, onPublish }) => {
  // Calculate validation status
  const isTitleValid = courseData.title && courseData.title.length > 0;
  const isDescriptionValid = courseData.description && courseData.description.length > 0;
  const isSkillsValid = courseData.skills && courseData.skills.length > 0;
  const isImageValid = courseData.imageUrl && courseData.imageUrl.length > 0;
  const isModulesValid = courseData.modules && courseData.modules.length > 0;
  const hasActivities = 
    (courseData.quizActivities && courseData.quizActivities.length > 0) || 
    (courseData.videoActivities && courseData.videoActivities.length > 0);
  
  const isReadyToPublish = 
    isTitleValid && 
    isDescriptionValid && 
    isSkillsValid && 
    isImageValid && 
    isModulesValid && 
    hasActivities;
  
  // Calculate course stats
  const totalModules = courseData.modules ? courseData.modules.length : 0;
  const totalQuizzes = courseData.quizActivities ? courseData.quizActivities.length : 0;
  const totalVideos = courseData.videoActivities ? 
    courseData.videoActivities.filter((a: any) => a.type === 'video').length : 0;
  const totalExternalLinks = courseData.videoActivities ? 
    courseData.videoActivities.filter((a: any) => a.type === 'external').length : 0;
  const totalActivities = totalQuizzes + totalVideos + totalExternalLinks;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review & Publish Course</CardTitle>
          <CardDescription>
            Review your course details before publishing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!isReadyToPublish && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Incomplete Course</AlertTitle>
                <AlertDescription>
                  Your course is missing some required information. Please complete all required fields before publishing.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookText className="h-5 w-5 text-primary" />
                      <span className="font-medium">Modules</span>
                    </div>
                    <span className="text-2xl font-bold">{totalModules}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="h-5 w-5 text-primary" />
                      <span className="font-medium">Activities</span>
                    </div>
                    <span className="text-2xl font-bold">{totalActivities}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">Level</span>
                    </div>
                    <span className="text-lg font-bold capitalize">{courseData.proficiencyLevel || "Beginner"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Est. Duration</span>
                    </div>
                    <span className="text-lg font-bold">
                      {courseData.modules?.reduce((total: number, module: any) => {
                        // Extract hours from strings like "2 hours" or "2.5 hours"
                        const match = module.duration?.match(/(\d+\.?\d*)/);
                        const hours = match ? parseFloat(match[1]) : 0;
                        return total + hours;
                      }, 0) || 0} hours
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-2">Course Summary</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Title</h4>
                      <p className={!isTitleValid ? "text-destructive italic" : ""}>
                        {isTitleValid ? courseData.title : "No title provided"}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium">Description</h4>
                      <p className={!isDescriptionValid ? "text-destructive italic" : ""}>
                        {isDescriptionValid ? courseData.description : "No description provided"}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium">Skills</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {isSkillsValid ? (
                          courseData.skills.map((skill: string, i: number) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                          ))
                        ) : (
                          <p className="text-destructive italic">No skills selected</p>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium">Course Image</h4>
                      {isImageValid ? (
                        <div className="mt-2 w-full max-w-xs aspect-video bg-muted rounded-md overflow-hidden">
                          <img 
                            src={courseData.imageUrl} 
                            alt={courseData.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <p className="text-destructive italic">No image uploaded</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-2">Course Content</h3>
              
              {!isModulesValid ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No Modules Added</AlertTitle>
                  <AlertDescription>
                    You need to add at least one module to your course.
                  </AlertDescription>
                </Alert>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {courseData.modules.map((module: any, index: number) => {
                    const moduleQuizzes = courseData.quizActivities?.filter((a: any) => a.moduleId === module.id) || [];
                    const moduleVideos = courseData.videoActivities?.filter((a: any) => a.moduleId === module.id) || [];
                    
                    return (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger>
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="text-left">
                              <span className="font-medium">Module {index + 1}: {module.title}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {moduleQuizzes.length + moduleVideos.length} activities
                                </span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">
                                  {module.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4 pl-4 space-y-3">
                            {moduleQuizzes.length === 0 && moduleVideos.length === 0 ? (
                              <p className="text-destructive italic">No activities in this module</p>
                            ) : (
                              <>
                                {moduleQuizzes.map((quiz: any) => (
                                  <div key={quiz.id} className="flex items-center gap-2">
                                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                                    <span>{quiz.title}</span>
                                    <Badge variant="outline" className="ml-2">Quiz</Badge>
                                  </div>
                                ))}
                                
                                {moduleVideos.map((video: any) => (
                                  <div key={video.id} className="flex items-center gap-2">
                                    {video.type === 'video' ? (
                                      <VideoIcon className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Link2 className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span>{video.title}</span>
                                    <Badge variant="outline" className="ml-2">
                                      {video.type === 'video' ? 'Video' : 'External Link'}
                                    </Badge>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </div>
            
            <div className="pt-6 flex justify-center">
              <Button 
                size="lg" 
                onClick={onPublish}
                disabled={!isReadyToPublish}
                className="w-full max-w-md"
              >
                {isReadyToPublish ? (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Publish Course
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Complete Required Fields to Publish
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePublishForm;
