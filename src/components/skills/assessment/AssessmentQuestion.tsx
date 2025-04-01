
import React from 'react';
import { Question } from './types';
import {
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  FillInBlanksQuestion,
  VideoResponseQuestion,
  DocumentAnalysisQuestion,
  CodeSandboxQuestion,
  QuestionTypeLabel
} from './question-types';

interface AssessmentQuestionProps {
  question: Question;
  onAnswerChange: (answer: string | string[]) => void;
  questionNumber: number;
  totalQuestions: number;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  onAnswerChange,
  questionNumber,
  totalQuestions
}) => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Question {questionNumber} of {totalQuestions}</span>
          <QuestionTypeLabel type={question.type} />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">{question.text}</h3>
        
        {/* Render the appropriate question component based on type */}
        {question.type === 'multipleChoice' && (
          <MultipleChoiceQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
          />
        )}
        
        {question.type === 'trueFalse' && (
          <TrueFalseQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
          />
        )}
        
        {question.type === 'shortAnswer' && (
          <ShortAnswerQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
          />
        )}
        
        {question.type === 'fillInBlanks' && (
          <FillInBlanksQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
          />
        )}
        
        {question.type === 'videoResponse' && (
          <VideoResponseQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
          />
        )}
        
        {question.type === 'documentAnalysis' && (
          <DocumentAnalysisQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
          />
        )}
        
        {question.type === 'codeSandbox' && (
          <CodeSandboxQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
          />
        )}
        
        {/* Support for future question types can be added here */}
      </div>
    </div>
  );
};

export default AssessmentQuestion;
