
import { useState, useEffect } from 'react';
import { AssessmentAttempt } from '@/components/skills/assessment/types';

export function useAttemptManagement(skillId: number | undefined) {
  const [previousAttempts, setPreviousAttempts] = useState<AssessmentAttempt[]>([]);
  
  useEffect(() => {
    if (skillId) {
      loadPreviousAttempts(skillId);
    }
  }, [skillId]);

  const loadPreviousAttempts = (skillId: number) => {
    try {
      // In a real app, this would come from a database
      const savedAttemptsString = localStorage.getItem(`assessment_attempts_${skillId}`);
      if (savedAttemptsString) {
        const savedAttempts = JSON.parse(savedAttemptsString) as AssessmentAttempt[];
        setPreviousAttempts(savedAttempts);
      }
    } catch (error) {
      console.error("Error loading previous attempts:", error);
    }
  };

  const saveAttempt = (attempt: AssessmentAttempt) => {
    try {
      // Add to previous attempts
      const updatedAttempts = [attempt, ...previousAttempts];
      setPreviousAttempts(updatedAttempts);
      
      // In a real app, this would be saved to a database
      localStorage.setItem(`assessment_attempts_${attempt.skillId}`, JSON.stringify(updatedAttempts));
      
      return true;
    } catch (error) {
      console.error("Error saving attempt:", error);
      return false;
    }
  };

  return {
    previousAttempts,
    saveAttempt
  };
}
