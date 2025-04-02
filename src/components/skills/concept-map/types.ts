
export interface ConceptMapProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
  skillId?: number;
}

export interface Concept {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children: Concept[];
  proficiencyLevel?: string;
}

export const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const proficiencyColors = {
  'Beginner': 'bg-green-100 text-green-800 border-green-300',
  'Intermediate': 'bg-blue-100 text-blue-800 border-blue-300',
  'Advanced': 'bg-purple-100 text-purple-800 border-purple-300',
  'Expert': 'bg-red-100 text-red-800 border-red-300'
};
