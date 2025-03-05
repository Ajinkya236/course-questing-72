
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GraduationCap, Lightbulb, Target, ChevronRight, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockRoleSkills = [
  {
    id: 1,
    name: "Leadership",
    proficiencyRequired: 4,
    currentProficiency: 3,
    description: "Ability to guide, motivate and manage teams effectively",
    endorsements: 8,
    category: "Soft Skills"
  },
  {
    id: 2,
    name: "Project Management",
    proficiencyRequired: 5,
    currentProficiency: 4,
    description: "Organizing, planning, and executing projects to achieve specific goals",
    endorsements: 12,
    category: "Management"
  },
  {
    id: 3,
    name: "Data Analysis",
    proficiencyRequired: 3,
    currentProficiency: 2,
    description: "Interpreting data sets to inform business decisions",
    endorsements: 5,
    category: "Technical"
  },
  {
    id: 4,
    name: "Strategic Planning",
    proficiencyRequired: 4,
    currentProficiency: 2,
    description: "Setting goals and determining the best actions to achieve them",
    endorsements: 7,
    category: "Management"
  },
  {
    id: 5,
    name: "Communication",
    proficiencyRequired: 5,
    currentProficiency: 4,
    description: "Conveying information effectively and efficiently",
    endorsements: 15,
    category: "Soft Skills"
  },
  {
    id: 6,
    name: "Coaching",
    proficiencyRequired: 4,
    currentProficiency: 3,
    description: "Supporting others to develop skills and achieve goals",
    endorsements: 9,
    category: "Soft Skills"
  },
  {
    id: 7,
    name: "Budget Management",
    proficiencyRequired: 3,
    currentProficiency: 3,
    description: "Planning and controlling financial resources",
    endorsements: 6,
    category: "Management"
  },
  {
    id: 8,
    name: "Risk Assessment",
    proficiencyRequired: 3,
    currentProficiency: 2,
    description: "Identifying and evaluating potential risks to minimize impact",
    endorsements: 4,
    category: "Technical"
  }
];

const proficiencyLevels = [
  "Beginner",
  "Developing",
  "Proficient",
  "Advanced",
  "Expert"
];

const SkillsForYourRole: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  
  const filteredSkills = selectedCategory === "all" 
    ? mockRoleSkills 
    : mockRoleSkills.filter(skill => skill.category === selectedCategory);
  
  const getProficiencyColor = (current: number, required: number) => {
    if (current >= required) return "bg-green-500";
    if (current >= required - 1) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 border rounded-xl">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="font-semibold">Skills For Your Role</span>
          <span className="text-sm text-muted-foreground">Product Manager</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span>Skills Required for Product Manager</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="bg-primary/10 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://i.pravatar.cc/150?img=22" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-muted-foreground">Product Manager • Level 2</p>
              </div>
            </div>
            <p className="text-sm mb-2">Your overall skill proficiency for this role:</p>
            <Progress value={70} className="h-2 mb-1" />
            <div className="flex justify-between text-xs">
              <span>Current: 70%</span>
              <span>Target: 100%</span>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4 w-full mb-4">
              <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>All</TabsTrigger>
              <TabsTrigger value="soft-skills" onClick={() => setSelectedCategory("Soft Skills")}>Soft Skills</TabsTrigger>
              <TabsTrigger value="management" onClick={() => setSelectedCategory("Management")}>Management</TabsTrigger>
              <TabsTrigger value="technical" onClick={() => setSelectedCategory("Technical")}>Technical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredSkills.map(skill => (
                <Card key={skill.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-base">{skill.name}</h3>
                        <p className="text-xs text-muted-foreground">{skill.description}</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {skill.category}
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Current: {proficiencyLevels[skill.currentProficiency - 1]}</span>
                        <span>Required: {proficiencyLevels[skill.proficiencyRequired - 1]}</span>
                      </div>
                      <div className="bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${getProficiencyColor(skill.currentProficiency, skill.proficiencyRequired)}`} 
                          style={{ width: `${(skill.currentProficiency / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground">{skill.endorsements} endorsements</span>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Target className="h-3 w-3 mr-1" />
                        Improve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="soft-skills" className="space-y-4">
              {/* Content will be filtered by the filteredSkills variable */}
            </TabsContent>
            
            <TabsContent value="management" className="space-y-4">
              {/* Content will be filtered by the filteredSkills variable */}
            </TabsContent>
            
            <TabsContent value="technical" className="space-y-4">
              {/* Content will be filtered by the filteredSkills variable */}
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm">
              Download Skills Report
            </Button>
            <Button size="sm">
              Create Development Plan
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsForYourRole;
