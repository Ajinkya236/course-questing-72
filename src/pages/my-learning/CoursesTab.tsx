
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import { coursesList } from '@/data/mockData';

const CoursesTab = () => {
  const [activeTab, setActiveTab] = useState('assigned');
  
  // Filter courses based on the active tab
  // In a real application, you would have different lists of courses based on their status
  const assignedCourses = coursesList.slice(0, 4);
  const inProgressCourses = coursesList.slice(4, 8);
  const completedCourses = coursesList.slice(8, 12);
  const savedCourses = coursesList.slice(12, 16);
  const sharedCourses = coursesList.slice(16, 20);
  
  return (
    <div>
      <Tabs defaultValue="assigned" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assigned">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {assignedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {inProgressCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {completedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shared">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sharedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesTab;
