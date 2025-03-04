
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  AlertCircle, 
  ChevronRight,
  BookOpen,
  AlertTriangle
} from 'lucide-react';

// Mock data for role skills
const roleSkillsData = [
  {
    id: "role-skill-1",
    name: "Strategic Product Planning",
    description: "Ability to define product vision, strategy and roadmap",
    category: "Product Management",
    required: true,
    acquired: true,
    proficiency: 85,
    target: 80,
    gapAnalysis: "Exceeds expectation",
    recommendedCourses: 0
  },
  {
    id: "role-skill-2",
    name: "Cross-functional Leadership",
    description: "Leading teams across engineering, design, and marketing",
    category: "Leadership",
    required: true,
    acquired: true,
    proficiency: 75,
    target: 90,
    gapAnalysis: "Improvement needed",
    recommendedCourses: 2
  },
  {
    id: "role-skill-3",
    name: "Data-Driven Decision Making",
    description: "Using analytics and metrics to guide product decisions",
    category: "Analytics",
    required: true,
    acquired: true,
    proficiency: 65,
    target: 85,
    gapAnalysis: "Significant gap",
    recommendedCourses: 3
  },
  {
    id: "role-skill-4",
    name: "Customer Research",
    description: "Gathering and synthesizing customer feedback and needs",
    category: "UX Research",
    required: true,
    acquired: true,
    proficiency: 80,
    target: 75,
    gapAnalysis: "Exceeds expectation",
    recommendedCourses: 0
  },
  {
    id: "role-skill-5",
    name: "Market Analysis",
    description: "Researching market trends, competitors, and opportunities",
    category: "Business Strategy",
    required: true,
    acquired: false,
    proficiency: 0,
    target: 70,
    gapAnalysis: "Not acquired",
    recommendedCourses: 4
  },
  {
    id: "role-skill-6",
    name: "Product Experimentation",
    description: "Designing and running A/B tests and validating hypotheses",
    category: "Testing",
    required: false,
    acquired: false,
    proficiency: 30,
    target: 60,
    gapAnalysis: "Development needed",
    recommendedCourses: 2
  },
  {
    id: "role-skill-7",
    name: "Financial Modeling",
    description: "Creating and analyzing product financial models",
    category: "Finance",
    required: false,
    acquired: true,
    proficiency: 70,
    target: 60,
    gapAnalysis: "Exceeds expectation",
    recommendedCourses: 0
  }
];

const RoleMappedSkillsTab = () => {
  // Summary calculations
  const totalRequiredSkills = roleSkillsData.filter(skill => skill.required).length;
  const acquiredRequiredSkills = roleSkillsData.filter(skill => skill.required && skill.acquired).length;
  const requiredSkillsCompletionRate = Math.round((acquiredRequiredSkills / totalRequiredSkills) * 100);
  
  const allSkills = roleSkillsData.length;
  const allAcquiredSkills = roleSkillsData.filter(skill => skill.acquired).length;
  const allSkillsCompletionRate = Math.round((allAcquiredSkills / allSkills) * 100);
  
  const skillsNeedingImprovement = roleSkillsData.filter(
    skill => skill.acquired && skill.proficiency < skill.target
  ).length;
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Role-Mapped Skills for Senior Product Manager</h2>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Required Skills</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{requiredSkillsCompletionRate}%</p>
                <p className="text-sm text-muted-foreground">
                  ({acquiredRequiredSkills}/{totalRequiredSkills})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">All Skills</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{allSkillsCompletionRate}%</p>
                <p className="text-sm text-muted-foreground">
                  ({allAcquiredSkills}/{allSkills})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Needs Improvement</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{skillsNeedingImprovement}</p>
                <p className="text-sm text-muted-foreground">skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Skills list */}
      <div className="space-y-4">
        {roleSkillsData.map((skill) => (
          <Card key={skill.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Skill info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{skill.name}</h3>
                        {skill.required && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">Required</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{skill.description}</p>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                    </div>
                    
                    {skill.acquired ? (
                      <Badge variant="default" className="bg-green-500 w-fit">Acquired</Badge>
                    ) : (
                      <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50 w-fit">Not Acquired</Badge>
                    )}
                  </div>
                  
                  {skill.acquired && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Current Proficiency:</span>
                          <span 
                            className={`text-sm font-bold ${
                              skill.proficiency >= skill.target 
                                ? 'text-green-500' 
                                : skill.proficiency >= skill.target * 0.8 
                                  ? 'text-yellow-500' 
                                  : 'text-red-500'
                            }`}
                          >
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Target:</span>
                          <span className="text-sm">{skill.target}%</span>
                        </div>
                      </div>
                      
                      <div className="relative pt-1">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full absolute left-0 top-1 ${
                              skill.proficiency >= skill.target 
                                ? 'bg-green-500' 
                                : skill.proficiency >= skill.target * 0.8 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                          <div 
                            className="h-6 w-0.5 absolute top-0 bg-gray-400"
                            style={{ left: `${skill.target}%`, marginTop: '-4px' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <span>Gap Analysis:</span>
                        <span 
                          className={
                            skill.gapAnalysis === "Exceeds expectation" 
                              ? "text-green-500" 
                              : skill.gapAnalysis === "Improvement needed" 
                                ? "text-yellow-500" 
                                : "text-red-500"
                          }
                        >
                          {skill.gapAnalysis}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="md:border-l md:pl-6 space-y-4">
                  {skill.recommendedCourses > 0 ? (
                    <>
                      <div className="flex gap-2 items-center text-sm text-orange-500">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{skill.recommendedCourses} recommended courses</span>
                      </div>
                      <Button className="w-full">
                        View Recommendations <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </>
                  ) : skill.acquired ? (
                    <div className="flex gap-2 items-center text-sm text-green-500">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Proficiency target met</span>
                    </div>
                  ) : (
                    <Button className="w-full">
                      Start Learning <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleMappedSkillsTab;
