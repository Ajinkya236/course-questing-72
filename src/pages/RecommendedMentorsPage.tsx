
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Filter,
  Check,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for recommended mentors
const recommendedMentors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 38,
    topics: ["Data Analysis", "Machine Learning", "Statistics"],
    experience: "10+ years",
    availability: "Weekdays",
    languages: ["English", "Spanish"],
    department: "Engineering"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 27,
    topics: ["Product Management", "UX Design", "Agile Methodologies"],
    experience: "8 years",
    availability: "Evenings",
    languages: ["English", "Mandarin"],
    department: "Product"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Executive Coach",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5.0,
    reviews: 42,
    topics: ["Leadership", "Communication", "Career Development"],
    experience: "15+ years",
    availability: "Flexible",
    languages: ["English", "Spanish", "Portuguese"],
    department: "HR"
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Software Engineering Lead",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.7,
    reviews: 31,
    topics: ["Software Development", "Cloud Computing", "System Architecture"],
    experience: "12 years",
    availability: "Weekends",
    languages: ["English"],
    department: "Engineering"
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "UX Research Manager",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.9,
    reviews: 36,
    topics: ["User Research", "Design Thinking", "Usability Testing"],
    experience: "9 years",
    availability: "Weekdays",
    languages: ["English", "Hindi"],
    department: "Design"
  },
  {
    id: 6,
    name: "David Kim",
    title: "Marketing Director",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.8,
    reviews: 29,
    topics: ["Digital Marketing", "Brand Strategy", "Growth Marketing"],
    experience: "11 years",
    availability: "Mornings",
    languages: ["English", "Korean"],
    department: "Marketing"
  },
  {
    id: 7,
    name: "Sophia Martinez",
    title: "Project Management Coach",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 4.6,
    reviews: 24,
    topics: ["Project Management", "Scrum", "Team Leadership"],
    experience: "7 years",
    availability: "Afternoons",
    languages: ["English", "Spanish"],
    department: "Operations"
  },
  {
    id: 8,
    name: "Alex Turner",
    title: "Data Analytics Lead",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4.9,
    reviews: 33,
    topics: ["Data Visualization", "BI Tools", "SQL"],
    experience: "6 years",
    availability: "Flexible",
    languages: ["English", "French"],
    department: "Engineering"
  }
];

// All available topics
const allTopics = Array.from(
  new Set(recommendedMentors.flatMap(mentor => mentor.topics))
).sort();

// All departments
const departments = Array.from(
  new Set(recommendedMentors.map(mentor => mentor.department))
).sort();

const RecommendedMentorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  
  // Filter and sort mentors
  const filteredMentors = recommendedMentors
    .filter(mentor => {
      // Filter by topics
      if (selectedTopics.length > 0) {
        if (!mentor.topics.some(topic => selectedTopics.includes(topic))) {
          return false;
        }
      }
      
      // Filter by departments
      if (selectedDepartments.length > 0) {
        if (!selectedDepartments.includes(mentor.department)) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "reviews") {
        return b.reviews - a.reviews;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  
  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };
  
  const handleDepartmentChange = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };
  
  return (
    <>
      <Helmet>
        <title>Recommended Mentors | Learning Management System</title>
      </Helmet>
      
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2 p-2"
            onClick={() => navigate('/mentoring')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Recommended Mentors</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters panel */}
          <Card className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <RadioGroup value={sortBy} onValueChange={setSortBy}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rating" id="rating" />
                      <Label htmlFor="rating">Highest Rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reviews" id="reviews" />
                      <Label htmlFor="reviews">Most Reviews</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="name" id="name" />
                      <Label htmlFor="name">Name (A-Z)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Topics</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allTopics.map(topic => (
                      <div key={topic} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`topic-${topic}`} 
                          checked={selectedTopics.includes(topic)}
                          onCheckedChange={() => handleTopicChange(topic)}
                        />
                        <Label htmlFor={`topic-${topic}`}>{topic}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Department</h3>
                  <div className="space-y-2">
                    {departments.map(department => (
                      <div key={department} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`dept-${department}`} 
                          checked={selectedDepartments.includes(department)}
                          onCheckedChange={() => handleDepartmentChange(department)}
                        />
                        <Label htmlFor={`dept-${department}`}>{department}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main content */}
          <div className="flex-1">
            <Card className="mb-4">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <span className="text-muted-foreground">
                    Showing {filteredMentors.length} of {recommendedMentors.length} mentors
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="md:hidden flex items-center gap-1"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMentors.map(mentor => (
                <Card 
                  key={mentor.id}
                  className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/mentoring/mentor/${mentor.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <h3 className="font-medium text-lg">{mentor.name}</h3>
                      <p className="text-muted-foreground mb-2">{mentor.title}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                      </div>
                      
                      <div className="w-full text-left">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Experience:</span>
                          <span>{mentor.experience}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Availability:</span>
                          <span>{mentor.availability}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-muted-foreground">Languages:</span>
                          <span>{mentor.languages.join(', ')}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 justify-center">
                        {mentor.topics.slice(0, 3).map(topic => (
                          <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                        ))}
                        {mentor.topics.length > 3 && (
                          <Badge variant="secondary" className="text-xs">+{mentor.topics.length - 3} more</Badge>
                        )}
                      </div>
                      <Button className="mt-4 w-full" size="sm">Request Mentorship</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredMentors.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  No mentors match your filter criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedTopics([]);
                    setSelectedDepartments([]);
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedMentorsPage;
