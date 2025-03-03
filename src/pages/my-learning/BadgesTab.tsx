
import React from 'react';
import BadgeCard from '@/components/BadgeCard';

// Mock data for badges
const badges = [
  {
    id: '1',
    title: 'Fast Learner',
    description: 'Completed 5 courses in under 30 days',
    category: 'Achievement',
    isUnlocked: true,
  },
  {
    id: '2',
    title: 'Tech Enthusiast',
    description: 'Completed all courses in the Technology track',
    category: 'Specialization',
    isUnlocked: true,
  },
  {
    id: '3',
    title: 'Team Player',
    description: 'Shared courses with 10 different colleagues',
    category: 'Social',
    isUnlocked: true,
  },
  {
    id: '4',
    title: 'Perfect Score',
    description: 'Achieved 100% on 3 different assessments',
    category: 'Excellence',
    isUnlocked: true,
  },
  {
    id: '5',
    title: 'Leadership Guru',
    description: 'Mastered all leadership competencies',
    category: 'Mastery',
    isUnlocked: false,
    progress: 75,
  },
  {
    id: '6',
    title: 'Data Wizard',
    description: 'Completed all data science and analytics courses',
    category: 'Specialization',
    isUnlocked: false,
    progress: 40,
  },
  {
    id: '7',
    title: 'Early Riser',
    description: 'Completed 10 courses before 9 AM',
    category: 'Habit',
    isUnlocked: false,
    progress: 60,
  },
  {
    id: '8',
    title: 'Weekend Warrior',
    description: 'Spent more than 24 hours learning over weekends',
    category: 'Dedication',
    isUnlocked: true,
  },
  {
    id: '9',
    title: 'Streak Master',
    description: 'Maintained a 30-day learning streak',
    category: 'Consistency',
    isUnlocked: false,
    progress: 60,
  },
  {
    id: '10',
    title: 'Feedback Champion',
    description: 'Provided constructive feedback on 20 courses',
    category: 'Contribution',
    isUnlocked: false,
    progress: 25,
  },
  {
    id: '11',
    title: 'Global Learner',
    description: 'Completed courses from 5 different countries',
    category: 'Diversity',
    isUnlocked: true,
  },
  {
    id: '12',
    title: 'Night Owl',
    description: 'Completed 15 learning sessions after 10 PM',
    category: 'Habit',
    isUnlocked: false,
    progress: 80,
  },
];

const BadgesTab = () => {
  const unlockedBadges = badges.filter(badge => badge.isUnlocked);
  const lockedBadges = badges.filter(badge => !badge.isUnlocked);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Earned Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {unlockedBadges.map(badge => (
            <BadgeCard key={badge.id} {...badge} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Badges to Earn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lockedBadges.map(badge => (
            <BadgeCard key={badge.id} {...badge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesTab;
