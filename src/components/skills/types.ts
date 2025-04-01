
export interface Skill {
  id: number;
  name: string;
  proficiency: string;
  description: string;
  category: string; // Changed from optional to required
  icon: string; // Changed from optional to required
  courses: number[];
}

export interface SkillDetailProps {
  skillId: string;
}
