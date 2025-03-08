
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import { coursesList } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, BookOpen } from 'lucide-react';

interface CoursesTabProps {
  initialActiveTab?: string;
  teamMemberId?: string | null;
}

// Mock skills data that would be gained from courses
const skillsData = [
  { id: 1, name: 'Leadership', currentProficiency: 45, targetProficiency: 75, related: ['leadership', 'management'] },
  { id: 2, name: 'Data Analysis', currentProficiency: 60, targetProficiency: 80, related: ['analysis', 'data science'] },
  { id: 3, name: 'UX/UI Design', currentProficiency: 30, targetProficiency: 70, related: ['design', 'user experience'] },
  { id: 4, name: 'Project Management', currentProficiency: 55, targetProficiency: 85, related: ['management', 'planning'] },
  { id: 5, name: 'Communication', currentProficiency: 70, targetProficiency: 90, related: ['presentation', 'writing'] }
];

// Training categories for assigned courses
const trainingCategories = ['Self-assigned', 'Manager-assigned', 'Ready for Role', 'Leadership', 'Mandatory', 'Special Drive'];

const CoursesTab: React.FC<CoursesTabProps> = ({ initialActiveTab, teamMemberId }) => {
  const [activeTab, setActiveTab] = useState('assigned');
  const navigate = useNavigate();
  
  // Set initial tab if provided
  useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    } else if (teamMemberId) {
      // If viewing a team member's learning, set default tab to 'not-started'
      setActiveTab('not-started');
    }
  }, [initialActiveTab, teamMemberId]);
  
  // Filter courses based on the active tab
  // In a real application, you would have different lists of courses based on their status
  const assignedCourses = coursesList.slice(0, 4).map(course => ({
    ...course,
    trainingCategory: trainingCategories[Math.floor(Math.random() * trainingCategories.length)]
  }));
  
  const notStartedCourses = coursesList.slice(0, 4).map(course => ({
    ...course,
    trainingCategory: trainingCategories[Math.floor(Math.random() * trainingCategories.length)]
  }));
  
  const inProgressCourses = coursesList.slice(4, 8);
  const completedCourses = coursesList.slice(8, 12);
  const savedCourses = coursesList.slice(12, 16);
  const sharedCourses = coursesList.slice(16, 20);
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };
  
  // Calculate overall proficiency
  const calculateOverallProficiency = () => {
    const totalTarget = skillsData.reduce((sum, skill) => sum + skill.targetProficiency, 0);
    const totalCurrent = skillsData.reduce((sum, skill) => sum + skill.currentProficiency, 0);
    return Math.round((totalCurrent / totalTarget) * 100);
  };
  
  // Render different tab lists based on whether viewing own courses or team member's courses
  const renderTabList = () => {
    if (teamMemberId) {
      return (
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      );
    }
    
    return (
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="assigned">Assigned</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="saved">Saved</TabsTrigger>
        <TabsTrigger value="shared">Shared</TabsTrigger>
      </TabsList>
    );
  };
  
  return (
    <div>
      <Tabs defaultValue={teamMemberId ? "not-started" : "assigned"} value={activeTab} onValueChange={setActiveTab} className="w-full">
        {renderTabList()}
        
        {teamMemberId && (
          <TabsContent value="not-started">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {notStartedCourses.map((course) => (
                <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                  <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
                </div>
              ))}
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="assigned">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {assignedCourses.map((course) => (
                <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {inProgressCourses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {completedCourses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedCourses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shared">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sharedCourses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Skills Proficiency section for team member view */}
      {teamMemberId && (
        <div className="mt-8 p-6 bg-muted/20 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Skills Proficiency
            </h3>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {calculateOverallProficiency()}% Overall
            </span>
          </div>
          
          <div className="space-y-4">
            {skillsData.map(skill => (
              <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {skill.currentProficiency}% / {skill.targetProficiency}%
                  </span>
                </div>
                <Progress value={(skill.currentProficiency / skill.targetProficiency) * 100} className="h-2" />
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/40">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Skills From Courses
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsData.map(skill => (
                <span key={skill.id} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesTab;
