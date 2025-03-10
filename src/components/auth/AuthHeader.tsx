
import React from 'react';
import { BrainCircuit } from 'lucide-react';

const AuthHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <BrainCircuit className="h-10 w-10 text-primary mr-2" />
      <h1 className="text-2xl font-bold">Learning Portal</h1>
    </div>
  );
};

export default AuthHeader;
