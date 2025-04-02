
import React from 'react';
import { QuestionFeedback } from '../types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionFeedbackCardProps {
  feedback: QuestionFeedback;
}

const QuestionFeedbackCard: React.FC<QuestionFeedbackCardProps> = ({ feedback }) => {
  if (!feedback) return null;
  
  return (
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
  );
};

export default QuestionFeedbackCard;
