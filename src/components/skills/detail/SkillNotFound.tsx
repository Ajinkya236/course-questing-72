
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SkillNotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Skill Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The skill you're looking for doesn't exist or has been removed.
          Please try searching for another skill or return to the skills page.
        </p>
        <Button size="lg" asChild>
          <Link to="/skills">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Skills
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SkillNotFound;
