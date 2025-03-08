
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import { coursesList } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Award, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

// Mock skills data that would be gained from courses
const skillsData = [
  { id: 1, name: 'Leadership', currentProficiency: 45, targetProficiency: 75, related: ['leadership', 'management'] },
  { id: 2, name: 'Data Analysis', currentProficiency: 60, targetProficiency: 80, related: ['analysis', 'data science'] },
  { id: 3, name: 'UX/UI Design', currentProficiency: 30, targetProficiency: 70, related: ['design', 'user experience'] },
  { id: 4, name: 'Project Management', currentProficiency: 55, targetProficiency: 85, related: ['management', 'planning'] },
  { id: 5, name: 'Communication', currentProficiency: 70, targetProficiency: 90, related: ['presentation', 'writing'] }
];

interface LearningGoalsTabProps {
  teamMemberId?: string | null;
}

const LearningGoalsTab: React.FC<LearningGoalsTabProps> = ({ teamMemberId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('selfAssigned');
  const [selfAssignedCourses, setSelfAssignedCourses] = useState(
    coursesList.slice(0, 3).map(course => ({
      ...course,
      trainingCategory: 'Self-Assigned'
    }))
  );
  
  const [managerAssignedCourses, setManagerAssignedCourses] = useState(
    coursesList.slice(3, 6).map(course => ({
      ...course,
      trainingCategory: 'Manager-Assigned'
    }))
  );
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleUnassignCourse = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTab === 'selfAssigned' && !teamMemberId) {
      setSelfAssignedCourses(prev => prev.filter(course => course.id !== courseId));
      toast({
        title: "Course Unassigned",
        description: "The course has been removed from your learning goals",
      });
    }
  };
  
  // Calculate overall proficiency
  const calculateOverallProficiency = () => {
    const totalTarget = skillsData.reduce((sum, skill) => sum + skill.targetProficiency, 0);
    const totalCurrent = skillsData.reduce((sum, skill) => sum + skill.currentProficiency, 0);
    return Math.round((totalCurrent / totalTarget) * 100);
  };
  
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Tabs defaultValue="selfAssigned" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="selfAssigned">
            {teamMemberId ? "Courses Assigned by Team Member" : "Courses Assigned by You"}
          </TabsTrigger>
          <TabsTrigger value="managerAssigned">Courses Assigned by Manager</TabsTrigger>
        </TabsList>
        
        <TabsContent value="selfAssigned">
          <CardContent className="p-0">
            {selfAssignedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {selfAssignedCourses.map((course) => (
                  <div key={course.id} className="cursor-pointer relative group">
                    <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
                    {!teamMemberId && (
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => handleUnassignCourse(course.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {teamMemberId ? "This team member hasn't assigned any courses to their learning goals yet." : "You haven't assigned any courses to your learning goals yet."}
                </p>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="managerAssigned">
          <CardContent className="p-0">
            {managerAssignedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {managerAssignedCourses.map((course) => (
                  <div key={course.id} className="cursor-pointer">
                    <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {teamMemberId ? "You haven't assigned any courses to this team member's learning goals yet." : "Your manager hasn't assigned any courses to your learning goals yet."}
                </p>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
      
      {/* Skills Proficiency Overview */}
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
            Skills From {teamMemberId ? "Team Member's" : "Your"} Courses
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
    </div>
  );
};

export default LearningGoalsTab;
