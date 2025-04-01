
import { useState, useEffect } from 'react';
import { SkillBadge } from '@/components/skills/assessment/types';
import { useGamification } from '@/hooks/useGamification';

export function useBadgeManagement() {
  const [earnedBadges, setEarnedBadges] = useState<SkillBadge[]>([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [latestBadge, setLatestBadge] = useState<SkillBadge | null>(null);
  const { awardPoints } = useGamification();
  
  useEffect(() => {
    loadEarnedBadges();
  }, []);

  const loadEarnedBadges = () => {
    try {
      const savedBadgesString = localStorage.getItem('earned_skill_badges');
      if (savedBadgesString) {
        const savedBadges = JSON.parse(savedBadgesString) as SkillBadge[];
        setEarnedBadges(savedBadges);
      }
    } catch (error) {
      console.error("Error loading earned badges:", error);
    }
  };

  const awardBadge = (skillId: number, skillName: string, proficiency: string) => {
    try {
      // Check if badge already exists
      const badgeExists = earnedBadges.some(
        badge => badge.skillId === skillId && badge.proficiency === proficiency
      );
      
      if (badgeExists) return null;
      
      // Create new badge
      const newBadge: SkillBadge = {
        id: `badge-${Date.now()}`,
        skillId,
        skillName,
        proficiency,
        dateEarned: new Date().toISOString(),
      };
      
      // Add to earned badges
      const updatedBadges = [...earnedBadges, newBadge];
      setEarnedBadges(updatedBadges);
      
      // Save to localStorage
      localStorage.setItem('earned_skill_badges', JSON.stringify(updatedBadges));
      
      // Award points for earning a badge (50 points)
      awardPoints(50, `Earned ${proficiency} badge for ${skillName}`, 'skill_badge', String(skillId));
      
      // Show badge modal
      setLatestBadge(newBadge);
      setShowBadgeModal(true);
      
      return newBadge;
    } catch (error) {
      console.error("Error awarding badge:", error);
      return null;
    }
  };

  const closeBadgeModal = () => {
    setShowBadgeModal(false);
    setLatestBadge(null);
  };

  return {
    earnedBadges,
    showBadgeModal,
    latestBadge,
    awardBadge,
    closeBadgeModal
  };
}
