
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import { coursesList } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const LearningGoalsTab: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('selfAssigned');
  
  // Filter courses from the mock data
  // In a real application, these would come from an API based on assignment source
  const selfAssignedCourses = coursesList.slice(0, 3).map(course => ({
    ...course,
    trainingCategory: 'Self-Assigned'
  }));
  
  const managerAssignedCourses = coursesList.slice(3, 6).map(course => ({
    ...course,
    trainingCategory: 'Manager-Assigned'
  }));
  
  // This function is now only used for whole card clicks, not for button clicks within cards
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };
  
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Tabs defaultValue="selfAssigned" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="selfAssigned">Courses Assigned by You</TabsTrigger>
          <TabsTrigger value="managerAssigned">Courses Assigned by Manager</TabsTrigger>
        </TabsList>
        
        <TabsContent value="selfAssigned">
          <CardContent className="p-0">
            {selfAssignedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {selfAssignedCourses.map((course) => (
                  <div key={course.id} className="cursor-pointer">
                    <CourseCard {...course} previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">You haven't assigned any courses to your learning goals yet.</p>
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
                <p className="text-muted-foreground">Your manager hasn't assigned any courses to your learning goals yet.</p>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningGoalsTab;
