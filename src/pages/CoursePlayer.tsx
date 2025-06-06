import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, Menu, BookOpen, MessageSquare, FileText, 
  PenSquare, Bookmark, UserPlus, Share2, Star, Maximize, Minimize,
  Award, Trophy, TrendingUp, CheckCircle, Gift, AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import CourseSidebar from '@/components/course/CourseSidebar';
import CourseDetailsTab from '@/components/course/CourseDetailsTab';
import CourseQATab from '@/components/course/CourseQATab';
import CourseTranscriptTab from '@/components/course/CourseTranscriptTab';
import CourseNotesTab from '@/components/course/CourseNotesTab';
import { Course, Activity } from '@/types/course';

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

// Mock quiz data
const mockQuizData = {
  title: "Leadership Styles Quiz",
  questions: [
    {
      id: "q1",
      text: "Which leadership style involves making decisions without consulting team members?",
      options: [
        { id: "a", text: "Autocratic" },
        { id: "b", text: "Democratic" },
        { id: "c", text: "Laissez-faire" },
        { id: "d", text: "Transformational" }
      ],
      correctAnswer: "a"
    },
    {
      id: "q2",
      text: "A democratic leadership style is characterized by:",
      options: [
        { id: "a", text: "Minimal supervision and guidance" },
        { id: "b", text: "High level of control and direction" },
        { id: "c", text: "Team involvement in decision-making" },
        { id: "d", text: "Focus on short-term goals only" }
      ],
      correctAnswer: "c"
    }
  ]
};

// Mock gamification data
const mockGamificationData = {
  streakDays: 3,
  totalPoints: 450,
  currentLevel: 'Explorer',
  nextLevel: 'Specialist',
  levelProgress: 75,
  achievements: [
    { id: 'a1', title: 'First Steps', description: 'Complete your first activity', unlocked: true },
    { id: 'a2', title: 'Perfect Score', description: 'Get 100% on a quiz', unlocked: true },
    { id: 'a3', title: 'Course Master', description: 'Complete all activities in a course', unlocked: false }
  ],
  badges: [
    { id: 'b1', name: 'Fast Learner', icon: '🚀' },
    { id: 'b2', name: 'Quiz Whiz', icon: '🧠' }
  ]
};

const CoursePlayer: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Changed to true for open by default
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [currentActivityId, setCurrentActivityId] = useState<string>("a1");
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("John Smith");
  const [showAchievement, setShowAchievement] = useState<boolean>(false);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState<boolean>(false);
  
  const courseData: Course = mockCourseData; // In a real app, this would filter based on courseId
  
  // Find the current activity
  const getCurrentActivity = (): Activity | null => {
    for (const module of courseData.modules) {
      const activity = module.activities.find(a => a.id === currentActivityId);
      if (activity) return activity;
    }
    return null;
  };
  
  const currentActivity = getCurrentActivity();
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
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
  
  const handleActivitySelect = (activityId: string) => {
    setCurrentActivityId(activityId);
    toast.info(`Loading activity: ${activityId}`);
  };
  
  const awardPoints = (points: number) => {
    setEarnedPoints(points);
    setShowPointsAnimation(true);
    
    setTimeout(() => {
      setShowPointsAnimation(false);
    }, 3000);
  };
  
  const showAchievementUnlocked = () => {
    setShowAchievement(true);
    
    setTimeout(() => {
      setShowAchievement(false);
    }, 4000);
  };
  
  const completeActivity = () => {
    // Update the activity completion status
    const updatedModules = courseData.modules.map(module => ({
      ...module,
      activities: module.activities.map(activity => 
        activity.id === currentActivityId 
          ? { ...activity, completed: true } 
          : activity
      )
    }));
    
    // Update the course data with the completed activity
    Object.assign(courseData, { modules: updatedModules });
    
    // Check if course is completed
    const allActivitiesCompleted = updatedModules.every(module => 
      module.activities.every(activity => activity.completed)
    );
    
    // Award points based on activity type
    const pointsEarned = currentActivity?.type === 'quiz' ? 50 : 25;
    awardPoints(pointsEarned);
    
    // Show achievement if it's quiz with 100% score or first completed activity
    if (currentActivity?.type === 'quiz') {
      showAchievementUnlocked();
    }
    
    if (allActivitiesCompleted) {
      setCourseCompleted(true);
      toast.success("Congratulations! You've completed the course.");
    }
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  useEffect(() => {
    // Mark all activities as completed for demo
    const checkCompletion = () => {
      const totalActivities = courseData.modules.reduce(
        (total, module) => total + module.activities.length, 0
      );
      
      const completedActivities = courseData.modules.reduce(
        (total, module) => 
          total + module.activities.filter(activity => activity.completed).length, 
        0
      );
      
      // Consider course completed if more than 80% activities are done
      if (completedActivities / totalActivities > 0.8) {
        setCourseCompleted(true);
      }
    };
    
    checkCompletion();
  }, [courseData]);

  // Render appropriate content based on activity type
  const renderActivityContent = () => {
    if (!currentActivity) return null;
    
    switch(currentActivity.type) {
      case 'video':
        return (
          <iframe
            src={courseData.videoUrl}
            title={currentActivity.title}
            className="w-full h-full"
            allowFullScreen
          />
        );
      case 'quiz':
        return (
          <div className="bg-white p-6 rounded-md h-full overflow-auto">
            <h2 className="text-xl font-bold mb-4">{mockQuizData.title}</h2>
            
            <div className="space-y-6">
              {mockQuizData.questions.map((question, index) => (
                <div key={question.id} className="border p-4 rounded-md">
                  <h3 className="font-medium mb-3">Question {index + 1}: {question.text}</h3>
                  
                  <div className="space-y-2">
                    {question.options.map(option => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id={`${question.id}-${option.id}`} 
                          name={question.id} 
                          className="rounded-full"
                        />
                        <label htmlFor={`${question.id}-${option.id}`}>{option.text}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={completeActivity}>Submit Quiz</Button>
            </div>
          </div>
        );
      case 'h5p':
        return (
          <div className="bg-white p-6 rounded-md h-full flex flex-col items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold">{currentActivity.title}</h2>
              <p className="text-gray-500">Interactive H5P content would load here</p>
              <Button onClick={completeActivity}>Complete Activity</Button>
            </div>
          </div>
        );
      default:
        return <div>Unknown activity type</div>;
    }
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
          onActivitySelect={handleActivitySelect}
          currentActivityId={currentActivityId}
        />
        
        <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? '' : 'ml-0'}`}>
          <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {!isFullscreen && (
                <Button variant="ghost" size="icon" onClick={goBack}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleSidebar}
                className={isSidebarOpen ? "bg-primary text-primary-foreground" : ""}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold truncate max-w-[300px] md:max-w-md">
                {currentActivity ? currentActivity.title : courseData.title}
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
          
          {/* Gamification - Learning Progress */}
          <div className="bg-muted/30 p-3 border-b flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Course Progress</span>
              </div>
              <div className="w-36 md:w-48">
                <Progress value={75} className="h-2" />
              </div>
              <span className="text-sm font-medium">75%</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Level: Explorer</span>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">450 Points</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">2 Badges</span>
              </div>
            </div>
          </div>
          
          <div className={`w-full transition-all duration-300 ${isFullscreen ? 'h-screen' : 'aspect-video'}`}>
            {renderActivityContent()}
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
                <CourseDetailsTab 
                  course={courseData} 
                  userName={userName}
                  isCompleted={courseCompleted}
                />
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
      
      {/* Gamification - Achievement Unlocked Animation */}
      {showAchievement && (
        <div className="fixed top-20 right-0 p-4 animate-slide-in-right">
          <div className="bg-black/90 text-white p-4 rounded-l-lg shadow-lg flex items-center gap-3">
            <Award className="h-10 w-10 text-yellow-400" />
            <div>
              <h4 className="font-bold text-lg">Achievement Unlocked!</h4>
              <p>Perfect Score: Get 100% on a quiz</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Gamification - Points Animation */}
      {showPointsAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in">
          <div className="bg-primary/90 text-white px-6 py-4 rounded-full shadow-lg text-center font-bold text-2xl">
            +{earnedPoints} Points!
          </div>
        </div>
      )}
      
      {/* Streak Notification */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-black/80 text-white p-3 rounded-lg shadow-lg flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm">3-day learning streak!</p>
          </div>
          <Button size="sm" variant="link" className="text-primary p-0 h-auto">View</Button>
        </div>
      </div>
    </>
  );
};

export default CoursePlayer;
