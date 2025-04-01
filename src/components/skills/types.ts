
export interface Skill {
  id: number;
  name: string;
  proficiency: string;
  description: string;
  category?: string;
  icon?: string;
  courses: number[];
}

export interface SkillDetailProps {
  skillId: string;
}
