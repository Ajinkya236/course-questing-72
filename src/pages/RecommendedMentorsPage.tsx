import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Star, Clock, BookOpen, Award, ChevronLeft, User, Briefcase, Calendar } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

// Mock data for recommended mentors
const mockMentors = [
  {
    id: "m1",
    name: "Dr. Sarah Johnson",
    role: "Senior Data Scientist",
    department: "Data Science",
    location: "New York",
    avatar: "https://i.pravatar.cc/150?img=1",
    skills: ["Machine Learning", "Python", "Data Analysis", "AI"],
    experience: "12+ years",
    mentees: 18,
    rating: 4.9,
    availability: "High",
    bio: "Experienced data scientist with a Ph.D. in Computer Science, specializing in machine learning algorithms and their applications in business intelligence.",
    availableTime: "Mondays & Wednesdays",
    languages: ["English", "French"],
    areasOfExpertise: ["Career Development", "Technical Skills", "Leadership"]
  },
  {
    id: "m2",
    name: "Michael Chen",
    role: "Engineering Manager",
    department: "Software Engineering",
    location: "San Francisco",
    avatar: "https://i.pravatar.cc/150?img=2",
    skills: ["Software Architecture", "Leadership", "Java", "Cloud Computing"],
    experience: "15+ years",
    mentees: 24,
    rating: 4.8,
    availability: "Medium",
    bio: "Engineering leader with experience scaling teams and products. Passionate about mentoring the next generation of technical leaders.",
    availableTime: "Tuesday afternoons",
    languages: ["English", "Mandarin"],
    areasOfExpertise: ["Leadership", "Team Management", "Technical Skills"]
  },
  {
    id: "m3",
    name: "Elena Rodriguez",
    role: "UX/UI Design Lead",
    department: "Product Design",
    location: "Chicago",
    avatar: "https://i.pravatar.cc/150?img=3",
    skills: ["User Research", "UI Design", "Design Systems", "Prototyping"],
    experience: "8+ years",
    mentees: 12,
    rating: 4.7,
    availability: "Medium",
    bio: "Award-winning designer helping teams create intuitive and beautiful products. Specializes in design systems and accessibility.",
    availableTime: "Thursdays",
    languages: ["English", "Spanish"],
    areasOfExpertise: ["Design Thinking", "Career Guidance", "Creativity"]
  },
  {
    id: "m4",
    name: "James Wilson",
    role: "Product Director",
    department: "Product Management",
    location: "Austin",
    avatar: "https://i.pravatar.cc/150?img=4",
    skills: ["Product Strategy", "Market Research", "Agile", "Growth"],
    experience: "10+ years",
    mentees: 15,
    rating: 4.6,
    availability: "Low",
    bio: "Product leader with experience at startups and enterprise companies. Passionate about building products that solve real customer problems.",
    availableTime: "Friday mornings",
    languages: ["English"],
    areasOfExpertise: ["Product Management", "Leadership", "Career Transitions"]
  },
  {
    id: "m5",
    name: "Aisha Khan",
    role: "VP of Marketing",
    department: "Marketing",
    location: "London",
    avatar: "https://i.pravatar.cc/150?img=5",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Content"],
    experience: "18+ years",
    mentees: 30,
    rating: 4.9,
    availability: "Medium",
    bio: "Marketing executive with global experience building and scaling brands. Specializes in digital transformation and growth marketing.",
    availableTime: "Wednesdays",
    languages: ["English", "Urdu"],
    areasOfExpertise: ["Marketing Strategy", "Leadership", "Career Development"]
  },
  {
    id: "m6",
    name: "David Park",
    role: "Principal Engineer",
    department: "Infrastructure",
    location: "Seattle",
    avatar: "https://i.pravatar.cc/150?img=6",
    skills: ["AWS", "Kubernetes", "DevOps", "System Design"],
    experience: "11+ years",
    mentees: 8,
    rating: 4.5,
    availability: "High",
    bio: "Infrastructure expert specialized in building scalable and reliable systems. Enjoys helping engineers develop their technical depth.",
    availableTime: "Mondays & Fridays",
    languages: ["English", "Korean"],
    areasOfExpertise: ["System Design", "Technical Skills", "Problem Solving"]
  },
  {
    id: "m7",
    name: "Olivia Smith",
    role: "Head of People",
    department: "HR",
    location: "Toronto",
    avatar: "https://i.pravatar.cc/150?img=7",
    skills: ["Leadership Development", "Coaching", "Talent Management", "Culture"],
    experience: "14+ years",
    mentees: 27,
    rating: 4.8,
    availability: "Medium",
    bio: "HR leader passionate about developing talent and building inclusive organizations. Certified executive coach.",
    availableTime: "Tuesday & Thursday afternoons",
    languages: ["English", "French"],
    areasOfExpertise: ["Leadership", "Career Development", "Work-Life Balance"]
  },
  {
    id: "m8",
    name: "Raj Patel",
    role: "Finance Director",
    department: "Finance",
    location: "Chicago",
    avatar: "https://i.pravatar.cc/150?img=8",
    skills: ["Financial Planning", "Strategic Finance", "Forecasting", "Analytics"],
    experience: "16+ years",
    mentees: 10,
    rating: 4.7,
    availability: "Low",
    bio: "Finance leader with experience in tech and retail industries. Enjoys mentoring professionals on financial literacy and career growth.",
    availableTime: "Wednesday mornings",
    languages: ["English", "Hindi"],
    areasOfExpertise: ["Financial Literacy", "Career Growth", "Strategic Thinking"]
  },
];

const RecommendedMentorsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMentors, setFilteredMentors] = useState(mockMentors);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter and sort mentors
  useEffect(() => {
    let filtered = [...mockMentors];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(mentor => 
        mentor.name.toLowerCase().includes(query) ||
        mentor.role.toLowerCase().includes(query) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply skill filters
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(mentor => 
        mentor.skills.some(skill => selectedSkills.includes(skill))
      );
    }
    
    // Apply department filters
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter(mentor => 
        selectedDepartments.includes(mentor.department)
      );
    }
    
    // Apply expertise filters
    if (selectedExpertise.length > 0) {
      filtered = filtered.filter(mentor => 
        mentor.areasOfExpertise.some(area => selectedExpertise.includes(area))
      );
    }
    
    // Apply availability filters
    if (selectedAvailability.length > 0) {
      filtered = filtered.filter(mentor => 
        selectedAvailability.includes(mentor.availability)
      );
    }
    
    // Apply language filters
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(mentor => 
        mentor.languages.some(lang => selectedLanguages.includes(lang))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'experience':
        filtered.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
      case 'availability':
        filtered.sort((a, b) => {
          const availabilityRank = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return availabilityRank[b.availability as keyof typeof availabilityRank] - 
                 availabilityRank[a.availability as keyof typeof availabilityRank];
        });
        break;
      case 'mentees':
        filtered.sort((a, b) => b.mentees - a.mentees);
        break;
      default:
        // Keep default order (recommended)
        break;
    }
    
    setFilteredMentors(filtered);
  }, [searchQuery, selectedSkills, selectedDepartments, selectedExpertise, selectedAvailability, selectedLanguages, sortBy]);
  
  // Get all unique values for filters
  const allSkills = Array.from(new Set(mockMentors.flatMap(mentor => mentor.skills)));
  const allDepartments = Array.from(new Set(mockMentors.map(mentor => mentor.department)));
  const allExpertise = Array.from(new Set(mockMentors.flatMap(mentor => mentor.areasOfExpertise)));
  const allLanguages = Array.from(new Set(mockMentors.flatMap(mentor => mentor.languages)));
  
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };
  
  const handleDepartmentToggle = (dept: string) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept) 
        : [...prev, dept]
    );
  };
  
  const handleExpertiseToggle = (area: string) => {
    setSelectedExpertise(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area) 
        : [...prev, area]
    );
  };
  
  const handleAvailabilityToggle = (availability: string) => {
    setSelectedAvailability(prev => 
      prev.includes(availability) 
        ? prev.filter(a => a !== availability) 
        : [...prev, availability]
    );
  };
  
  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language) 
        : [...prev, language]
    );
  };
  
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setSelectedDepartments([]);
    setSelectedExpertise([]);
    setSelectedAvailability([]);
    setSelectedLanguages([]);
    setSortBy('recommended');
  };
  
  const getTotalFiltersCount = () => {
    return selectedSkills.length + 
           selectedDepartments.length + 
           selectedExpertise.length + 
           selectedAvailability.length +
           selectedLanguages.length;
  };

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Recommended Mentors</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block border rounded-lg p-4 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Filters</h2>
            {getTotalFiltersCount() > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Department</h3>
            <div className="space-y-1">
              {allDepartments.map(dept => (
                <div key={dept} className="flex items-center gap-2">
                  <Checkbox 
                    id={`dept-${dept}`} 
                    checked={selectedDepartments.includes(dept)}
                    onCheckedChange={() => handleDepartmentToggle(dept)}
                  />
                  <Label htmlFor={`dept-${dept}`} className="text-sm cursor-pointer">
                    {dept}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Areas of Expertise</h3>
            <div className="space-y-1">
              {allExpertise.map(area => (
                <div key={area} className="flex items-center gap-2">
                  <Checkbox 
                    id={`area-${area}`} 
                    checked={selectedExpertise.includes(area)}
                    onCheckedChange={() => handleExpertiseToggle(area)}
                  />
                  <Label htmlFor={`area-${area}`} className="text-sm cursor-pointer">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Skills</h3>
            <ScrollArea className="h-40 rounded-md border p-2">
              <div className="space-y-1">
                {allSkills.map(skill => (
                  <div key={skill} className="flex items-center gap-2">
                    <Checkbox 
                      id={`skill-${skill}`} 
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={`skill-${skill}`} className="text-sm cursor-pointer">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Availability</h3>
            <div className="space-y-1">
              {['High', 'Medium', 'Low'].map(availability => (
                <div key={availability} className="flex items-center gap-2">
                  <Checkbox 
                    id={`availability-${availability}`} 
                    checked={selectedAvailability.includes(availability)}
                    onCheckedChange={() => handleAvailabilityToggle(availability)}
                  />
                  <Label htmlFor={`availability-${availability}`} className="text-sm cursor-pointer">
                    {availability}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Languages</h3>
            <div className="space-y-1">
              {allLanguages.map(language => (
                <div key={language} className="flex items-center gap-2">
                  <Checkbox 
                    id={`language-${language}`} 
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={() => handleLanguageToggle(language)}
                  />
                  <Label htmlFor={`language-${language}`} className="text-sm cursor-pointer">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search mentors..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
                <SelectItem value="mentees">Number of Mentees</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {getTotalFiltersCount() > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {getTotalFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Tabs defaultValue="department" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 mb-4">
                      <TabsTrigger value="department">Department</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>
                    <TabsContent value="department" className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Department</h3>
                        <div className="space-y-1">
                          {allDepartments.map(dept => (
                            <div key={dept} className="flex items-center gap-2">
                              <Checkbox 
                                id={`mobile-dept-${dept}`} 
                                checked={selectedDepartments.includes(dept)}
                                onCheckedChange={() => handleDepartmentToggle(dept)}
                              />
                              <Label htmlFor={`mobile-dept-${dept}`} className="text-sm cursor-pointer">
                                {dept}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Areas of Expertise</h3>
                        <div className="space-y-1">
                          {allExpertise.map(area => (
                            <div key={area} className="flex items-center gap-2">
                              <Checkbox 
                                id={`mobile-area-${area}`} 
                                checked={selectedExpertise.includes(area)}
                                onCheckedChange={() => handleExpertiseToggle(area)}
                              />
                              <Label htmlFor={`mobile-area-${area}`} className="text-sm cursor-pointer">
                                {area}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="skills" className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Skills</h3>
                        <div className="space-y-1 max-h-[300px] overflow-y-auto">
                          {allSkills.map(skill => (
                            <div key={skill} className="flex items-center gap-2">
                              <Checkbox 
                                id={`mobile-skill-${skill}`} 
                                checked={selectedSkills.includes(skill)}
                                onCheckedChange={() => handleSkillToggle(skill)}
                              />
                              <Label htmlFor={`mobile-skill-${skill}`} className="text-sm cursor-pointer">
                                {skill}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Availability</h3>
                        <div className="space-y-1">
                          {['High', 'Medium', 'Low'].map(availability => (
                            <div key={availability} className="flex items-center gap-2">
                              <Checkbox 
                                id={`mobile-availability-${availability}`} 
                                checked={selectedAvailability.includes(availability)}
                                onCheckedChange={() => handleAvailabilityToggle(availability)}
                              />
                              <Label htmlFor={`mobile-availability-${availability}`} className="text-sm cursor-pointer">
                                {availability}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Languages</h3>
                        <div className="space-y-1">
                          {allLanguages.map(language => (
                            <div key={language} className="flex items-center gap-2">
                              <Checkbox 
                                id={`mobile-language-${language}`} 
                                checked={selectedLanguages.includes(language)}
                                onCheckedChange={() => handleLanguageToggle(language)}
                              />
                              <Label htmlFor={`mobile-language-${language}`} className="text-sm cursor-pointer">
                                {language}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </Button>
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
            </p>
            {getTotalFiltersCount() > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="hidden lg:flex"
              >
                Clear all filters
              </Button>
            )}
          </div>
          
          {/* Mentors List */}
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex gap-2 mt-2">
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredMentors.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No mentors found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your filters or search query</p>
              <Button className="mt-4" onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredMentors.map(mentor => (
                <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={mentor.avatar} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center mt-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">{mentor.name}</h3>
                          <p className="text-muted-foreground">{mentor.role}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {mentor.department}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {mentor.experience}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`flex items-center gap-1 ${
                                mentor.availability === 'High' 
                                  ? 'border-green-500 text-green-700' 
                                  : mentor.availability === 'Medium'
                                    ? 'border-amber-500 text-amber-700'
                                    : 'border-red-300 text-red-700'
                              }`}
                            >
                              <Calendar className="h-3 w-3" />
                              {mentor.availability} Availability
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm line-clamp-2">{mentor.bio}</p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Top skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.skills.slice(0, 4).map(skill => (
                              <Badge key={skill} variant="outline" className="bg-primary/5">
                                {skill}
                              </Badge>
                            ))}
                            {mentor.skills.length > 4 && (
                              <Badge variant="outline">+{mentor.skills.length - 4} more</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">
                              Mentored {mentor.mentees} {mentor.mentees === 1 ? 'person' : 'people'}
                            </span>
                          </div>
                          <Button>Request Mentorship</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedMentorsPage;
