
import React from 'react';
import { ArrowRight, BookOpen, Award, CheckCircle2, Video, FileText, Users, Calendar, PenTool, Zap, Target, BarChart, LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  benefits: string[];
  icon?: React.ReactNode;
}

const LMSUpdatesPage = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const features: Feature[] = [
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
      benefits: ["Enhance Learning Retention Through Practical Resources: Learners reinforce their understanding by practicing with supplemental materials."],
      icon: <FileText className="text-primary h-5 w-5" />
    },
    {
      title: "Enrich Classroom Courses with Online Learning Modules",
      benefits: ["A seamless blend of live sessions and self-paced activities simplifies learning and enables effective monitoring of assessments and course completions. Classroom training is enhanced by integrating digital content, offering a more robust learning experience."],
      icon: <Video className="text-primary h-5 w-5" />
    },
    {
      title: "Facilitate Real-Time Collaboration in Live Sessions/Classroom Courses via JioMeet",
      benefits: ["Learners and instructors can collaborate live, increasing interaction and engagement.", "Support for joining live sessions on JioMeet."],
      icon: <Users className="text-primary h-5 w-5" />
    },
    {
      title: "Empower Live Session Instructors with Scheduling and Course completions, attendance and Score tracking",
      benefits: ["Instructors gain greater control over course management and can monitor performance in real time."],
      icon: <Calendar className="text-primary h-5 w-5" />
    },
    {
      title: "Deliver a Frictionless User Experience with improved UI and reduced friction in user journeys on the Learner Portal.",
      benefits: ["A streamlined learner portal minimizes unnecessary steps, ensuring a smooth and intuitive experience."],
      icon: <PenTool className="text-primary h-5 w-5" />
    },
    {
      title: "Align Learning with My Development Goals. \"My Learning Goals\" section that allows learners and managers to assign target courses and allows managers to track progress.",
      benefits: ["Learning programs are directly tied to individual and manager objectives, motivating learners with clear progress and recognition"],
      icon: <Target className="text-primary h-5 w-5" />
    },
    {
      title: "Alternate learning journey options offering flexibility through features like time gaps, backward navigation, question skipping, and configurable attempt limits.",
      benefits: ["Accommodates diverse learning needs by allowing personalized, flexible training paths."],
      icon: <BarChart className="text-primary h-5 w-5" />
    },
    {
      title: "Integration with external applications (such as PeopleFirst or partner apps) to deliver MicroLearning courses on apps employees already use.",
      benefits: ["Enables bite-sized, on-the-go learning that fits seamlessly into daily routines."],
      icon: <Zap className="text-primary h-5 w-5" />
    },
    {
      title: "A dedicated mentoring feature that supports social learning and tacit knowledge sharing.",
      benefits: ["Enhances employee engagement and fosters a collaborative, supportive learning culture."],
      icon: <Users className="text-primary h-5 w-5" />
    },
    {
      title: "\"Learning Events\" functionality enabling admins to create customized events with self-learning and blended options, including learning project evaluations.",
      benefits: ["Delivers tailored learning experiences that address specific training needs through a mix of self-paced and collaborative methods."],
      icon: <Calendar className="text-primary h-5 w-5" />
    },
    {
      title: "Auto LMS role assignment based on job roles as configured by the administrator.",
      benefits: ["Streamlines administrative tasks by ensuring employees receive the appropriate training content automatically."],
      icon: <CheckCircle2 className="text-primary h-5 w-5" />
    },
    {
      title: "Deeplinks that send learners directly to specific pages (e.g., compliance training).",
      benefits: ["Saves time and enhances efficiency by eliminating extra navigation steps to access relevant content."],
      icon: <ArrowRight className="text-primary h-5 w-5" />
    },
    {
      title: "Self-Certify functionality allowing employees to self-assess and validate their role readiness.",
      benefits: ["Empowers employees to demonstrate preparedness for new roles, promoting accountability and professional growth."],
      icon: <Award className="text-primary h-5 w-5" />
    },
    {
      title: "Target Audience creation for course assignment and visibility, coupled with employee data integration with OIAM and PeopleFirst and enhanced course tagging configurations.",
      benefits: ["Ensures the right content reaches the right audience without clutter, enabling a more personalized and effective learning experience"],
      icon: <Target className="text-primary h-5 w-5" />
    },
    {
      title: "Proctored Assessments, System captures cheating attempts by the end user.",
      benefits: ["Authenticity of learning completions"],
      icon: <CheckCircle2 className="text-primary h-5 w-5" />
    }
  ];

  return (
    <div className="bg-[#f7f6f1] min-h-screen">
      {/* Header with Newsletter title */}
      <div className="w-full bg-[#f7f6f1] border-b border-gray-300">
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-6xl font-bold text-[#231f20]">NEWSLETTER</h1>
            <div className="text-right">
              <p className="text-gray-600">{formattedDate}</p>
              <p className="text-gray-600">+123-456-7890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content columns */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            {/* Image 1 */}
            <div className="w-full h-[400px] bg-gray-200">
              <img 
                src="/lovable-uploads/9bd6242a-53de-4b5a-b53e-4a485d52c933.png" 
                alt="Office building" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Our Goals This Week section */}
            <div className="bg-[#324c7d] text-white p-8">
              <h2 className="text-2xl font-bold mb-6">OUR GOALS THIS WEEK</h2>
              <div className="text-white space-y-4">
                <p>Our Learning Management System (LMS) has undergone significant updates to enhance the learning experience for all users. These improvements focus on interactive features, flexibility, and accessibility.</p>
                <p>The new features are designed to streamline the learning process and make knowledge more accessible throughout the organization.</p>
                <p>Explore all the new capabilities that will transform how you engage with content, track progress, and achieve your learning goals.</p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="w-full h-[300px] bg-gray-200">
              <img 
                src="/lovable-uploads/b5470f04-473f-42f4-a288-e990775acac3.png" 
                alt="Team collaboration" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* The News section */}
            <div className="bg-[#324c7d] text-white p-8">
              <h2 className="text-2xl font-bold mb-6">THE NEWS</h2>
              <div className="text-white space-y-4">
                <p>Our enhanced LMS delivers a seamless learning environment with powerful new tools and capabilities. From interactive content to personalized learning paths, these updates bring flexibility and engagement to the forefront of your professional development.</p>
                <p>The platform now supports a wider range of content types, evaluation methods, and collaborative features designed to make learning more effective and engaging.</p>
                <p>Explore the details below to discover how these features can transform your learning journey.</p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="w-full h-[300px] bg-gray-200">
              <img 
                src="/lovable-uploads/7fa0a67a-4873-42ad-9abb-953c60322b3c.png" 
                alt="Team working" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Our Strategy section */}
            <div className="bg-[#324c7d] text-white p-8">
              <h2 className="text-2xl font-bold mb-6">OUR STRATEGY</h2>
              <div className="text-white space-y-4">
                <p>Our strategy focuses on providing a comprehensive learning ecosystem that supports various learning styles and organizational needs. By integrating advanced features and streamlining user experiences, we aim to make learning more accessible and effective.</p>
                <p>The updated platform supports both self-paced and guided learning, with tools for tracking progress, collaborating with peers, and demonstrating competency.</p>
                <p>These enhancements reflect our commitment to continuous improvement and our dedication to supporting your professional growth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-[#231f20]">LMS FEATURE UPDATES</h2>
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mt-1">
                    {feature.icon || <Award className="text-primary h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{feature.title}</h3>
                    {feature.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} className="flex items-start gap-2 mb-2">
                        <ArrowRight className="text-primary h-4 w-4 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSUpdatesPage;
