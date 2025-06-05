
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface Domain {
  id: string;
  name: string;
  courseCount: number;
  icon: string;
}

const domains: Domain[] = [
  { id: '1', name: 'Leadership', courseCount: 42, icon: '👑' },
  { id: '2', name: 'Data Analysis', courseCount: 37, icon: '📊' },
  { id: '3', name: 'Programming', courseCount: 56, icon: '💻' },
  { id: '4', name: 'Marketing', courseCount: 29, icon: '📈' },
  { id: '5', name: 'Design', courseCount: 24, icon: '🎨' },
  { id: '6', name: 'Product Management', courseCount: 31, icon: '🚀' },
  { id: '7', name: 'Finance', courseCount: 18, icon: '💰' },
  { id: '8', name: 'Communication', courseCount: 22, icon: '🗣️' },
  { id: '9', name: 'AI & Machine Learning', courseCount: 33, icon: '🤖' },
  { id: '10', name: 'Project Management', courseCount: 27, icon: '📋' },
  { id: '11', name: 'Business Strategy', courseCount: 19, icon: '🏆' },
  { id: '12', name: 'Innovation', courseCount: 15, icon: '💡' },
];

const DomainCatalog: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleDomainClick = (domainId: string) => {
    navigate(`/domain/${domainId}`);
  };

  return (
    <div className="content-spacing">
      <div className="flex justify-between items-center group mb-6">
        <h2 className="text-xl font-archivo-black">Domain Catalog</h2>
        <div className="flex items-center">
          <Button 
            variant="link" 
            size="sm" 
            className="gap-1 text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" 
            onClick={() => navigate('/view-all/domains')}
          >
            View All
          </Button>
          <ChevronRight 
            className="h-4 w-4 cursor-pointer text-primary hover:text-primary/80" 
            onClick={() => navigate('/view-all/domains')}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {domains.map((domain) => (
          <Card 
            key={domain.id} 
            className="modern-card hover:shadow-modern-lg cursor-pointer group"
            onClick={() => handleDomainClick(domain.id)}
          >
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{domain.icon}</div>
              <h3 className="font-medium text-sm mb-1 font-archivo-black">{domain.name}</h3>
              <p className="text-xs text-muted-foreground">{domain.courseCount} courses</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DomainCatalog;
