
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/layout/PageLayout';
import { mockSkills } from '@/data/skillsData';
import { Skill } from '@/components/skills/types';
import SkillsHeader from '@/components/skills/SkillsHeader';
import SkillsGrid from '@/components/skills/SkillsGrid';
import SkillCategories from '@/components/skills/SkillCategories';

const Skills: React.FC = () => {
  const navigate = useNavigate();
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(mockSkills);
  const [selectedProficiency, setSelectedProficiency] = useState<string>('');
  
  // Filter skills when proficiency changes
  useEffect(() => {
    if (selectedProficiency) {
      const filtered = mockSkills.filter(skill => 
        skill.proficiency.toLowerCase() === selectedProficiency.toLowerCase()
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills(mockSkills);
    }
  }, [selectedProficiency]);
  
  const handleSkillClick = (skillId: number) => {
    navigate(`/skill-detail/${skillId}`);
  };
  
  const handleProficiencyChange = (proficiency: string) => {
    setSelectedProficiency(proficiency === selectedProficiency ? '' : proficiency);
  };
  
  // Get skills based on different categories
  const roleSkills = mockSkills.filter(skill => 
    skill.category === 'Role-Based' || skill.category === 'Management'
  );
  
  const recommendedSkills = mockSkills.filter(skill => 
    skill.category === 'Technical' || skill.category === 'Development'
  );
  
  const trendingSkills = mockSkills.filter(skill => 
    skill.category === 'Trending' || skill.category === 'Design'
  );
  
  return (
    <PageLayout>
      <Helmet>
        <title>Skills | Learning Portal</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <SkillsHeader 
          skills={mockSkills} 
          onSearch={setFilteredSkills} 
          selectedProficiency={selectedProficiency}
          onProficiencyChange={handleProficiencyChange}
        />
        
        {selectedProficiency ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              {filteredSkills.length} Skills with {selectedProficiency} proficiency
            </h2>
            <SkillsGrid skills={filteredSkills} onSkillClick={handleSkillClick} />
          </div>
        ) : (
          <SkillCategories 
            roleSkills={roleSkills}
            recommendedSkills={recommendedSkills}
            trendingSkills={trendingSkills}
            onSkillClick={handleSkillClick}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Skills;
