
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { Question } from '../types';

interface DocumentAnalysisQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
}

const DocumentAnalysisQuestion: React.FC<DocumentAnalysisQuestionProps> = ({ 
  question, 
  onAnswerChange 
}) => {
  return (
    <div className="space-y-4">
      {question.documentUrl && (
        <div className="p-4 border rounded-lg flex items-center gap-3 bg-muted/50">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <p className="font-medium">Document for Analysis</p>
            <p className="text-sm text-muted-foreground">Review this document to answer the question</p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => window.open(question.documentUrl, '_blank')}>
            View
          </Button>
        </div>
      )}
      <Textarea
        placeholder="Type your analysis of the document..."
        className="min-h-[120px]"
        value={question.userAnswer as string || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
};

export default DocumentAnalysisQuestion;
