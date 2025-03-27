
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import CourseCard from '@/components/CourseCard';
import { 
  Search, 
  SlidersHorizontal, 
  SortAsc, 
  SortDesc,
  Code,
  LineChart, 
  CalendarDays
} from 'lucide-react';

// Import coursesList from mockData
import { coursesList } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Filter options - simplified
const filterOptions = {
  type: ['All Types', 'Online Course', 'Online Program', 'Blended', 'Classroom'],
  category: ['All Categories', 'Leadership', 'Technical', 'Business', 'Soft Skills'],
  duration: ['All Durations', 'Under 1 hour', '1-3 hours', '3-6 hours', '6+ hours'],
  proficiency: ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert'],
};

// Sorting options - simplified
const sortOptions = [
  { id: 'nameAsc', label: 'Name (A-Z)', icon: <SortAsc className="h-4 w-4 mr-2" /> },
  { id: 'nameDesc', label: 'Name (Z-A)', icon: <SortDesc className="h-4 w-4 mr-2" /> },
  { id: 'dateAddedDesc', label: 'Date Added (Newest First)', icon: <CalendarDays className="h-4 w-4 mr-2" /> },
];

const Discover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All Types',
    category: 'All Categories',
    duration: 'All Durations',
    proficiency: 'All Levels',
  });
  const [currentSort, setCurrentSort] = useState(sortOptions[0].id);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Process courses with additional fields needed for UI
  const courses = React.useMemo(() => {
    return coursesList.slice(0, 20).map(course => ({
      ...course,
      // Add required fields for CourseCard
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
      category: course.level || 'General',
      rating: 4 + Math.random(),
      instructor: course.author,
      thumbnail: course.imageUrl,
      type: 'Course',
      source: 'Internal',
      trainingCategory: ['Ready for Role', 'Mandatory', 'Leadership', 'Technical'][Math.floor(Math.random() * 4)]
    }));
  }, []);
  
  // Apply filtering and sorting to courses
  useEffect(() => {
    let result = [...courses];
    
    // Basic filter by search query
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort logic - simplified
    switch(currentSort) {
      case 'nameAsc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateAddedDesc':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      default:
        // Default: no sorting
        break;
    }
    
    setFilteredCourses(result);
  }, [courses, selectedFilters, currentSort, searchQuery]);
  
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Get current sort option label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(option => option.id === currentSort);
    return option ? option.label : 'Sort By';
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    toast({
      title: "Filter Applied",
      description: `${filterType}: ${value}`,
      duration: 2000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Discover Courses | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Courses</h1>
            <p className="text-muted-foreground mt-1">Explore our catalog of courses and expand your skills</p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-primary/10" : ""}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            
            {/* Sort dropdown - simplified */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px] md:min-w-[180px] justify-start">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <span className="truncate">{getCurrentSortLabel()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort Courses</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={currentSort} onValueChange={setCurrentSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id} className="flex items-center">
                      {option.icon}
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filter Section - simplified */}
        {showFilters && (
          <div className="mb-8 bg-secondary/20 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Filter Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {selectedFilters.type}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Course Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                    {filterOptions.type.map((type) => (
                      <DropdownMenuRadioItem key={type} value={type}>{type}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {selectedFilters.category}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                    {filterOptions.category.map((category) => (
                      <DropdownMenuRadioItem key={category} value={category}>{category}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Duration Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {selectedFilters.duration}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Duration</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
                    {filterOptions.duration.map((duration) => (
                      <DropdownMenuRadioItem key={duration} value={duration}>{duration}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Proficiency Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {selectedFilters.proficiency}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Proficiency Level</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.proficiency} onValueChange={(value) => handleFilterChange('proficiency', value)}>
                    {filterOptions.proficiency.map((level) => (
                      <DropdownMenuRadioItem key={level} value={level}>{level}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="text-sm" 
                onClick={() => setSelectedFilters({
                  type: 'All Types',
                  category: 'All Categories',
                  duration: 'All Durations',
                  proficiency: 'All Levels',
                })}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="secondary" size="sm" className="rounded-full">
            <Code className="mr-1 h-4 w-4" /> Programming
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full">
            <LineChart className="mr-1 h-4 w-4" /> Data Science
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Leadership
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Communication
          </Button>
        </div>

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
                  category={course.category || 'General'}
                  progress={course.progress || 0}
                  rating={course.rating || 4.5}
                  isAssigned={false}
                  isCompleted={course.progress === 100}
                  source="Internal"
                  type="Course"
                />
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-muted-foreground">No courses match your current filters. Try adjusting your criteria.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg">
            Load More Courses
          </Button>
        </div>
      </div>
    </>
  );
};

export default Discover;
