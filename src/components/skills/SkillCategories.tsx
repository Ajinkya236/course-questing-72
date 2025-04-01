
import React from 'react';
import { Skill } from './types';
import SkillCarousel from './SkillCarousel';

interface SkillCategoriesProps {
  roleSkills: Skill[];
  recommendedSkills: Skill[];
  trendingSkills: Skill[];
  onSkillClick: (skillId: number) => void;
}

const SkillCategories: React.FC<SkillCategoriesProps> = ({
  roleSkills,
  recommendedSkills,
  trendingSkills,
  onSkillClick
}) => {
  return (
    <div className="space-y-12 mt-8">
      {/* Skills for my role section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Skills for My Role</h2>
        <p className="text-muted-foreground mb-6">
          Skills that are tagged for your current role and position
        </p>
        <SkillCarousel 
          skills={roleSkills} 
          onSkillClick={onSkillClick}
          emptyMessage="No role-specific skills found"
        />
      </section>

      {/* Recommended skills section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recommended Skills</h2>
        <p className="text-muted-foreground mb-6">
          Skills recommended based on your learning history and career goals
        </p>
        <SkillCarousel 
          skills={recommendedSkills} 
          onSkillClick={onSkillClick}
          emptyMessage="No recommended skills at this time"
        />
      </section>

      {/* Trending skills section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending Skills</h2>
        <p className="text-muted-foreground mb-6">
          Most popular skills that others in your organization are learning
        </p>
        <SkillCarousel 
          skills={trendingSkills} 
          onSkillClick={onSkillClick}
          emptyMessage="No trending skills at this time"
        />
      </section>
    </div>
  );
};

export default SkillCategories;
