
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/layout/PageLayout';
import { mockSkills } from '@/data/skillsData';
import SkillSearch from '@/components/skills/SkillSearch';
import { Skill } from '@/components/skills/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Skills: React.FC = () => {
  const navigate = useNavigate();
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(mockSkills);
  
  const handleSkillClick = (skillId: number) => {
    navigate(`/skill-detail/${skillId}`);
  };
  
  const proficiencyColor = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <PageLayout>
      <Helmet>
        <title>Skills | Learning Portal</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Skills Catalog</h1>
          <SkillSearch skills={mockSkills} onSearch={setFilteredSkills} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold">{skill.name}</CardTitle>
                  <Badge className={`${proficiencyColor(skill.proficiency)}`}>
                    {skill.proficiency}
                  </Badge>
                </div>
                <CardDescription className="mt-2 line-clamp-2">
                  {skill.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-2">
                  {skill.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/50">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2 border-t">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{skill.resources} resources</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-primary"
                  onClick={() => handleSkillClick(skill.id)}
                >
                  <span className="mr-1">Explore</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No skills found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse the full catalog.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Skills;
