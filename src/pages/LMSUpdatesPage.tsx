import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Award, CheckCircle2 } from "lucide-react";

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
      title: "Enabled H5P activities including video activities (via an external Wowza media server), MCQs from multiple question banks, image sequences, drag-and-drop, find-the-hotspot, guess-the-answer, image hotspots, and interactive videos.",
      benefits: ["Elevate Learner Engagement and Reduce Drop-Offs: Interactive, scenario-based activities cater to diverse learning styles, keeping learners actively engaged."],
      icon: <BookOpen className="text-primary h-5 w-5" />
    },
    {
      title: "Administrators can add reference documents—guide videos, exercise files, and notes—to courses and learning paths.",
      benefits: ["Enhance Learning Retention Through Practical Resources: Learners reinforce their understanding by practicing with supplemental materials."]
    },
    {
      title: "Enrich Classroom Courses with Online Learning Modules",
      benefits: ["A seamless blend of live sessions and self-paced activities simplifies learning and enables effective monitoring of assessments and course completions. Classroom training is enhanced by integrating digital content, offering a more robust learning experience."]
    },
    {
      title: "Facilitate Real-Time Collaboration in Live Sessions/Classroom Courses via JioMeet",
      benefits: ["Learners and instructors can collaborate live, increasing interaction and engagement.", "Support for joining live sessions on JioMeet."]
    },
    {
      title: "Empower Live Session Instructors with Scheduling and Course completions, attendance and Score tracking",
      benefits: ["Instructors gain greater control over course management and can monitor performance in real time."]
    },
    {
      title: "Deliver a Frictionless User Experience with improved UI and reduced friction in user journeys on the Learner Portal.",
      benefits: ["A streamlined learner portal minimizes unnecessary steps, ensuring a smooth and intuitive experience."]
    },
    {
      title: "Align Learning with My Development Goals. \"My Learning Goals\" section that allows learners and managers to assign target courses and allows managers to track progress.",
      benefits: ["Learning programs are directly tied to individual and manager objectives, motivating learners with clear progress and recognition."]
    },
    {
      title: "Alternate learning journey options offering flexibility through features like time gaps, backward navigation, question skipping, and configurable attempt limits.",
      benefits: ["Accommodates diverse learning needs by allowing personalized, flexible training paths."]
    },
    {
      title: "Integration with external applications (such as PeopleFirst or partner apps) to deliver MicroLearning courses on apps employees already use.",
      benefits: ["Enables bite-sized, on-the-go learning that fits seamlessly into daily routines."]
    },
    {
      title: "A dedicated mentoring feature that supports social learning and tacit knowledge sharing.",
      benefits: ["Enhances employee engagement and fosters a collaborative, supportive learning culture."]
    },
    {
      title: "\"Learning Events\" functionality enabling admins to create customized events with self-learning and blended options, including learning project evaluations.",
      benefits: ["Delivers tailored learning experiences that address specific training needs through a mix of self-paced and collaborative methods."]
    },
    {
      title: "Auto LMS role assignment based on job roles as configured by the administrator.",
      benefits: ["Streamlines administrative tasks by ensuring employees receive the appropriate training content automatically."]
    },
    {
      title: "Deeplinks that send learners directly to specific pages (e.g., compliance training).",
      benefits: ["Saves time and enhances efficiency by eliminating extra navigation steps to access relevant content."]
    },
    {
      title: "Self-Certify functionality allowing employees to self-assess and validate their role readiness.",
      benefits: ["Empowers employees to demonstrate preparedness for new roles, promoting accountability and professional growth."]
    },
    {
      title: "Target Audience creation for course assignment and visibility, coupled with employee data integration with OIAM and PeopleFirst and enhanced course tagging configurations.",
      benefits: ["Ensures the right content reaches the right audience without clutter, enabling a more personalized and effective learning experience."]
    },
    {
      title: "Proctored Assessments, System captures cheating attempts by the end user.",
      benefits: ["Authenticity of learning completions."]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-950">
      {/* Header section based on the reference image */}
      <div className="relative">
        {/* Left blue bar */}
        <div className="absolute left-0 top-0 w-16 h-full bg-blue-800"></div>
        
        {/* Orange accent bar */}
        <div className="absolute left-16 top-0 w-4 h-full bg-orange-400"></div>
        
        <div className="container mx-auto pt-14 pb-6 pl-24">
          <div className="flex justify-between items-center">
            <div className="text-blue-900 font-bold">{formattedDate}</div>
            <div className="text-gray-600">peoplefirst.lms</div>
          </div>
          
          <div className="mt-8">
            <div className="text-gray-700 tracking-wider font-semibold">PEOPLEFIRST LEARNING PLATFORM</div>
            <div className="flex items-center mt-2">
              <h1 className="text-6xl font-bold text-blue-800">NEWSLETTER</h1>
              <div className="ml-4 flex-grow">
                <div className="h-1 bg-orange-400"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-800 text-white p-8 rounded-sm animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">LMS Feature Updates</h2>
              
              <div className="text-lg">
                <p className="mb-4">Our updated Learning Management System introduces powerful new features designed to enhance the learning experience for all users.</p>
                <p className="mb-4">These improvements focus on interactivity, flexibility, and making knowledge more accessible throughout the organization.</p>
                <p>Learn about all the new ways to engage with content, track progress, and achieve your learning goals.</p>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold flex items-center text-gray-800 mb-4">
                <span className="w-3 h-3 rounded-full bg-blue-800 mr-2"></span>
                Elevate Your Learning Experience
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p>Our enhanced LMS delivers a seamless learning environment with powerful new tools and capabilities.</p>
                <p>From interactive content to personalized learning paths, these updates bring flexibility and engagement to the forefront of your professional development.</p>
                <p>Explore the details below to discover how these features can transform your learning journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content scrollable area */}
      <ScrollArea className="h-[calc(100vh-450px)] container mx-auto pl-24 py-8">
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
              
              {index < features.length - 1 && (
                <Separator className="mt-6 opacity-50" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-800">Learn More About LMS Updates</h3>
            <p className="text-gray-700 mb-4">Want to stay informed about future updates and get the most out of your LMS experience?</p>
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
      </ScrollArea>
    </div>
  );
};

export default LMSUpdatesPage;
