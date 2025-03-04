
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Clock, Download } from 'lucide-react';

const CourseTranscriptTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock transcript data
  const transcriptSegments = [
    {
      time: "00:00",
      content: "Welcome to our Leadership Development course. I'm Dr. Rajiv Kumar, and I'll be your instructor for this journey into effective leadership."
    },
    {
      time: "00:15",
      content: "In this course, we'll explore the essential skills that make great leaders, and how you can apply these in your daily work."
    },
    {
      time: "00:30",
      content: "Leadership isn't just about telling others what to do - it's about inspiring, guiding, and empowering your team to achieve their best."
    },
    {
      time: "00:45",
      content: "We'll start by examining what leadership truly means in today's rapidly changing business environment."
    },
    {
      time: "01:00",
      content: "The first module covers foundational leadership principles that have stood the test of time."
    },
    {
      time: "01:15",
      content: "We'll discuss how great leaders balance strategic vision with tactical execution."
    },
    {
      time: "01:30",
      content: "You'll learn about different leadership styles, and how to adapt your approach depending on the situation and the needs of your team."
    },
    {
      time: "01:45",
      content: "Throughout this course, we'll use real-world examples and case studies to make these concepts practical and applicable."
    },
    {
      time: "02:00",
      content: "Leadership requires emotional intelligence - understanding yourself and others."
    },
    {
      time: "02:15",
      content: "We'll explore how to develop greater self-awareness and empathy, which are critical for effective leadership."
    },
    {
      time: "02:30",
      content: "Communication is perhaps the most important skill for any leader. We'll cover how to communicate with clarity, purpose, and impact."
    },
    {
      time: "02:45",
      content: "You'll learn techniques for active listening, delivering feedback, and having difficult conversations."
    },
    {
      time: "03:00",
      content: "Another key aspect of leadership is decision-making. We'll discuss frameworks for making better decisions, especially under pressure."
    },
    {
      time: "03:15",
      content: "You'll also learn how to involve your team in decisions appropriately, which can lead to better outcomes and stronger buy-in."
    },
    {
      time: "03:30",
      content: "Building and leading high-performing teams is a core focus of this course."
    },
  ];
  
  // Filter transcript based on search query
  const filteredTranscript = searchQuery
    ? transcriptSegments.filter(segment => 
        segment.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transcriptSegments;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">AI-Generated Transcript</h3>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search transcript..." 
          className="pl-10"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredTranscript.map((segment, index) => (
          <div 
            key={index} 
            className={`flex gap-4 p-2 rounded hover:bg-secondary/30 transition-colors ${
              searchQuery && segment.content.toLowerCase().includes(searchQuery.toLowerCase())
                ? 'bg-primary/10'
                : ''
            }`}
          >
            <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
              <Clock className="h-3 w-3" />
              <span>{segment.time}</span>
            </div>
            <p className="text-sm flex-1">{segment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseTranscriptTab;
