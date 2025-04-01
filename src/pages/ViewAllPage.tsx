import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronLeft,
  Search,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { coursesList } from '@/data/mockData';
import { CarouselFilters } from '@/components/ui/carousel';

// Mock skills for filters
const mockSkills = [
  "All Skills", "Leadership", "Management", "Communication", "Project Management", 
  "Data Analysis", "Marketing", "Programming", "Design", "Finance",
  "Problem Solving", "Critical Thinking", "Teamwork", "Innovation", "Strategy"
];

const trainingCategories = [
  "All Categories", "Self-assigned", "Manager-assigned", "Ready for Role", 
  "Leadership", "Mandatory", "Special Drive"
];

const ViewAllPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["All Skills"]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredCourses, setFilteredCourses] = useState(coursesList);
  const [displayedCourseCount, setDisplayedCourseCount] = useState(12);
  
  // Format category for display
  const formattedCategory = category ? category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : '';
  
  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (skill === "All Skills") {
      setSelectedSkills(["All Skills"]);
      return;
    }

    let newSelectedSkills = [...selectedSkills];
    
    if (newSelectedSkills.includes("All Skills")) {
      newSelectedSkills = newSelectedSkills.filter(s => s !== "All Skills");
    }

    if (newSelectedSkills.includes(skill)) {
      newSelectedSkills = newSelectedSkills.filter(s => s !== skill);
      if (newSelectedSkills.length === 0) {
        newSelectedSkills = ["All Skills"];
      }
    } else {
      newSelectedSkills.push(skill);
    }

    setSelectedSkills(newSelectedSkills);
  };
  
  // Filter courses based on search and selected skills
  useEffect(() => {
    let tempFilteredCourses = [...coursesList];
    
    // Filter by search query
    if (searchQuery) {
      tempFilteredCourses = tempFilteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by selected skills (if "All Skills" is not selected)
    if (!selectedSkills.includes("All Skills")) {
      tempFilteredCourses = tempFilteredCourses.filter(course => 
        selectedSkills.includes(course.category)
      );
    }

    // Filter by training category (if not "All Categories")
    if (selectedCategory !== "All Categories") {
      tempFilteredCourses = tempFilteredCourses.filter(course => 
        course.trainingCategory === selectedCategory
      );
    }
    
    // Additional category-specific filtering could be added here
    if (category === 'top-picks') {
      // For example, sort by rating for top picks
      tempFilteredCourses.sort((a, b) => b.rating - a.rating);
    } else if (category === 'role-based-skills') {
      // Could filter by role-specific skills
    } else if (category === 'assigned-courses') {
      // Add training category for assigned courses if not already present
      tempFilteredCourses = tempFilteredCourses.map(course => ({
        ...course,
        trainingCategory: course.trainingCategory || trainingCategories[Math.floor(Math.random() * (trainingCategories.length - 1)) + 1]
      }));
    }
    
    setFilteredCourses(tempFilteredCourses);
  }, [searchQuery, selectedSkills, selectedCategory, category]);
  
  // Handle course click
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };
  
  // Load more courses
  const loadMoreCourses = () => {
    setDisplayedCourseCount(prevCount => Math.min(prevCount + 12, filteredCourses.length));
  };

  // Handle training category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  
  return (
    <>
      <Helmet>
        <title>{formattedCategory || 'All Courses'} | Jio Learning</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{formattedCategory || 'All Courses'}</h1>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
        
        {/* Skill filters with carousel navigation */}
        <CarouselFilters 
          className="mb-4"
          filters={mockSkills}
          selectedFilter={selectedSkills[0]} // Using first selected skill for simplicity
          onFilterSelect={toggleSkill}
        />
        
        {/* Training category filters - show for assigned courses */}
        {category === 'assigned-courses' && (
          <CarouselFilters 
            className="mb-4"
            filters={trainingCategories}
            selectedFilter={selectedCategory}
            onFilterSelect={handleCategorySelect}
          />
        )}
        
        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredCourses
            .slice(0, displayedCourseCount)
            .map((course) => (
              <div 
                key={course.id} 
                onClick={() => handleCourseClick(course.id)}
                className="cursor-pointer h-[350px]"
              >
                <CourseCard 
                  {...course} 
                  trainingCategory={course.trainingCategory || 
                    (category === 'assigned-courses' ? 
                      trainingCategories[Math.floor(Math.random() * (trainingCategories.length - 1)) + 1] : 
                      undefined
                    )
                  }
                  previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
                />
              </div>
            ))}
        </div>
        
        {/* Load more button */}
        {displayedCourseCount < filteredCourses.length && (
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={loadMoreCourses}
              className="min-w-[200px]"
            >
              Load More
            </Button>
          </div>
        )}
        
        {/* No results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAllPage;
