
import React from 'react';
import { 
  Card, CardContent 
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight, ChevronRight, BookOpen } from 'lucide-react';

const DomainCatalog = () => {
  const navigate = useNavigate();
  
  // Mock data for domains
  const domains = [
    { id: '1', name: 'Technology', courseCount: 42 },
    { id: '2', name: 'Leadership', courseCount: 37 },
    { id: '3', name: 'Business', courseCount: 56 }, 
    { id: '4', name: 'Data Science', courseCount: 29 },
    { id: '5', name: 'Marketing', courseCount: 24 }, 
    { id: '6', name: 'Design', courseCount: 31 },
    { id: '7', name: 'Product', courseCount: 18 }, 
    { id: '8', name: 'Finance', courseCount: 22 },
    { id: '9', name: 'HR', courseCount: 33 }, 
    { id: '10', name: 'Operations', courseCount: 27 }
  ];
  
  const handleDomainClick = (domainId: string, domainName: string) => {
    // Navigate to the domain page with both ID and name
    navigate(`/domain/${domainId}`, { state: { domainName } });
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-sm">
      <CardContent className="py-6 px-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Domains Catalog</h2>
            <Button 
              variant="link" 
              className="flex items-center gap-1 p-0 text-blue-600"
              onClick={() => navigate('/view-all/domains')}
            >
              View All <MoveRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Domain links in a grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {domains.map((domain) => (
              <Button
                key={domain.id}
                variant="ghost"
                className="justify-between hover:bg-blue-100/50"
                onClick={() => handleDomainClick(domain.id, domain.name)}
              >
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  {domain.name}
                </span>
                <ChevronRight className="h-4 w-4 text-blue-600" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainCatalog;
