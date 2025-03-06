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
  BookOpen, 
  Timer, 
  Briefcase, 
  Building, 
  Globe, 
  Database, 
  Lightbulb, 
  Gauge,
  CalendarDays,
  SortAsc,
  SortDesc
} from 'lucide-react';
import FilterDropdown from '@/components/discover/FilterDropdown';
import { coursesList } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

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

const sortOptions = [
  { id: 'nameAsc', label: 'Name (A-Z)', icon: <SortAsc className="h-4 w-4 mr-2" /> },
  { id: 'nameDesc', label: 'Name (Z-A)', icon: <SortDesc className="h-4 w-4 mr-2" /> },
  { id: 'durationAsc', label: 'Duration (Shortest First)', icon: <SortAsc className="h-4 w-4 mr-2" /> },
  { id: 'durationDesc', label: 'Duration (Longest First)', icon: <SortDesc className="h-4 w-4 mr-2" /> },
  { id: 'dateAddedDesc', label: 'Date Added (Newest First)', icon: <CalendarDays className="h-4 w-4 mr-2" /> },
  { id: 'dateAddedAsc', label: 'Date Added (Oldest First)', icon: <CalendarDays className="h-4 w-4 mr-2" /> },
];

const Discover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const courses = coursesList.slice(0, 20).map(course => ({
    ...course,
    dateAdded: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString()
  }));

  useEffect(() => {
    let result = [...courses];
    
    switch(currentSort) {
      case 'nameAsc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'durationAsc':
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
        result.sort((a, b) => {
          const extractMinutes = (duration) => {
            const hours = duration.match(/(\d+)h/) ? parseInt(duration.match(/(\d+)h/)[1]) : 0;
            const minutes = duration.match(/(\d+)m/) ? parseInt(duration.match(/(\d+)m/)[1]) : 0;
            return hours * 60 + minutes;
          };
          return extractMinutes(b.duration) - extractMinutes(a.duration);
        });
        break;
      case 'dateAddedDesc':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'dateAddedAsc':
        result.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        break;
      default:
        break;
    }
    
    setFilteredCourses(result);
  }, [courses, selectedFilters, currentSort, searchQuery]);
  
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

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

        {showFilters && (
          <div className="mb-8 bg-secondary/20 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Filter Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <FilterDropdown 
                icon={<BookOpen className="mr-2 h-4 w-4" />}
                label="Course Type"
                options={filterOptions.type}
                value={selectedFilters.type}
                onChange={(value) => handleFilterChange('type', value)}
              />

              <FilterDropdown 
                icon={<Building className="mr-2 h-4 w-4" />}
                label="Academy"
                options={filterOptions.academy}
                value={selectedFilters.academy}
                onChange={(value) => handleFilterChange('academy', value)}
              />

              <FilterDropdown 
                icon={<Building className="mr-2 h-4 w-4" />}
                label="Sub-Academy"
                options={filterOptions.subAcademy}
                value={selectedFilters.subAcademy}
                onChange={(value) => handleFilterChange('subAcademy', value)}
              />

              <FilterDropdown 
                icon={<Globe className="mr-2 h-4 w-4" />}
                label="Language"
                options={filterOptions.language}
                value={selectedFilters.language}
                onChange={(value) => handleFilterChange('language', value)}
              />

              <FilterDropdown 
                icon={<Database className="mr-2 h-4 w-4" />}
                label="Source"
                options={filterOptions.source}
                value={selectedFilters.source}
                onChange={(value) => handleFilterChange('source', value)}
              />

              <FilterDropdown 
                icon={<Lightbulb className="mr-2 h-4 w-4" />}
                label="Topic"
                options={filterOptions.topic}
                value={selectedFilters.topic}
                onChange={(value) => handleFilterChange('topic', value)}
              />

              <FilterDropdown 
                icon={<Briefcase className="mr-2 h-4 w-4" />}
                label="Skill"
                options={filterOptions.skill}
                value={selectedFilters.skill}
                onChange={(value) => handleFilterChange('skill', value)}
              />

              <FilterDropdown 
                icon={<Briefcase className="mr-2 h-4 w-4" />}
                label="Category"
                options={filterOptions.category}
                value={selectedFilters.category}
                onChange={(value) => handleFilterChange('category', value)}
              />

              <FilterDropdown 
                icon={<Timer className="mr-2 h-4 w-4" />}
                label="Duration"
                options={filterOptions.duration}
                value={selectedFilters.duration}
                onChange={(value) => handleFilterChange('duration', value)}
              />

              <FilterDropdown 
                icon={<Gauge className="mr-2 h-4 w-4" />}
                label="Proficiency Level"
                options={filterOptions.proficiency}
                value={selectedFilters.proficiency}
                onChange={(value) => handleFilterChange('proficiency', value)}
              />
            </div>
            
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
