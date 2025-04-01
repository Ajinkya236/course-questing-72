
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { QuestionType, Question } from './types';

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

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Question {questionNumber} of {totalQuestions}</span>
          <span className="text-xs px-2 py-1 rounded bg-gray-100">
            {formatQuestionTypeLabel(question.type)}
          </span>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">{question.text}</h3>
        
        {question.type === 'multipleChoice' && (
          <RadioGroup
            value={question.userAnswer as string}
            onValueChange={onAnswerChange}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {question.type === 'trueFalse' && (
          <RadioGroup
            value={question.userAnswer as string}
            onValueChange={onAnswerChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="True" id="true" />
              <Label htmlFor="true">True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="False" id="false" />
              <Label htmlFor="false">False</Label>
            </div>
          </RadioGroup>
        )}
        
        {question.type === 'shortAnswer' && (
          <Textarea
            placeholder="Type your answer here..."
            className="min-h-[120px]"
            value={question.userAnswer as string || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
          />
        )}
        
        {question.type === 'fillInBlanks' && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm mb-2">Fill in the blank:</p>
            <Input
              type="text"
              placeholder="Your answer here..."
              value={question.userAnswer as string || ''}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="max-w-md"
            />
          </div>
        )}
        
        {question.type === 'videoResponse' && (
          <div className="space-y-4">
            {question.videoUrl && (
              <div className="aspect-video">
                <iframe
                  src={question.videoUrl}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <Textarea
              placeholder="Type your analysis of the video..."
              className="min-h-[120px]"
              value={question.userAnswer as string || ''}
              onChange={(e) => onAnswerChange(e.target.value)}
            />
          </div>
        )}
        
        {question.type === 'documentAnalysis' && (
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
        )}
        
        {/* Add support for other question types like matchTheFollowing, dragSequence, findHotspot */}
      </div>
    </div>
  );
};

export default AssessmentQuestion;
