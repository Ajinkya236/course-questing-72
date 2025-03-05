
import React from 'react';
import FollowSkillsWidget from './FollowSkills';
import SkillsForYourRole from './SkillsForYourRole';

const SkillsWidgets: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FollowSkillsWidget />
      <SkillsForYourRole />
    </div>
  );
};

export default SkillsWidgets;
