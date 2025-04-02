import React from 'react';
import { Question } from '../types';

export interface DocumentAnalysisQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean; // Added disabled prop
}

const DocumentAnalysisQuestion: React.FC<DocumentAnalysisQuestionProps> = ({ 
  question, 
  onAnswerChange,
  disabled = false // Default to false
}) => {
  return (
    <div>
      {question.documentUrl && (
        <div className="mb-4">
          <a 
            href={question.documentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center"
          >
            <span className="mr-2">Open document for analysis</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      )}
      <textarea
        className="w-full min-h-[150px] p-3 border rounded-lg"
        value={(question.userAnswer as string) || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Based on the document, provide your analysis here..."
        disabled={disabled}
      />
    </div>
  );
};

export default DocumentAnalysisQuestion;
