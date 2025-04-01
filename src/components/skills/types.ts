
export interface Skill {
  id: number;
  name: string;
  proficiency: string;
  description: string;
  courses: number[];
}

export interface SkillDetailProps {
  skillId: string;
}
