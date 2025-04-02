
import React from 'react';
import { Spinner } from "@/components/ui/spinner";

const SkillDetailLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Spinner size="lg" />
    </div>
  );
};

export default SkillDetailLoader;
