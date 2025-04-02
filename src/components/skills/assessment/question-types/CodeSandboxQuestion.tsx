import React from 'react';
import { Question } from '../types';

export interface CodeSandboxQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean; // Added disabled prop
}

const CodeSandboxQuestion: React.FC<CodeSandboxQuestionProps> = ({ 
  question, 
  onAnswerChange,
  disabled = false // Default to false
}) => {
  return (
    <div>
      <div className="mb-3">
        <div className="bg-gray-800 text-white p-3 rounded-t-lg font-mono text-sm overflow-x-auto">
          {question.initialCode}
        </div>
        <textarea
          className="w-full min-h-[200px] p-3 border border-t-0 rounded-b-lg font-mono"
          value={(question.userAnswer as string) || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Write your code here..."
          disabled={disabled}
        />
      </div>
      {question.testCases && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Test Cases:</h4>
          <ul className="list-disc pl-5">
            {question.testCases.map((test, idx) => (
              <li key={idx}>{test}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeSandboxQuestion;
