
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/layout/PageLayout';
import { mockSkills } from '@/data/skillsData';
import { Skill } from '@/components/skills/types';
import SkillsHeader from '@/components/skills/SkillsHeader';
import SkillsGrid from '@/components/skills/SkillsGrid';

const Skills: React.FC = () => {
  const navigate = useNavigate();
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(mockSkills);
  
  const handleSkillClick = (skillId: number) => {
    navigate(`/skill-detail/${skillId}`);
  };
  
  return (
    <PageLayout>
      <Helmet>
        <title>Skills | Learning Portal</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <SkillsHeader skills={mockSkills} onSearch={setFilteredSkills} />
        <SkillsGrid skills={filteredSkills} onSkillClick={handleSkillClick} />
      </div>
    </PageLayout>
  );
};

export default Skills;
