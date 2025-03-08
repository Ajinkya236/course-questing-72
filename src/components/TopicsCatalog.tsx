
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface Topic {
  id: string;
  name: string;
  courseCount: number;
  icon: string;
}

const topics: Topic[] = [
  { id: '1', name: 'Leadership', courseCount: 42, icon: '👑' },
  { id: '2', name: 'Data Analysis', courseCount: 37, icon: '📊' },
  { id: '3', name: 'Programming', courseCount: 56, icon: '💻' },
  { id: '4', name: 'Marketing', courseCount: 29, icon: '📈' },
  { id: '5', name: 'Design', courseCount: 24, icon: '🎨' },
  { id: '6', name: 'Product Management', courseCount: 31, icon: '🚀' },
  { id: '7', name: 'Finance', courseCount: 18, icon: '💰' },
  { id: '8', name: 'Communication', courseCount: 22, icon: '🗣️' },
  { id: '9', name: 'AI & Machine Learning', courseCount: 33, icon: '🤖' },
  { id: '10', name: 'Project Management', courseCount: 27, icon: '📋' },
  { id: '11', name: 'Business Strategy', courseCount: 19, icon: '🏆' },
  { id: '12', name: 'Innovation', courseCount: 15, icon: '💡' },
];

const TopicsCatalog: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleTopicClick = (topicId: string) => {
    navigate(`/view-all/topics/${topicId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Topics Catalog</h2>
        <Button variant="link" size="sm" className="gap-1" onClick={() => navigate('/view-all/topics')}>
          View All
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {topics.map((topic) => (
          <Card 
            key={topic.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleTopicClick(topic.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="text-3xl mb-2">{topic.icon}</div>
              <h3 className="font-medium text-sm">{topic.name}</h3>
              <p className="text-xs text-muted-foreground">{topic.courseCount} courses</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicsCatalog;
