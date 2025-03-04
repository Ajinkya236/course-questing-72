
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Maximize2, 
  Save, 
  Share2, 
  Star, 
  SendHorizontal, 
  Menu,
  ArrowLeft  
} from 'lucide-react';
import CourseSidebar from '@/components/course-player/CourseSidebar';
import CourseDetailTab from '@/components/course-player/CourseDetailTab';
import CourseQATab from '@/components/course-player/CourseQATab';
import CourseTranscriptTab from '@/components/course-player/CourseTranscriptTab';
import CourseNotesTab from '@/components/course-player/CourseNotesTab';
import { coursesList } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const CoursePlayer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(25);
  const { toast } = useToast();
  
  // Find the course by ID, or use the first course as a fallback
  const course = coursesList.find(c => c.id === courseId) || coursesList[0];

  const toggleFullscreen = () => {
    const playerElement = document.getElementById('course-player');
    
    if (!playerElement) return;
    
    if (!document.fullscreenElement) {
      playerElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const saveProgress = () => {
    // In a real app, this would save progress to the backend
    toast({
      title: "Progress saved",
      description: "Your progress has been saved successfully.",
    });
  };
  
  const shareCourse = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share options",
      description: "Sharing options would appear here.",
    });
  };
  
  const rateCourse = () => {
    // In a real app, this would open a rating dialog
    toast({
      title: "Rate this course",
      description: "Rating dialog would appear here.",
    });
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <>
      <Helmet>
        <title>{course.title} | Learning Platform</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        {/* Top bar with back button and course title */}
        <div className="bg-primary/10 p-4">
          <div className="container flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold truncate">{course.title}</h1>
          </div>
        </div>
        
        <div className="container py-6 flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Sidebar for course structure - hidden on mobile, toggleable */}
          <div className={`fixed md:relative inset-0 bg-white dark:bg-gray-900 z-30 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-auto md:col-span-1`}>
            <CourseSidebar 
              course={course} 
              currentProgress={progress} 
              onClose={() => setSidebarOpen(false)}
            />
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            {/* Video player section */}
            <div className="relative rounded-lg overflow-hidden bg-black" id="course-player">
              <div className="aspect-video">
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Course Video" 
                  className="w-full h-full" 
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Video player controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-center">
                <Button variant="ghost" className="text-white" onClick={toggleSidebar}>
                  <Menu className="h-5 w-5 mr-2" />
                  <span>Contents</span>
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="text-white" onClick={saveProgress}>
                    <Save className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="text-white" onClick={shareCourse}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="text-white" onClick={rateCourse}>
                    <Star className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="text-white" onClick={toggleFullscreen}>
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {progress}%</span>
                <span>Module 1 of 4</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {/* Tabs for course details, Q&A, Transcript, Notes */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <CourseDetailTab course={course} />
              </TabsContent>
              
              <TabsContent value="qa">
                <CourseQATab courseId={course.id} />
              </TabsContent>
              
              <TabsContent value="transcript">
                <CourseTranscriptTab />
              </TabsContent>
              
              <TabsContent value="notes">
                <CourseNotesTab courseId={course.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePlayer;
