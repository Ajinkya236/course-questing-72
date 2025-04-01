
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AssessmentAttempt, Question, QuestionType } from './types';

interface AssessmentHistoryProps {
  attempts: AssessmentAttempt[];
  passRate: number;
}

const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({ attempts, passRate }) => {
  const [selectedAttempt, setSelectedAttempt] = useState<AssessmentAttempt | null>(null);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
      default: return type;
    }
  };

  const handleViewAttempt = (attempt: AssessmentAttempt) => {
    setSelectedAttempt(attempt);
  };

  if (attempts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No previous attempts found.</p>
        <p className="text-sm mt-2">Complete an assessment to see your history.</p>
      </div>
    );
  }

  if (selectedAttempt) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setSelectedAttempt(null)} className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to attempts
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-medium">Score:</span>
            <span className={`px-3 py-1 rounded-full ${selectedAttempt.score >= passRate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {selectedAttempt.score}% {selectedAttempt.passed ? '(Passed)' : '(Failed)'}
            </span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Attempt date:</span> {formatDate(selectedAttempt.date)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Skill:</span> {selectedAttempt.skillName}
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {selectedAttempt.questions.map((question, index) => (
              <AccordionItem key={`history-${question.id}`} value={`history-question-${question.id}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>Question {index + 1}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      question.userAnswer === question.correctAnswer 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {question.userAnswer === question.correctAnswer ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 border-t">
                  <div className="space-y-3">
                    <p className="font-medium">{question.text}</p>
                    <p className="text-xs text-muted-foreground mb-2">{formatQuestionTypeLabel(question.type)}</p>
                    
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-sm font-medium mb-1">Your answer:</p>
                      <p className="text-sm">{question.userAnswer || "No answer provided"}</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm font-medium mb-1 text-green-700">Correct answer:</p>
                      <p className="text-sm">{question.correctAnswer || "Not specified"}</p>
                    </div>
                    
                    {question.explanation && (
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium mb-1 text-blue-700">Explanation:</p>
                        <p className="text-sm">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Previous Attempts</h3>
      
      <div className="space-y-4">
        {attempts.map((attempt) => (
          <div 
            key={attempt.id}
            className="border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
            onClick={() => handleViewAttempt(attempt)}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{formatDate(attempt.date)}</p>
              <div className={`px-3 py-1 text-sm rounded-full ${
                attempt.score >= passRate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {attempt.score}% {attempt.passed ? '(Passed)' : '(Failed)'}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {attempt.questions.length} questions • Click to view details
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentHistory;
