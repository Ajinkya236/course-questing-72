
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CourseCard from '@/components/CourseCard';
import { useCourseBookmarks } from '@/hooks/useCourseBookmarks';
import { useCourseData } from '@/hooks/useCourseData';
import { useCourseDataAPI } from '@/hooks/useCourseDataAPI';

interface CoursesTabProps {
  teamMemberId?: string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ teamMemberId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const statusFromUrl = searchParams.get('status');
  const [activeFilter, setActiveFilter] = useState(statusFromUrl || 'in-progress');
  
  // Ensure we have the status parameter in the URL when component mounts
  useEffect(() => {
    if (statusFromUrl) {
      setActiveFilter(statusFromUrl);
    } else {
      setSearchParams({ tab: 'courses', status: 'in-progress' }, { replace: true });
    }
  }, [statusFromUrl, setSearchParams]);
  
  // Fetch courses from API based on active filter
  const { courses: apiCourses, isLoading } = useCourseDataAPI({
    status: activeFilter,
    limit: 100 // Get more courses to ensure we have a good selection
  });
  
  // Apply useCourseData to ensure high-quality images
  const { normalizedCourses } = useCourseData(apiCourses);
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setSearchParams({ tab: 'courses', status: filter }, { replace: true });
  };
  
  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'assigned':
        return 'Assigned Courses';
      case 'completed':
        return 'Completed Courses';
      case 'in-progress':
        return 'In-Progress Courses';
      case 'saved':
        return 'Saved Courses';
      default:
        return 'Courses';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === 'in-progress' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('in-progress')}
        >
          In Progress
        </Button>
        <Button
          variant={activeFilter === 'assigned' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('assigned')}
        >
          Assigned
        </Button>
        <Button
          variant={activeFilter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </Button>
        <Button
          variant={activeFilter === 'saved' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('saved')}
        >
          Saved
        </Button>
      </div>
      
      <div>
        <h2 className="text-xl font-archivo-black mb-4">{getFilterTitle()}</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-[350px] bg-secondary/20 animate-pulse" />
            ))}
          </div>
        ) : normalizedCourses.length > 0 ? (
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {normalizedCourses.map((course) => (
                <div 
                  key={course.id}
                  className="transition-transform duration-300 hover:scale-[1.03]"
                >
                  <CourseCard {...course} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              You don't have any {activeFilter.replace('-', ' ')} courses.
            </p>
            <Button 
              onClick={() => navigate('/discover')}
              variant="outline"
            >
              Discover Courses
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoursesTab;
