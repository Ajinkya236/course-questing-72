
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

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

const ViewAllDomainsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDomainClick = (domainId: string) => {
    navigate(`/domain/${domainId}`);
  };

  return (
    <>
      <Helmet>
        <title>All Domains | Learning Management System</title>
      </Helmet>

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">All Domains</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {domains.map((domain) => (
            <Card 
              key={domain.id} 
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => handleDomainClick(domain.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{domain.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{domain.name}</h3>
                    <p className="text-sm text-muted-foreground">{domain.courseCount} courses</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{domain.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewAllDomainsPage;
