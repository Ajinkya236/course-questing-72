
import React from 'react';
import { Question } from '../types';
import {
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  FillInBlanksQuestion,
  VideoResponseQuestion,
  DocumentAnalysisQuestion,
  CodeSandboxQuestion
} from '../question-types';

interface QuestionRendererProps {
  question: Question;
  onAnswerChange: (answer: string | string[]) => void;
  isSubmitting: boolean;
  hasFeedback: boolean;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onAnswerChange,
  isSubmitting,
  hasFeedback
}) => {
  const disabled = isSubmitting || hasFeedback;
  
  switch (question.type) {
    case 'multipleChoice':
      return (
        <MultipleChoiceQuestion 
          question={question} 
          onAnswerChange={(answer) => onAnswerChange(answer)} 
          disabled={disabled}
        />
      );
    
    case 'trueFalse':
      return (
        <TrueFalseQuestion 
          question={question} 
          onAnswerChange={(answer) => onAnswerChange(answer)} 
          disabled={disabled}
        />
      );
    
    case 'shortAnswer':
      return (
        <ShortAnswerQuestion 
          question={question} 
          onAnswerChange={(answer) => onAnswerChange(answer)} 
          disabled={disabled}
        />
      );
    
    case 'fillInBlanks':
      return (
        <FillInBlanksQuestion 
          question={question} 
          onAnswerChange={(answer) => onAnswerChange(answer)} 
          disabled={disabled}
        />
      );
    
    case 'videoResponse':
      return (
        <VideoResponseQuestion 
          question={question} 
          onAnswerChange={(answer) => onAnswerChange(answer)} 
          disabled={disabled}
        />
      );
    
    case 'documentAnalysis':
      return (
        <DocumentAnalysisQuestion 
          question={question} 
          onAnswerChange={(answer) => onAnswerChange(answer)} 
          disabled={disabled}
        />
      );
    
    case 'codeSandbox':
      return (
        <CodeSandboxQuestion 
          question={question} 
          onAnswerChange={(answer) => onAnswerChange(answer)} 
          disabled={disabled}
        />
      );
    
    default:
      return <div>Unsupported question type: {question.type}</div>;
  }
};

export default QuestionRenderer;
