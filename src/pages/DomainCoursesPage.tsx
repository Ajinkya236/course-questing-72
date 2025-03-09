
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { mockCourses } from '@/data/mockCoursesData';
import CourseCard from '@/components/CourseCard';
import { CarouselFilters } from '@/components/ui/carousel';

interface Domain {
  id: string;
  name: string;
  courseCount: number;
  icon: string;
  description: string;
}

const domains: Domain[] = [
  { 
    id: '1', 
    name: 'Leadership', 
    courseCount: 42, 
    icon: '👑',
    description: 'Develop leadership skills for effective team management and organizational growth.'
  },
  { 
    id: '2', 
    name: 'Data Analysis', 
    courseCount: 37, 
    icon: '📊',
    description: 'Learn data analysis techniques to derive insights and make data-driven decisions.'
  },
  { 
    id: '3', 
    name: 'Programming', 
    courseCount: 56, 
    icon: '💻',
    description: 'Master programming languages and software development methodologies.'
  },
  { 
    id: '4', 
    name: 'Marketing', 
    courseCount: 29, 
    icon: '📈',
    description: 'Explore marketing strategies and tools to promote products and services effectively.'
  },
  { 
    id: '5', 
    name: 'Design', 
    courseCount: 24, 
    icon: '🎨',
    description: 'Discover design principles and practices for creating compelling visual experiences.'
  },
  { 
    id: '6', 
    name: 'Product Management', 
    courseCount: 31, 
    icon: '🚀',
    description: 'Learn product management methodologies to build and launch successful products.'
  },
  { 
    id: '7', 
    name: 'Finance', 
    courseCount: 18, 
    icon: '💰',
    description: 'Understand financial principles and practices for effective financial management.'
  },
  { 
    id: '8', 
    name: 'Communication', 
    courseCount: 22, 
    icon: '🗣️',
    description: 'Enhance communication skills for effective interpersonal and professional interactions.'
  },
  { 
    id: '9', 
    name: 'AI & Machine Learning', 
    courseCount: 33, 
    icon: '🤖',
    description: 'Explore artificial intelligence and machine learning concepts and applications.'
  },
  { 
    id: '10', 
    name: 'Project Management', 
    courseCount: 27, 
    icon: '📋',
    description: 'Learn project management methodologies and tools for successful project delivery.'
  },
  { 
    id: '11', 
    name: 'Business Strategy', 
    courseCount: 19, 
    icon: '🏆',
    description: 'Develop strategic thinking and business planning skills for organizational success.'
  },
  { 
    id: '12', 
    name: 'Innovation', 
    courseCount: 15, 
    icon: '💡',
    description: 'Foster innovation mindset and practices for driving organizational growth and competitiveness.'
  },
];

// Skills by domain
const skillsByDomain: Record<string, string[]> = {
  '1': ['Team Management', 'Coaching', 'Strategy', 'Conflict Resolution', 'Delegation', 'Motivation'],
  '2': ['SQL', 'Python', 'Data Visualization', 'Statistical Analysis', 'Machine Learning', 'Data Cleaning'],
  '3': ['JavaScript', 'Python', 'Java', 'C#', 'React', 'Node.js', 'Database Design'],
  '4': ['Social Media', 'SEO', 'Content Marketing', 'Analytics', 'Branding', 'Digital Advertising'],
  '5': ['UI Design', 'UX Research', 'Graphic Design', 'Typography', 'Color Theory', 'Wireframing'],
  '6': ['Product Strategy', 'Roadmapping', 'User Research', 'Agile', 'Scrum', 'Backlog Management'],
  '7': ['Accounting', 'Financial Analysis', 'Budgeting', 'Risk Management', 'Investment', 'Taxation'],
  '8': ['Public Speaking', 'Writing', 'Negotiation', 'Presentation', 'Active Listening', 'Storytelling'],
  '9': ['Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'TensorFlow'],
  '10': ['Agile', 'Scrum', 'Kanban', 'Risk Management', 'Stakeholder Management', 'Resource Planning'],
  '11': ['Strategic Planning', 'Competitive Analysis', 'Market Research', 'Business Models', 'SWOT Analysis'],
  '12': ['Design Thinking', 'Creative Problem Solving', 'Prototyping', 'Ideation', 'User Testing']
};

const DomainCoursesPage: React.FC = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const [domain, setDomain] = useState<Domain | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>('All Skills');

  useEffect(() => {
    if (domainId) {
      const foundDomain = domains.find(d => d.id === domainId);
      if (foundDomain) {
        setDomain(foundDomain);
        // Filter mock courses for this domain (in real app, would fetch from API)
        setCourses(mockCourses.slice(0, foundDomain.courseCount % 20 + 10));
      } else {
        navigate('/');
      }
    }
  }, [domainId, navigate]);

  if (!domain) {
    return <div>Loading...</div>;
  }

  // Get skills for this domain
  const availableSkills = ['All Skills', ...(skillsByDomain[domain.id] || [])];

  // Filter courses by selected skill
  const filteredCourses = selectedSkill === 'All Skills' 
    ? courses 
    : courses.filter(course => 
        course.skills?.some((skill: any) => skill.name.toLowerCase().includes(selectedSkill.toLowerCase()))
      );

  return (
    <>
      <Helmet>
        <title>{domain.name} Courses | Learning Management System</title>
      </Helmet>

      <div className="container py-8">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-6" 
          onClick={() => navigate('/')}  {/* Changed to navigate to home page */}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center gap-4 mb-8">
          <div className="text-5xl">{domain.icon}</div>
          <div>
            <h1 className="text-3xl font-bold">{domain.name}</h1>
            <p className="text-muted-foreground">{domain.description}</p>
          </div>
        </div>

        {/* Domain filters carousel with navigation buttons */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Browse Domains</h3>
          <CarouselFilters
            filters={domains.map(d => d.name)}
            selectedFilter={domain.name}
            onFilterSelect={(name) => {
              const selected = domains.find(d => d.name === name);
              if (selected) navigate(`/domain/${selected.id}`);
            }}
          />
        </div>

        {/* Skills filter carousel */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Filter by Skills</h3>
          <CarouselFilters
            filters={availableSkills}
            selectedFilter={selectedSkill}
            onFilterSelect={setSelectedSkill}
          />
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} onClick={() => navigate(`/course/${course.id}`)} className="cursor-pointer">
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-muted-foreground">Try selecting a different skill filter</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DomainCoursesPage;
