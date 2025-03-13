
import React from 'react';

const AboutPlatformSection = () => {
  return (
    <div className="bg-card rounded-lg p-6 border mb-10">
      <h2 className="text-2xl font-semibold mb-4">About the Platform</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground mb-4">
            Jio Learning is a comprehensive learning management system designed to help employees develop new skills, 
            enhance existing capabilities, and grow professionally. Our platform offers a wide range of courses from 
            technical skills to leadership development.
          </p>
          <p className="text-muted-foreground mb-4">
            With personalized recommendations, skill-based learning paths, and interactive content, 
            you can take control of your professional development journey and track your progress along the way.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Personalized course recommendations</li>
            <li>Role-based learning paths</li>
            <li>Interactive video content</li>
            <li>Skill proficiency tracking</li>
            <li>Mentoring opportunities</li>
            <li>Achievement badges and certifications</li>
            <li>Learning community and forums</li>
            <li>Team learning management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPlatformSection;
