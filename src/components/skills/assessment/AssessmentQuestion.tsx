
import React, { useState } from 'react';
import { Question, QuestionFeedback } from './types';
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
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

interface AssessmentQuestionProps {
  question: Question;
  onAnswerChange: (answer: string | string[]) => void;
  questionNumber: number;
  totalQuestions: number;
  isSubmitting?: boolean;
  feedback?: QuestionFeedback;
  onSubmitAnswer?: () => void;
  showSubmitButton?: boolean;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  onAnswerChange,
  questionNumber,
  totalQuestions,
  isSubmitting = false,
  feedback,
  onSubmitAnswer,
  showSubmitButton = false
}) => {
  const [showHint, setShowHint] = useState(false);
  const hasHints = question.hints && question.hints.length > 0;
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Question {questionNumber} of {totalQuestions}</span>
          <div className="flex gap-2 items-center">
            {hasHints && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowHint(!showHint)} 
                className="flex items-center gap-1"
              >
                <HelpCircle className="h-4 w-4" />
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
            )}
            <QuestionTypeLabel type={question.type} />
            {question.difficulty && (
              <span className={`text-xs px-2 py-1 rounded ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {hasHints && showHint && (
        <Card className="mb-4 bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Hint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm">
              {question.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">{question.text}</h3>
        
        {/* Render the appropriate question component based on type */}
        {question.type === 'multipleChoice' && (
          <MultipleChoiceQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
            disabled={isSubmitting || !!feedback}
          />
        )}
        
        {question.type === 'trueFalse' && (
          <TrueFalseQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
            disabled={isSubmitting || !!feedback}
          />
        )}
        
        {question.type === 'shortAnswer' && (
          <ShortAnswerQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
            disabled={isSubmitting || !!feedback}
          />
        )}
        
        {question.type === 'fillInBlanks' && (
          <FillInBlanksQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
            disabled={isSubmitting || !!feedback}
          />
        )}
        
        {question.type === 'videoResponse' && (
          <VideoResponseQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
            disabled={isSubmitting || !!feedback}
          />
        )}
        
        {question.type === 'documentAnalysis' && (
          <DocumentAnalysisQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
            disabled={isSubmitting || !!feedback}
          />
        )}
        
        {question.type === 'codeSandbox' && (
          <CodeSandboxQuestion 
            question={question} 
            onAnswerChange={(answer) => onAnswerChange(answer)} 
            disabled={isSubmitting || !!feedback}
          />
        )}
        
        {/* Show feedback if available */}
        {feedback && (
          <Card className={`mt-4 ${feedback.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                {feedback.correct ? 
                  <><CheckCircle className="h-5 w-5 text-green-600" /> Correct!</> : 
                  <><XCircle className="h-5 w-5 text-red-600" /> Incorrect</>
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>{feedback.explanation}</p>
                
                {!feedback.correct && feedback.improvement && (
                  <div className="mt-2">
                    <p className="font-medium text-sm">How to improve:</p>
                    <p className="text-sm">{feedback.improvement}</p>
                  </div>
                )}
                
                {feedback.nextSteps && feedback.nextSteps.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium text-sm">Next steps:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {feedback.nextSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Show submit button for adaptive assessment */}
        {showSubmitButton && (
          <div className="mt-4">
            <Button 
              onClick={onSubmitAnswer} 
              disabled={isSubmitting || !question.userAnswer || !!feedback}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Evaluating...
                </>
              ) : feedback ? "Answered" : "Submit Answer"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentQuestion;
