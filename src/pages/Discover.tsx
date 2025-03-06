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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseCard from '@/components/CourseCard';
import { Search, SlidersHorizontal, BookOpen, Timer, Briefcase, GraduationCap, Code, LineChart, SortAsc, SortDesc, Building, Globe, Database, Lightbulb, Gauge } from 'lucide-react';

// Mock data - we'll use the same courses from the Home page
import { coursesList } from '@/data/mockData';

const filterOptions = {
  type: ['All Types', 'Online Course', 'Online Program', 'Blended', 'Classroom'],
  source: ['All Sources', 'Internal', 'LinkedIn Learning', 'Coursera', 'edX', 'WorkEra', 'Skillsoft'],
  category: ['All Categories', 'Leadership', 'Technical', 'Business', 'Soft Skills'],
  duration: ['All Durations', 'Under 1 hour', '1-3 hours', '3-6 hours', '6+ hours'],
  language: ['All Languages', 'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'],
  academy: ['All Academies', 'Technology Academy', 'Leadership Academy', 'Business Academy', 'Creative Academy'],
  subAcademy: ['All Sub-Academies', 'Software Development', 'Data Science', 'UX Design', 'Project Management', 'Marketing'],
  topic: ['All Topics', 'Coding', 'Design', 'Finance', 'Marketing', 'Product Management', 'AI & Machine Learning'],
  skill: ['All Skills', 'Programming', 'Communication', 'Critical Thinking', 'Problem Solving', 'Creativity', 'Teamwork'],
  proficiency: ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert'],
};

// Sorting options
const sortOptions = [
  { id: 'dateAsc', label: 'Date (Newest First)', icon: <SortAsc className="h-4 w-4 mr-2" /> },
  { id: 'dateDesc', label: 'Date (Oldest First)', icon: <SortDesc className="h-4 w-4 mr-2" /> },
  { id: 'nameAsc', label: 'Name (A-Z)', icon: <SortAsc className="h-4 w-4 mr-2" /> },
  { id: 'nameDesc', label: 'Name (Z-A)', icon: <SortDesc className="h-4 w-4 mr-2" /> },
  { id: 'durationAsc', label: 'Duration (Shortest First)', icon: <SortAsc className="h-4 w-4 mr-2" /> },
  { id: 'durationDesc', label: 'Duration (Longest First)', icon: <SortDesc className="h-4 w-4 mr-2" /> },
];

const Discover = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All Types',
    source: 'All Sources',
    category: 'All Categories',
    duration: 'All Durations',
    language: 'All Languages',
    academy: 'All Academies',
    subAcademy: 'All Sub-Academies',
    topic: 'All Topics',
    skill: 'All Skills',
    proficiency: 'All Levels',
  });
  const [currentSort, setCurrentSort] = useState(sortOptions[0].id);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // For the prototype, we're not actually filtering the data
  // But in a real application, you would filter based on the selected filters
  const courses = coursesList.slice(0, 20);
  
  // Apply filtering and sorting to courses
  useEffect(() => {
    let result = [...courses];
    
    // Filter logic would go here in a real application
    // For now, we're just simulating filtering with a timeout
    
    // Sort logic
    switch(currentSort) {
      case 'dateAsc':
        result.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        break;
      case 'dateDesc':
        result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case 'nameAsc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'durationAsc':
        // This is mock logic assuming duration is something like "2h 30m"
        result.sort((a, b) => {
          const extractMinutes = (duration) => {
            const hours = duration.match(/(\d+)h/) ? parseInt(duration.match(/(\d+)h/)[1]) : 0;
            const minutes = duration.match(/(\d+)m/) ? parseInt(duration.match(/(\d+)m/)[1]) : 0;
            return hours * 60 + minutes;
          };
          return extractMinutes(a.duration) - extractMinutes(b.duration);
        });
        break;
      case 'durationDesc':
        // Same logic as above, but reversed
        result.sort((a, b) => {
          const extractMinutes = (duration) => {
            const hours = duration.match(/(\d+)h/) ? parseInt(duration.match(/(\d+)h/)[1]) : 0;
            const minutes = duration.match(/(\d+)m/) ? parseInt(duration.match(/(\d+)m/)[1]) : 0;
            return hours * 60 + minutes;
          };
          return extractMinutes(b.duration) - extractMinutes(a.duration);
        });
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

  return (
    <>
      <Helmet>
        <title>Discover Courses | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
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
            
            {/* Sort dropdown */}
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

        {/* Filter Section - now with more filter options */}
        {showFilters && (
          <div className="mb-8 bg-secondary/20 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Filter Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Type Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {selectedFilters.type}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Course Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.type} onValueChange={(value) => setSelectedFilters({...selectedFilters, type: value})}>
                    {filterOptions.type.map((type) => (
                      <DropdownMenuRadioItem key={type} value={type}>{type}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Academy Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    {selectedFilters.academy}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Academy</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.academy} onValueChange={(value) => setSelectedFilters({...selectedFilters, academy: value})}>
                    {filterOptions.academy.map((academy) => (
                      <DropdownMenuRadioItem key={academy} value={academy}>{academy}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sub-Academy Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    {selectedFilters.subAcademy}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sub-Academy</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.subAcademy} onValueChange={(value) => setSelectedFilters({...selectedFilters, subAcademy: value})}>
                    {filterOptions.subAcademy.map((subAcademy) => (
                      <DropdownMenuRadioItem key={subAcademy} value={subAcademy}>{subAcademy}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    {selectedFilters.language}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.language} onValueChange={(value) => setSelectedFilters({...selectedFilters, language: value})}>
                    {filterOptions.language.map((language) => (
                      <DropdownMenuRadioItem key={language} value={language}>{language}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Source Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="mr-2 h-4 w-4" />
                    {selectedFilters.source}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Source</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.source} onValueChange={(value) => setSelectedFilters({...selectedFilters, source: value})}>
                    {filterOptions.source.map((source) => (
                      <DropdownMenuRadioItem key={source} value={source}>{source}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Topic Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {selectedFilters.topic}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Topic</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.topic} onValueChange={(value) => setSelectedFilters({...selectedFilters, topic: value})}>
                    {filterOptions.topic.map((topic) => (
                      <DropdownMenuRadioItem key={topic} value={topic}>{topic}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Skill Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    {selectedFilters.skill}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Skill</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.skill} onValueChange={(value) => setSelectedFilters({...selectedFilters, skill: value})}>
                    {filterOptions.skill.map((skill) => (
                      <DropdownMenuRadioItem key={skill} value={skill}>{skill}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {selectedFilters.category}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.category} onValueChange={(value) => setSelectedFilters({...selectedFilters, category: value})}>
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
                    <Timer className="mr-2 h-4 w-4" />
                    {selectedFilters.duration}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Duration</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.duration} onValueChange={(value) => setSelectedFilters({...selectedFilters, duration: value})}>
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
                    <Gauge className="mr-2 h-4 w-4" />
                    {selectedFilters.proficiency}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Proficiency Level</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedFilters.proficiency} onValueChange={(value) => setSelectedFilters({...selectedFilters, proficiency: value})}>
                    {filterOptions.proficiency.map((level) => (
                      <DropdownMenuRadioItem key={level} value={level}>{level}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Reset Filters Button */}
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="text-sm" 
                onClick={() => setSelectedFilters({
                  type: 'All Types',
                  source: 'All Sources',
                  category: 'All Categories',
                  duration: 'All Durations',
                  language: 'All Languages',
                  academy: 'All Academies',
                  subAcademy: 'All Sub-Academies',
                  topic: 'All Topics',
                  skill: 'All Skills',
                  proficiency: 'All Levels',
                })}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}

        {/* Category Chips - keeping this section */}
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
          <Button variant="outline" size="sm" className="rounded-full">
            Project Management
          </Button>
        </div>

        {/* Courses Grid - now using filtered courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseCard 
                  {...course} 
                  trainingCategory={course.trainingCategory || ['Ready for Role', 'Mandatory', 'Leadership', 'Technical'][Math.floor(Math.random() * 4)]} 
                  previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
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
