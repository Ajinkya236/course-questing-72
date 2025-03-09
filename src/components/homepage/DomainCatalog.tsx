
import React, { useState } from 'react';
import { 
  CarouselFilters 
} from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight">Domains Catalog</h2>
        <Button 
          variant="link" 
          className="flex items-center gap-1 p-0"
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
      
      {/* Domain cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {domains.filter(d => d !== 'All Domains').map((domain) => (
          <div 
            key={domain}
            className="aspect-square rounded-xl border bg-card hover:bg-card/80 cursor-pointer transition-colors overflow-hidden"
            onClick={() => handleDomainClick(domain)}
          >
            <div className="h-full flex flex-col">
              <div className="h-2/3 bg-primary/10 relative">
                {/* Placeholder for domain image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl text-primary/40 font-bold">{domain.charAt(0)}</span>
                </div>
              </div>
              <div className="h-1/3 p-3 flex flex-col justify-between">
                <h3 className="font-medium">{domain}</h3>
                <div className="text-xs text-muted-foreground flex justify-between items-center">
                  <span>{domainSkills[domain as keyof typeof domainSkills]?.length || 0} skills</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 py-0">
                    <MoveRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainCatalog;
