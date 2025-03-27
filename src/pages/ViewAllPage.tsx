
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { coursesList } from '@/data/mockData';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, SortAsc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ViewAllPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterView, setFilterView] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    level: 'all',
    duration: 'all',
    trainingCategory: 'all',
  });

  // Map category names to human-readable titles
  const categoryTitles = {
    recommended: 'Recommended Courses',
    trending: 'Trending Courses',
    popular: 'Popular Courses',
    recent: 'Recently Added Courses',
    interest: 'Based on Your Interest',
    role: 'For Your Role',
    domains: 'Learning Domains',
  };

  // Prepare courses with the necessary properties for CourseCard
  const preparedCourses = React.useMemo(() => {
    return coursesList.map(course => ({
      ...course,
      // Add required fields for CourseCard
      category: course.level || 'General',
      rating: 4 + Math.random(),
      instructor: course.author,
      thumbnail: course.imageUrl,
      type: 'Course',
      source: 'Internal',
      trainingCategory: ['Ready for Role', 'Mandatory', 'Leadership', 'Technical'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  // Filter and sort courses based on selected criteria
  useEffect(() => {
    // Clone the prepared courses to avoid mutating the original
    let courses = [...preparedCourses];

    // Apply filters
    if (filters.level !== 'all') {
      courses = courses.filter(course => course.level === filters.level);
    }

    if (filters.duration !== 'all') {
      // Example duration filter implementation
      switch(filters.duration) {
        case 'short':
          courses = courses.filter(course => {
            const minutes = parseInt(course.duration.replace(/\D/g, '')) || 0;
            return minutes < 60;
          });
          break;
        case 'medium':
          courses = courses.filter(course => {
            const minutes = parseInt(course.duration.replace(/\D/g, '')) || 0;
            return minutes >= 60 && minutes < 180;
          });
          break;
        case 'long':
          courses = courses.filter(course => {
            const minutes = parseInt(course.duration.replace(/\D/g, '')) || 0;
            return minutes >= 180;
          });
          break;
      }
    }

    if (filters.trainingCategory !== 'all') {
      courses = courses.filter(course => course.trainingCategory === filters.trainingCategory);
    }

    // Apply search query filter
    if (searchQuery) {
      courses = courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sort
    switch(sortBy) {
      case 'popularity':
        courses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recent':
        // This would normally sort by date, but we don't have real dates
        courses.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'a-z':
        courses.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        courses.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredCourses(courses);
  }, [preparedCourses, filters, searchQuery, sortBy]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>{categoryTitles[category] || 'View All Courses'} | Learning Management System</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{categoryTitles[category] || 'All Courses'}</h1>
          <p className="text-muted-foreground mt-1">
            Explore all courses in this category
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-2">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search in this category..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setFilterView(!filterView)}
            className={filterView ? "bg-primary/10" : ""}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Select defaultValue={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <SortAsc className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="a-z">Name (A-Z)</SelectItem>
              <SelectItem value="z-a">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters */}
      {filterView && (
        <div className="bg-secondary/20 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Level</label>
              <Select defaultValue={filters.level} onValueChange={(value) => handleFilterChange('level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Duration</label>
              <Select defaultValue={filters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Under 1 hour</SelectItem>
                  <SelectItem value="medium">1-3 hours</SelectItem>
                  <SelectItem value="long">Over 3 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Training Category</label>
              <Select defaultValue={filters.trainingCategory} onValueChange={(value) => handleFilterChange('trainingCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Ready for Role">Ready for Role</SelectItem>
                  <SelectItem value="Mandatory">Mandatory</SelectItem>
                  <SelectItem value="Leadership">Leadership</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
              <CourseCard 
                id={course.id}
                title={course.title}
                description={course.description}
                thumbnail={course.imageUrl}
                duration={course.duration}
                instructor={course.author}
                level={course.level}
                category={course.category}
                progress={course.progress || 0}
                rating={course.rating || 4.5}
                isAssigned={false}
                isCompleted={course.progress === 100}
                source="Internal"
                type="Course"
                trainingCategory={course.trainingCategory}
              />
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-8">
            <p className="text-muted-foreground">No courses match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllPage;
