
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Search, FilePdf, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Mock FAQ Data
const generalFaqData = [
  {
    id: 'gen-1',
    question: 'How do I access my learning dashboard?',
    answer: 'You can access your learning dashboard by clicking on the "My Learning" tab in the navigation bar at the top of the page. This will take you to your personalized dashboard where you can track your progress, view assigned courses, and more.',
    type: 'text'
  },
  {
    id: 'gen-2',
    question: 'How do I track my learning progress?',
    answer: 'Your learning progress is automatically tracked as you complete courses. You can view your progress on the "My Learning" page, which shows completion percentages for each course you\'ve started. You can also view badges and certifications you\'ve earned.',
    type: 'text'
  },
  {
    id: 'gen-3',
    question: 'How do I download my course certificates?',
    answer: 'Download our PDF guide for detailed instructions on accessing and downloading your certificates.',
    type: 'pdf',
    url: '/documents/certificates-guide.pdf'
  },
  {
    id: 'gen-4',
    question: 'How do I set up my learning goals?',
    answer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'video'
  }
];

const courseFaqData = [
  {
    id: 'course-1',
    question: 'How do I enroll in a course?',
    answer: 'To enroll in a course, navigate to the course page by browsing the catalog or using the search function. On the course page, click the "Enroll" button. The course will be added to your "My Learning" section and you can start it immediately.',
    type: 'text'
  },
  {
    id: 'course-2',
    question: 'Can I download course materials for offline use?',
    answer: 'Yes, many courses offer downloadable resources. When available, you\'ll find a download option in the course sidebar or at the end of a lesson. Downloads may include PDFs, worksheets, or code samples depending on the course content.',
    type: 'text'
  },
  {
    id: 'course-3',
    question: 'How to navigate course content',
    answer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'video'
  },
  {
    id: 'course-4',
    question: 'Course completion requirements explained',
    answer: '/documents/completion-requirements.pdf',
    type: 'pdf',
    url: '/documents/completion-requirements.pdf'
  }
];

const videoTutorialsData = [
  {
    id: 'vid-1',
    question: 'How to use the mentoring platform',
    answer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'video'
  },
  {
    id: 'vid-2',
    question: 'Getting started with team learning',
    answer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'video'
  },
  {
    id: 'vid-3',
    question: 'How to claim your learning rewards',
    answer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'video'
  },
  {
    id: 'vid-4',
    question: 'Tips for effective learning strategies',
    answer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'video'
  }
];

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  
  // Filter FAQs based on search query
  const filterFaqs = (faqs: any[]) => {
    if (!searchQuery.trim()) return faqs;
    
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const filteredGeneralFaqs = filterFaqs(generalFaqData);
  const filteredCourseFaqs = filterFaqs(courseFaqData);
  const filteredVideoTutorials = filterFaqs(videoTutorialsData);
  
  // Render appropriate content based on FAQ type
  const renderFaqContent = (faq: any) => {
    switch(faq.type) {
      case 'text':
        return (
          <div className="text-sm text-muted-foreground">
            <FileText className="h-4 w-4 inline-block mr-2" />
            {faq.answer}
          </div>
        );
      case 'pdf':
        return (
          <div>
            <a 
              href={faq.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-primary hover:underline"
            >
              <FilePdf className="h-5 w-5 mr-2" />
              View PDF Document
            </a>
          </div>
        );
      case 'video':
        return (
          <div className="mt-4">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={faq.answer}
                title={faq.question}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md w-full h-full"
              ></iframe>
            </AspectRatio>
          </div>
        );
      default:
        return <p>{faq.answer}</p>;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>FAQ | Jio Learning</title>
      </Helmet>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">Find answers to common questions about using the Jio Learning platform.</p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="courses">Course-related</TabsTrigger>
            <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            {filteredGeneralFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredGeneralFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {renderFaqContent(faq)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Search className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="courses">
            {filteredCourseFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredCourseFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {renderFaqContent(faq)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Search className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="videos">
            {filteredVideoTutorials.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredVideoTutorials.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {renderFaqContent(faq)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Search className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default FAQ;
