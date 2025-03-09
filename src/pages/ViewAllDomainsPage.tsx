
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

// Create mock domains data since it doesn't exist in mockData.ts
const domains = [
  {
    id: '1',
    name: 'Leadership & Management',
    description: 'Develop essential leadership skills and management techniques',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    courseCount: 24,
    totalHours: 120
  },
  {
    id: '2',
    name: 'Technical Skills',
    description: 'Learn programming, data science, and other technical disciplines',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    courseCount: 35,
    totalHours: 180
  },
  {
    id: '3',
    name: 'Data & Analytics',
    description: 'Master data analysis, visualization, and business intelligence',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    courseCount: 28,
    totalHours: 145
  },
  {
    id: '4',
    name: 'Marketing & Digital',
    description: 'Discover modern marketing strategies and digital tools',
    imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
    courseCount: 19,
    totalHours: 95
  },
  {
    id: '5',
    name: 'Product Management',
    description: 'Learn to build and manage successful products',
    imageUrl: 'https://images.unsplash.com/photo-1460794418188-1bb7dba2720d',
    courseCount: 15,
    totalHours: 78
  },
  {
    id: '6',
    name: 'Design & Innovation',
    description: 'Explore design thinking, UX, and creative problem-solving',
    imageUrl: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4',
    courseCount: 22,
    totalHours: 110
  }
];

const ViewAllDomainsPage = () => {
  const navigate = useNavigate();

  const handleDomainClick = (domainId: string) => {
    navigate(`/domain/${domainId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2 p-0 h-auto"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </Button>
        <h1 className="text-2xl font-bold">All Domains</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="rounded-xl overflow-hidden cursor-pointer border shadow hover:shadow-md transition-shadow duration-200"
            onClick={() => handleDomainClick(domain.id)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={domain.imageUrl}
                alt={domain.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1 mb-1">{domain.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{domain.description}</p>
              <div className="mt-3 text-xs text-muted-foreground">
                {domain.courseCount} courses • {domain.totalHours}+ hours of content
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllDomainsPage;
