
export type QuestionType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'videoResponse' | 'documentAnalysis' | 'fillInBlanks' | 'matchTheFollowing' | 'dragSequence' | 'findHotspot';

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string | string[];
  userAnswer?: string | string[];
  explanation?: string;
  videoUrl?: string;
  documentUrl?: string;
}

export interface AssessmentAttempt {
  id: string;
  date: string;
  score: number;
  skillId: number;
  skillName: string;
  questions: Question[];
  passed: boolean;
}
