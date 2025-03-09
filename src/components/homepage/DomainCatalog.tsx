
import React, { useState } from 'react';
import { 
  CarouselFilters 
} from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight, ChevronRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DomainCatalog = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  
  // Mock data for domains and skills
  const domains = [
    'All Domains', 'Technology', 'Leadership', 'Business', 'Data Science', 
    'Marketing', 'Design', 'Product', 'Finance', 'HR', 'Operations'
  ];
  
  const domainSkills = {
    'Technology': ['Programming', 'Cloud', 'DevOps', 'Security', 'Architecture'],
    'Leadership': ['Management', 'Strategy', 'Communication', 'Decision Making'],
    'Business': ['Analytics', 'Strategy', 'Operations', 'Innovation'],
    'Data Science': ['Machine Learning', 'Statistics', 'Data Engineering', 'Analytics'],
    'Marketing': ['Digital', 'Content', 'Analytics', 'Strategy'],
    'Design': ['UX/UI', 'Graphic Design', 'Product Design', 'Branding'],
    'Product': ['Management', 'Development', 'Analytics', 'UX Research'],
    'Finance': ['Accounting', 'Investment', 'Analysis', 'Strategy'],
    'HR': ['Recruitment', 'Development', 'Culture', 'Compliance'],
    'Operations': ['Process', 'Quality', 'Supply Chain', 'Logistics']
  };
  
  // Get skills for selected domain
  const skills = selectedDomain !== 'All Domains' 
    ? ['All Skills', ...domainSkills[selectedDomain as keyof typeof domainSkills]] 
    : ['All Skills'];
  
  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
    setSelectedSkill('All Skills');
  };
  
  const handleSkillSelect = (skill: string) => {
    setSelectedSkill(skill);
  };
  
  const handleDomainClick = (domain: string) => {
    if (domain === 'All Domains') {
      navigate('/view-all/domains');
    } else {
      // Convert domain name to a simple ID format
      const domainId = domain.toLowerCase().replace(/\s/g, '-');
      navigate(`/domain/${domainId}`);
    }
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
          
          {/* Domain filters */}
          <CarouselFilters
            filters={domains}
            selectedFilter={selectedDomain}
            onFilterSelect={handleDomainSelect}
          />
          
          {/* Skills filters - only show if a specific domain is selected */}
          {selectedDomain !== 'All Domains' && (
            <CarouselFilters
              filters={skills}
              selectedFilter={selectedSkill}
              onFilterSelect={handleSkillSelect}
              className="mb-6"
            />
          )}
          
          {/* Domain links in a grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {domains.filter(d => d !== 'All Domains').map((domain) => (
              <Button
                key={domain}
                variant="ghost"
                className="justify-between hover:bg-blue-100/50"
                onClick={() => handleDomainClick(domain)}
              >
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  {domain}
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
