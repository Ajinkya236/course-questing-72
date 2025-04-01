
import React from 'react';

export type QuestionType = 
  | 'multipleChoice' 
  | 'trueFalse' 
  | 'shortAnswer' 
  | 'videoResponse' 
  | 'documentAnalysis' 
  | 'fillInBlanks'
  | 'matchTheFollowing'
  | 'dragSequence'
  | 'findHotspot'
  | 'codeSandbox';

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  userAnswer?: string | string[];
  videoUrl?: string;
  documentUrl?: string;
  initialCode?: string;
  expectedOutput?: string;
  testCases?: string[];
}

export interface AssessmentAttempt {
  id: string;
  date: string;
  score: number;
  skillId: number;
  skillName: string;
  questions: Question[];
  passed: boolean;
  badgeAwarded?: boolean;
}

export interface SkillBadge {
  id: string;
  skillId: number;
  skillName: string;
  proficiency: string;
  dateEarned: string;
  imageUrl?: string;
}
