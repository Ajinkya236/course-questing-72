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
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Filter,
  Grid,
  LayoutGrid,
  List,
  Search,
  ChevronDown,
  X,
  BookOpen,
} from 'lucide-react';
import { Course } from '@/types/course';
import CourseCard from '@/components/CourseCard';

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
    categories: [],
    trainingCategories: [],
    duration: 'all',
    rating: 'all',
    level: 'all',
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
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      trainingCategories: [],
      duration: 'all',
      rating: 'all',
      level: 'all',
      source: 'all',
    });
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
          <div className={`md:w-64 space-y-6 ${isFiltersVisible ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-2">
                  {['Technology', 'Leadership', 'Marketing', 'Data Science', 'Design', 'Business'].map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Training Categories</h3>
                <div className="space-y-2">
                  {['Leadership Academy', 'Data Academy', 'Marketing Academy', 'PM Academy', 'Innovation Academy'].map((academy) => (
                    <label key={academy} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{academy}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Separator />
              
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
                <h3 className="font-medium">Level</h3>
                <Select
                  value={filters.level}
                  onValueChange={(value) => handleFilterChange('level', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
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
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="linkedin">LinkedIn Learning</SelectItem>
                    <SelectItem value="coursera">Coursera</SelectItem>
                    <SelectItem value="udemy">Udemy</SelectItem>
                    <SelectItem value="skillsoft">Skillsoft</SelectItem>
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
                  <CourseCard 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    imageUrl={course.imageUrl}
                    category={course.category}
                    duration={course.duration}
                    rating={course.rating}
                    trainingCategory={course.trainingCategory}
                    isBookmarked={course.isBookmarked}
                    previewUrl={course.previewUrl}
                    videoUrl={course.videoUrl}
                    isHot={course.isHot}
                    isNew={course.isNew}
                  />
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
