
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface QuestionHintsProps {
  hints: string[];
  showHint: boolean;
}

const QuestionHints: React.FC<QuestionHintsProps> = ({ hints, showHint }) => {
  if (!showHint || hints.length === 0) return null;
  
  return (
    <Card className="mb-4 bg-blue-50 border-blue-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Hint
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 text-sm">
          {hints.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default QuestionHints;
