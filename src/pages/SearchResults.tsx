import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Filter,
  Grid,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Clock,
  BookOpen,
  Star,
  Users,
  Award,
  BadgeCheck,
  Trophy,
  Calendar,
  ArrowUpDown,
} from 'lucide-react';
import { Course } from '@/types/course';
import CourseCard from '@/components/CourseCard';
import { Badge } from '@/components/ui/badge';

// Import coursesList
import { coursesList } from '@/data/mockData';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  // Filter states
  const [filters, setFilters] = useState({
    courseType: 'all',
    academy: 'all',
    skillLevel: 'all',
    duration: 'all',
    rating: 'all',
    language: 'all',
    source: 'all',
  });
  
  // Get courses for search results
  useEffect(() => {
    setSearchQuery(query);
    
    // Simulating search results based on the query
    const results = coursesList.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredCourses(results);
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Here you would apply the filters to the search results
    // For now, we'll just keep the existing results
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    // Here you would sort the search results
    // For now, we'll just keep the existing results
  };
  
  const clearFilters = () => {
    setFilters({
      courseType: 'all',
      academy: 'all',
      skillLevel: 'all',
      duration: 'all',
      rating: 'all',
      language: 'all',
      source: 'all',
    });
  };
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };
  
  return (
    <>
      <Helmet>
        <title>Search Results | Learning Management System</title>
      </Helmet>
      <div className="container py-8 space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Search Results for "{query}"</h1>
          <form onSubmit={handleSearch} className="flex w-full max-w-lg space-x-2">
            <Input
              type="text"
              placeholder="Search courses, skills, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
          <div className="text-sm text-muted-foreground">
            Found {filteredCourses.length} results
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Panel */}
          <div className={`md:w-64 space-y-6 ${isFiltersVisible ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Course Type</h3>
                <Select
                  value={filters.courseType}
                  onValueChange={(value) => handleFilterChange('courseType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Online Course">Online Course</SelectItem>
                    <SelectItem value="Online Program">Online Program</SelectItem>
                    <SelectItem value="Blended">Blended</SelectItem>
                    <SelectItem value="Classroom">Classroom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Academy</h3>
                <Select
                  value={filters.academy}
                  onValueChange={(value) => handleFilterChange('academy', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Academies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Academies</SelectItem>
                    <SelectItem value="Leadership Academy">Leadership Academy</SelectItem>
                    <SelectItem value="Data Academy">Data Academy</SelectItem>
                    <SelectItem value="Marketing Academy">Marketing Academy</SelectItem>
                    <SelectItem value="PM Academy">PM Academy</SelectItem>
                    <SelectItem value="Innovation Academy">Innovation Academy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Skill Level</h3>
                <Select
                  value={filters.skillLevel}
                  onValueChange={(value) => handleFilterChange('skillLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Duration</h3>
                <Select
                  value={filters.duration}
                  onValueChange={(value) => handleFilterChange('duration', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Duration</SelectItem>
                    <SelectItem value="short">Under 1 hour</SelectItem>
                    <SelectItem value="medium">1-3 hours</SelectItem>
                    <SelectItem value="long">3+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Rating</h3>
                <Select
                  value={filters.rating}
                  onValueChange={(value) => handleFilterChange('rating', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5 & above</SelectItem>
                    <SelectItem value="4.0">4.0 & above</SelectItem>
                    <SelectItem value="3.5">3.5 & above</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Language</h3>
                <Select
                  value={filters.language}
                  onValueChange={(value) => handleFilterChange('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Source</h3>
                <Select
                  value={filters.source}
                  onValueChange={(value) => handleFilterChange('source', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="CourseEra">CourseEra</SelectItem>
                    <SelectItem value="els">els</SelectItem>
                    <SelectItem value="WorkEra">WorkEra</SelectItem>
                    <SelectItem value="Skillsoft">Skillsoft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex md:hidden">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {isFiltersVisible ? (
                    <X className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by: Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration-asc">Duration (Shortest)</SelectItem>
                    <SelectItem value="duration-desc">Duration (Longest)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${viewMode === 'grid' ? 'bg-secondary/50' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${viewMode === 'list' ? 'bg-secondary/50' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredCourses.map((course) => (
                  <div key={course.id} onClick={() => handleCourseClick(course.id)}>
                    <CourseCard 
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      imageUrl={course.imageUrl}
                      category={course.category}
                      duration={course.duration}
                      rating={course.rating}
                      trainingCategory={course.trainingCategory}
                      isBookmarked={course.isBookmarked}
                      isHot={course.isHot}
                      isNew={course.isNew}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
