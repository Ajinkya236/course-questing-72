import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, Menu, BookOpen, MessageSquare, FileText, 
  PenSquare, Bookmark, UserPlus, Share2, Star, Maximize, Minimize
} from "lucide-react";
import { toast } from "sonner";
import CourseSidebar from '@/components/course/CourseSidebar';
import CourseDetailsTab from '@/components/course/CourseDetailsTab';
import CourseQATab from '@/components/course/CourseQATab';
import CourseTranscriptTab from '@/components/course/CourseTranscriptTab';
import CourseNotesTab from '@/components/course/CourseNotesTab';
import { Course } from '@/types/course';

// Mock data for the current course
const mockCourseData: Course = {
  id: '1',
  title: 'Leadership for New Managers',
  description: 'Essential skills for first-time managers and team leaders',
  imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  category: 'Leadership',
  duration: '4h 30m',
  rating: 4.7,
  isBookmarked: false,
  learningObjectives: [
    'Understand the key responsibilities of a manager',
    'Learn effective delegation techniques',
    'Develop skills for providing constructive feedback',
    'Build strategies for team motivation and engagement'
  ],
  skills: [
    { name: 'Team Leadership', proficiency: 'Advanced' },
    { name: 'Delegation', proficiency: 'Intermediate' },
    { name: 'Conflict Resolution', proficiency: 'Intermediate' },
    { name: 'Performance Management', proficiency: 'Beginner' }
  ],
  certificates: [
    'Leadership Fundamentals Certificate',
    'People Management Certification'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with your actual video URL
  modules: [
    {
      id: 'm1',
      title: 'Introduction to Leadership',
      activities: [
        { id: 'a1', title: 'Welcome Video', type: 'video', duration: '10m', completed: true },
        { id: 'a2', title: 'Leadership Styles Quiz', type: 'quiz', duration: '15m', completed: true }
      ]
    },
    {
      id: 'm2',
      title: 'Effective Communication',
      activities: [
        { id: 'a3', title: 'Communication Basics', type: 'video', duration: '20m', completed: false },
        { id: 'a4', title: 'Active Listening Exercise', type: 'h5p', duration: '15m', completed: false }
      ]
    },
    {
      id: 'm3',
      title: 'Delegation and Empowerment',
      activities: [
        { id: 'a5', title: 'Delegation Principles', type: 'video', duration: '25m', completed: false },
        { id: 'a6', title: 'Delegation Scenarios', type: 'h5p', duration: '20m', completed: false }
      ]
    }
  ]
};

const CoursePlayer: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  
  const courseData: Course = mockCourseData; // In a real app, this would filter based on courseId
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleBookmark = () => {
    toast.success(`${courseData.isBookmarked ? 'Removed from' : 'Saved to'} bookmarks`);
  };
  
  const handleAssign = () => {
    toast.success('Course assigned successfully');
  };
  
  const handleShare = () => {
    toast.success('Course link copied to clipboard');
  };
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast.success(`You rated this course ${rating} stars`);
  };
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>{courseData.title} | Learning Management System</title>
      </Helmet>
      
      <div className={`flex min-h-screen ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
        <CourseSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          course={courseData}
        />
        
        <div className="flex-1 overflow-auto">
          <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {!isFullscreen && (
                <Button variant="ghost" size="icon" onClick={goBack}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              <Button variant="outline" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold truncate max-w-[300px] md:max-w-md">
                {courseData.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBookmark}
                className={courseData.isBookmarked ? "text-primary" : ""}
              >
                <Bookmark className={`h-5 w-5 ${courseData.isBookmarked ? "fill-primary" : ""}`} />
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleAssign}>
                <UserPlus className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          <div className={`aspect-video w-full ${isFullscreen ? 'h-[50vh]' : ''}`}>
            <iframe
              src={courseData.videoUrl}
              title={courseData.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
          
          <div className="p-4">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Details
                </TabsTrigger>
                <TabsTrigger value="qa" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Q&A
                </TabsTrigger>
                <TabsTrigger value="transcript" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Transcript
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <PenSquare className="h-4 w-4" /> Notes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <CourseDetailsTab course={courseData} />
              </TabsContent>
              
              <TabsContent value="qa">
                <CourseQATab courseId={courseData.id} />
              </TabsContent>
              
              <TabsContent value="transcript">
                <CourseTranscriptTab />
              </TabsContent>
              
              <TabsContent value="notes">
                <CourseNotesTab courseId={courseData.id} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Rate this course</h3>
                <p className="text-sm text-muted-foreground">Your feedback helps us improve our content</p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRating(star)}
                    className={userRating && userRating >= star ? "text-yellow-500" : ""}
                  >
                    <Star className={`h-6 w-6 ${userRating && userRating >= star ? "fill-yellow-500" : ""}`} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePlayer;
