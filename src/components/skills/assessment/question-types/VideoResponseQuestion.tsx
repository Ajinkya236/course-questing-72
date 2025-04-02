import React from 'react';
import { Question } from '../types';

export interface VideoResponseQuestionProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean; // Added disabled prop
}

const VideoResponseQuestion: React.FC<VideoResponseQuestionProps> = ({ 
  question, 
  onAnswerChange,
  disabled = false // Default to false
}) => {
  return (
    <div>
      {question.videoUrl && (
        <div className="relative w-full mb-4 rounded-lg overflow-hidden aspect-video">
          <iframe
            src={question.videoUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <textarea
        className="w-full min-h-[120px] p-3 border rounded-lg"
        value={(question.userAnswer as string) || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="After watching the video, type your response here..."
        disabled={disabled}
      />
    </div>
  );
};

export default VideoResponseQuestion;
