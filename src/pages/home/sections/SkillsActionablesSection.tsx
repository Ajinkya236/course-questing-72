
import React from 'react';
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';

const SkillsActionablesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <SkillsSection />
        <ActionablesCard />
      </div>
      <RewardsSummary />
    </div>
  );
};

export default SkillsActionablesSection;
