
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SkillNotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Skill Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The skill you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link to="/skills">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Skills
        </Link>
      </Button>
    </div>
  );
};

export default SkillNotFound;
