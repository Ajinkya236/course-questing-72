
import React from 'react';
import SummaryTool from './SummaryTool';
import QuizTool from './QuizTool';
import StudyGuideTool from './StudyGuideTool';
import ExamplesTool from './ExamplesTool';
import PodcastTool from './PodcastTool';
import ConceptMapTool from './ConceptMapTool';

interface LearningToolsGridProps {
  skillName: string;
  skillDescription: string;
  selectedProficiency: string;
  isBusy: boolean;
  onToolClick: (toolType: 'summary' | 'quiz' | 'study-guide' | 'examples') => void;
  onGeneratePodcast: () => void;
  hidePodcastButton: boolean;
}

const LearningToolsGrid: React.FC<LearningToolsGridProps> = ({
  skillName,
  skillDescription,
  selectedProficiency,
  isBusy,
  onToolClick,
  onGeneratePodcast,
  hidePodcastButton
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SummaryTool 
        onClick={() => onToolClick('summary')}
        disabled={isBusy}
      />
      
      <QuizTool
        onClick={() => onToolClick('quiz')} 
        disabled={isBusy}
      />

      <StudyGuideTool 
        onClick={() => onToolClick('study-guide')}
        disabled={isBusy}
      />

      <ExamplesTool 
        onClick={() => onToolClick('examples')}
        disabled={isBusy}
      />

      <PodcastTool 
        onClick={onGeneratePodcast}
        disabled={isBusy}
        hidden={hidePodcastButton}
      />
      
      <ConceptMapTool 
        skillName={skillName}
        skillDescription={skillDescription}
        proficiency={selectedProficiency}
      />
    </div>
  );
};

export default LearningToolsGrid;
