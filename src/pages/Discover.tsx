
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import CourseCard from '@/components/CourseCard';
import { Search, SlidersHorizontal, BookOpen, Timer, Briefcase, GraduationCap, Code, LineChart } from 'lucide-react';

// Mock data - we'll use the same courses from the Home page
import { coursesList } from '@/data/mockData';

const filterOptions = {
  type: ['All Types', 'Course', 'Program', 'Blended', 'Classroom'],
  source: ['All Sources', 'Internal', 'LinkedIn Learning', 'Coursera', 'Udemy'],
  category: ['All Categories', 'Leadership', 'Technical', 'Business', 'Soft Skills'],
  duration: ['All Durations', 'Under 1 hour', '1-3 hours', '3-6 hours', '6+ hours'],
};

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All Types',
    source: 'All Sources',
    category: 'All Categories',
    duration: 'All Durations',
  });

  // For the prototype, we're not actually filtering the data
  // But in a real application, you would filter based on the selected filters
  const courses = coursesList.slice(0, 20);

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
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                {selectedFilters.type}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={selectedFilters.type} onValueChange={(value) => setSelectedFilters({...selectedFilters, type: value})}>
                {filterOptions.type.map((type) => (
                  <DropdownMenuRadioItem key={type} value={type}>{type}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="mr-2 h-4 w-4" />
                {selectedFilters.source}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={selectedFilters.source} onValueChange={(value) => setSelectedFilters({...selectedFilters, source: value})}>
                {filterOptions.source.map((source) => (
                  <DropdownMenuRadioItem key={source} value={source}>{source}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="mr-2 h-4 w-4" />
                {selectedFilters.category}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={selectedFilters.category} onValueChange={(value) => setSelectedFilters({...selectedFilters, category: value})}>
                {filterOptions.category.map((category) => (
                  <DropdownMenuRadioItem key={category} value={category}>{category}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Timer className="mr-2 h-4 w-4" />
                {selectedFilters.duration}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={selectedFilters.duration} onValueChange={(value) => setSelectedFilters({...selectedFilters, duration: value})}>
                {filterOptions.duration.map((duration) => (
                  <DropdownMenuRadioItem key={duration} value={duration}>{duration}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
          <Button variant="outline" size="sm" className="rounded-full">
            Project Management
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
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
