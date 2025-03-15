
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  FileCheck, 
  CheckCircle2, 
  BookText, 
  ClipboardList, 
  Video, 
  Upload, 
  Save
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import Step Components
import CourseMetadataForm from "@/components/admin/CourseMetadataForm";
import ModuleManagement from "@/components/admin/ModuleManagement";
import QuizActivityForm from "@/components/admin/QuizActivityForm";
import VideoActivityForm from "@/components/admin/VideoActivityForm";
import CoursePublishForm from "@/components/admin/CoursePublishForm";

// Define steps
const steps = [
  {
    id: "metadata",
    name: "Course Metadata",
    icon: FileCheck,
    description: "Define course details and metadata"
  },
  {
    id: "modules",
    name: "Modules Management",
    icon: BookText,
    description: "Add and manage course modules"
  },
  {
    id: "quiz-activities",
    name: "Quiz Activities",
    icon: ClipboardList,
    description: "Add quiz activities to modules"
  },
  {
    id: "video-activities",
    name: "Video Activities",
    icon: Video,
    description: "Add video and external content"
  },
  {
    id: "publish",
    name: "Publish Course",
    icon: Upload,
    description: "Review and publish your course"
  }
];

// Initial course data
const initialCourseData = {
  title: '',
  description: '',
  skills: [],
  proficiencyLevel: 'beginner',
  imageUrl: '',
  academy: '',
  subAcademy: '',
  feedbackForms: [],
  modules: [],
  quizActivities: [],
  videoActivities: [],
};

const CourseCreation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState(initialCourseData);
  const [activeTab, setActiveTab] = useState("metadata");
  const navigate = useNavigate();

  const updateCourseData = (data: Partial<typeof courseData>) => {
    setCourseData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setActiveTab(steps[nextStep].id);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setActiveTab(steps[prevStep].id);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const stepIndex = steps.findIndex(step => step.id === value);
    if (stepIndex >= 0) {
      setCurrentStep(stepIndex);
    }
  };

  const handleDraftSave = () => {
    // Save as draft logic
    toast({
      title: "Draft saved",
      description: "Your course has been saved as a draft."
    });
  };

  const handlePublish = () => {
    // Publish course logic
    toast({
      title: "Course published successfully!",
      description: "Your course is now live and available for learners."
    });
    navigate('/admin/courses');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <p className="text-muted-foreground">Complete all steps to create and publish your course</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Creation Wizard</CardTitle>
            <CardDescription>Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                {steps.map((step, index) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    disabled={index > currentStep}
                    className="relative"
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                        {index < currentStep ? (
                          <CheckCircle2 className="h-6 w-6 text-primary" />
                        ) : (
                          <step.icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className="text-xs font-medium hidden md:block">{step.name}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="metadata" className="mt-0 space-y-4">
                <CourseMetadataForm 
                  data={courseData} 
                  updateData={updateCourseData} 
                />
              </TabsContent>

              <TabsContent value="modules" className="mt-0 space-y-4">
                <ModuleManagement 
                  courseData={courseData} 
                  updateCourseData={updateCourseData} 
                />
              </TabsContent>

              <TabsContent value="quiz-activities" className="mt-0 space-y-4">
                <QuizActivityForm 
                  courseData={courseData} 
                  updateCourseData={updateCourseData} 
                />
              </TabsContent>

              <TabsContent value="video-activities" className="mt-0 space-y-4">
                <VideoActivityForm 
                  courseData={courseData} 
                  updateCourseData={updateCourseData} 
                />
              </TabsContent>

              <TabsContent value="publish" className="mt-0 space-y-4">
                <CoursePublishForm 
                  courseData={courseData} 
                  onPublish={handlePublish} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="mr-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDraftSave}
                className="flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
            </div>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handlePublish}>
                Publish Course
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CourseCreation;
