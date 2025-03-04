
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

// Mock transcript data
const mockTranscript = `
00:00 - 00:15: Welcome to the Leadership for New Managers course. In this course, we'll be exploring the essential skills that first-time managers need to develop to lead their teams effectively.

00:16 - 00:45: Let's start by discussing what leadership actually means. Leadership is not just about giving orders or making decisions. It's about inspiring others, setting a clear vision, and helping your team achieve their goals.

00:46 - 01:30: One of the biggest challenges new managers face is the transition from being an individual contributor to leading others. You're no longer just responsible for your own work, but for the success of your entire team.

01:31 - 02:15: The first principle we'll explore is self-awareness. Understanding your own strengths, weaknesses, and leadership style is crucial for effective leadership. Take a moment to reflect on what you believe are your key strengths as a leader.

02:16 - 03:00: Communication is perhaps the most important skill for any leader. Clear, consistent communication builds trust and ensures everyone understands expectations. We'll be diving deep into communication strategies throughout this course.

03:01 - 03:45: Another key aspect is delegation. Many new managers struggle with letting go of tasks they used to handle themselves. We'll discuss how to delegate effectively while still maintaining quality.

03:46 - 04:30: Team development is also crucial. As a leader, your success is measured by the success of your team. We'll explore strategies for developing each team member's skills and creating growth opportunities.

04:31 - 05:15: Finally, we'll talk about decision-making frameworks that can help you make sound judgments even when facing uncertainty or complex situations.

05:16 - 06:00: By the end of this course, you'll have a toolbox of practical leadership techniques that you can immediately apply in your role as a new manager.
`;

const formatTranscript = (transcript: string) => {
  return transcript.trim().split('\n\n').filter(Boolean);
};

const CourseTranscriptTab: React.FC = () => {
  const transcriptParagraphs = formatTranscript(mockTranscript);
  
  const handleDownload = () => {
    // In a real app, we would generate and download the transcript file
    toast.success('Transcript downloaded successfully');
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">AI-Generated Transcript</h2>
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" /> Download
        </Button>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 border">
        <ScrollArea className="h-[400px] pr-4">
          {transcriptParagraphs.map((paragraph, index) => {
            const [timeStamp, content] = paragraph.split(': ');
            
            return (
              <div key={index} className="mb-4">
                <span className="text-sm font-medium text-primary block">{timeStamp}</span>
                <p className="text-muted-foreground">{content}</p>
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
};

export default CourseTranscriptTab;
