
import React from 'react';
import { QuestionType } from '../types';

interface QuestionTypeLabelProps {
  type: QuestionType;
}

const QuestionTypeLabel: React.FC<QuestionTypeLabelProps> = ({ type }) => {
  const formatQuestionTypeLabel = (type: QuestionType): string => {
    switch (type) {
      case 'multipleChoice': return 'Multiple Choice';
      case 'trueFalse': return 'True/False';
      case 'shortAnswer': return 'Short Answer';
      case 'videoResponse': return 'Video Analysis';
      case 'documentAnalysis': return 'Document Analysis';
      case 'fillInBlanks': return 'Fill in the Blanks';
      case 'matchTheFollowing': return 'Match the Following';
      case 'dragSequence': return 'Sequence Order';
      case 'findHotspot': return 'Find the Hotspot';
      case 'codeSandbox': return 'Code Sandbox';
      default: return type;
    }
  };
  
  return (
    <span className="text-xs px-2 py-1 rounded bg-gray-100">
      {formatQuestionTypeLabel(type)}
    </span>
  );
};

export default QuestionTypeLabel;
