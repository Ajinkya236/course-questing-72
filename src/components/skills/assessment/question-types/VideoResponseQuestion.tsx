
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Question } from '../types';

interface VideoResponseQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
}

const VideoResponseQuestion: React.FC<VideoResponseQuestionProps> = ({ 
  question, 
  onAnswerChange 
}) => {
  return (
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
  );
};

export default VideoResponseQuestion;
