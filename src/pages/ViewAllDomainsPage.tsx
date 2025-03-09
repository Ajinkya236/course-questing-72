
import React from 'react';
import { Container } from '@/components/ui/container';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { domains } from '@/data/mockData';

const ViewAllDomainsPage = () => {
  const navigate = useNavigate();

  const handleDomainClick = (domainId: string) => {
    navigate(`/domain/${domainId}`);
  };

  return (
    <Container>
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
    </Container>
  );
};

export default ViewAllDomainsPage;
