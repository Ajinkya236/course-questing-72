
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Clock, Star, Tag } from 'lucide-react';
import { mockCourses } from '@/data/mockCoursesData';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types/course';

interface CoursesTabProps {
  teamMemberId?: string;
}

// Add missing properties to the mock courses for filtering and sorting
const enhancedCourses = mockCourses.map(course => ({
  ...course,
  // Add default values for missing properties
  lastAccessed: new Date().toISOString(),
  progress: course.status === 'completed' ? 100 : course.status === 'in-progress' ? Math.floor(Math.random() * 90) + 10 : 0,
  videoUrl: 'https://example.com/sample-video.mp4' // Default value without checking for existing videoUrl
}));

const CoursesTab: React.FC<CoursesTabProps> = ({ teamMemberId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter and sort the courses
  const filteredCourses = enhancedCourses
    // Filter by search query
    .filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Filter by status if not "all"
    .filter(course => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'in-progress') return course.status === 'in-progress';
      if (filterStatus === 'completed') return course.status === 'completed';
      if (filterStatus === 'assigned') return course.status === 'assigned';
      // Remove the 'saved' status since it's not in the Course type
      return true;
    })
    // Sort courses
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return (new Date(b.lastAccessed).getTime()) - (new Date(a.lastAccessed).getTime());
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === 'progress') {
        return (b.progress) - (a.progress);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Accessed</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  {/* Removed the 'saved' status since it's not in the Course type */}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl || `/placeholder.svg`}
            category={course.category || 'General'}
            duration={course.duration || '1h 30m'}
            rating={course.rating || 4.5}
            isBookmarked={course.isBookmarked}
            trainingCategory={course.trainingCategory}
            isHot={course.isHot}
            isNew={course.isNew}
            previewUrl={course.videoUrl}
          />
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default CoursesTab;
