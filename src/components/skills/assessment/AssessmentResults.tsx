
import React from 'react';
import { Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Question } from './types';

interface AssessmentResultsProps {
  score: number;
  passRate: number;
  questions: Question[];
  onRetry: () => void;
  onBack: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  score,
  passRate,
  questions,
  onRetry,
  onBack
}) => {
  const passed = score >= passRate;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`w-32 h-32 rounded-full border-8 ${passed ? 'border-green-500' : 'border-amber-500'} flex items-center justify-center mb-6`}>
        <span className="text-3xl font-bold">{score}%</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-center font-archivo-black text-gray-700">Assessment Complete</h2>
      
      {passed ? (
        <div className="text-center mb-6">
          <p className="text-green-600 font-medium text-lg mb-2">Congratulations!</p>
          <p>You have successfully demonstrated proficiency in this skill.</p>
          <div className="mt-4 flex items-center justify-center">
            <Award className="h-6 w-6 text-green-500 mr-2" />
            <span className="font-medium">Skill Badge Earned</span>
          </div>
        </div>
      ) : (
        <div className="text-center mb-6">
          <p className="text-amber-600 font-medium text-lg mb-2">Keep Learning</p>
          <p>You need {passRate}% to pass. Review the materials and try again.</p>
        </div>
      )}
      
      <div className="flex gap-4 mt-4">
        <Button onClick={onBack} variant="outline">
          Return to Skill
        </Button>
        <Button onClick={onRetry}>
          Retry Assessment
        </Button>
      </div>
      
      <div className="w-full mt-8">
        <Separator className="my-4" />
        <h3 className="text-lg font-semibold mb-4">Review Your Answers</h3>
        
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => (
            <AccordionItem key={question.id} value={`question-${question.id}`}>
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
};

export default AssessmentResults;
