
import React from 'react';
import { ArrowRight, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LMSUpdatesPage = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const features = [
    {
      title: "OJT and VBA evaluations—videos, documents, and learning projects are assessed by evaluator roles and L1 managers.",
      benefits: ["Maximize On-the-Job Application of Skills: Employees can immediately apply what they learn, ensuring that training translates into real-world performance"],
      icon: <CheckCircle2 className="text-primary h-5 w-5" />
    },
    {
      title: "Enabled H5P activities including video activities, MCQs from multiple question banks, image sequences, drag-and-drop, and interactive videos.",
      benefits: ["Elevate Learner Engagement and Reduce Drop-Offs: Interactive, scenario-based activities cater to diverse learning styles, keeping learners actively engaged."],
      icon: <BookOpen className="text-primary h-5 w-5" />
    },
    {
      title: "Administrators can add reference documents—guide videos, exercise files, and notes—to courses and learning paths.",
      benefits: ["Enhance Learning Retention Through Practical Resources: Learners reinforce their understanding by practicing with supplemental materials."]
    },
    {
      title: "Enrich Classroom Courses with Online Learning Modules",
      benefits: ["A seamless blend of live sessions and self-paced activities simplifies learning and enables effective monitoring of assessments and course completions."]
    },
    {
      title: "Facilitate Real-Time Collaboration in Live Sessions/Classroom Courses via JioMeet",
      benefits: ["Learners and instructors can collaborate live, increasing interaction and engagement."]
    },
    {
      title: "Target Audience creation for course assignment and visibility, coupled with employee data integration",
      benefits: ["Ensures the right content reaches the right audience without clutter, enabling a more personalized and effective learning experience."]
    },
    {
      title: "Self-Certify functionality allowing employees to self-assess and validate their role readiness.",
      benefits: ["Empowers employees to demonstrate preparedness for new roles, promoting accountability and professional growth."]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-950 overflow-auto">
      {/* Header with blue and orange accents */}
      <div className="relative">
        {/* Left blue bar */}
        <div className="absolute left-0 top-0 w-16 h-full bg-blue-800"></div>
        
        {/* Orange accent bar */}
        <div className="absolute left-16 top-0 w-4 h-full bg-orange-400"></div>
        
        <div className="pl-24 pr-6 pt-10 pb-6">
          <div className="flex justify-between items-center">
            <div className="text-blue-900 dark:text-blue-300 font-bold">{formattedDate}</div>
            <div className="text-gray-600 dark:text-gray-400">peoplefirst.lms</div>
          </div>
          
          <div className="mt-6">
            <div className="text-gray-700 dark:text-gray-300 tracking-wider font-semibold">PEOPLEFIRST LEARNING PLATFORM</div>
            <div className="flex items-center mt-2">
              <h1 className="text-6xl font-bold text-blue-800 dark:text-blue-400">NEWSLETTER</h1>
              <div className="ml-4 flex-grow">
                <div className="h-1 bg-orange-400"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-800 text-white p-8 rounded-sm animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">LMS Feature Updates</h2>
              
              <div className="text-lg">
                <p className="mb-4">Our updated Learning Management System introduces powerful new features designed to enhance the learning experience for all users.</p>
                <p className="mb-4">These improvements focus on interactivity, flexibility, and making knowledge more accessible throughout the organization.</p>
                <p>Learn about all the new ways to engage with content, track progress, and achieve your learning goals.</p>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold flex items-center text-gray-800 dark:text-gray-200 mb-4">
                <span className="w-3 h-3 rounded-full bg-blue-800 mr-2"></span>
                Elevate Your Learning Experience
              </h3>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Our enhanced LMS delivers a seamless learning environment with powerful new tools and capabilities.</p>
                <p>From interactive content to personalized learning paths, these updates bring flexibility and engagement to the forefront of your professional development.</p>
                <p>Explore the details below to discover how these features can transform your learning journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto pl-24 pr-6 py-8">
        <div className="space-y-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card hover:shadow-md transition-all duration-300 rounded-lg p-6 border border-border animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  {feature.icon || <Award className="text-primary h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-medium text-lg text-foreground mb-3">{feature.title}</h3>
                  
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-2">
                        <ArrowRight className="text-primary h-4 w-4 mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-400">Learn More About LMS Updates</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Want to stay informed about future updates and get the most out of your LMS experience?</p>
            <div className="text-orange-500 font-medium">Visit our learning portal for detailed documentation</div>
          </div>
          
          <div>
            <img 
              src="/lovable-uploads/b5470f04-473f-42f4-a288-e990775acac3.png" 
              alt="Team collaboration" 
              className="w-full h-48 object-cover rounded-md" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSUpdatesPage;
