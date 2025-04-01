
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Code } from 'lucide-react';
import { Question } from '../types';

interface CodeSandboxQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
}

const CodeSandboxQuestion: React.FC<CodeSandboxQuestionProps> = ({ 
  question, 
  onAnswerChange 
}) => {
  const [codeSolution, setCodeSolution] = useState(question.initialCode || '// Write your code here');
  
  const handleCodeChange = (value: string) => {
    setCodeSolution(value);
    onAnswerChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg flex items-center gap-3 bg-muted/50">
        <Code className="h-6 w-6 text-primary" />
        <div>
          <p className="font-medium">Code Sandbox</p>
          <p className="text-sm text-muted-foreground">Complete the coding exercise to demonstrate your skills</p>
        </div>
      </div>
      
      {question.testCases && question.testCases.length > 0 && (
        <div className="p-4 border rounded-lg bg-muted/30">
          <p className="font-medium mb-2">Test Cases:</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {question.testCases.map((test, idx) => (
              <li key={idx}>{test}</li>
            ))}
          </ul>
        </div>
      )}
      
      {question.expectedOutput && (
        <div className="p-4 border rounded-lg bg-muted/30">
          <p className="font-medium mb-2">Expected Output:</p>
          <p className="text-sm font-mono">{question.expectedOutput}</p>
        </div>
      )}
      
      <Textarea
        placeholder="Write your code here..."
        className="min-h-[200px] font-mono text-sm"
        value={question.userAnswer as string || question.initialCode || '// Write your code here'}
        onChange={(e) => handleCodeChange(e.target.value)}
      />
    </div>
  );
};

export default CodeSandboxQuestion;
