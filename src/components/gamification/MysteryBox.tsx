
import React from 'react';
import { Gift, Sparkle } from "lucide-react";

interface MysteryBoxProps {
  isOpening?: boolean;
}

const MysteryBox: React.FC<MysteryBoxProps> = ({ isOpening = false }) => {
  return (
    <div 
      className={`relative w-full h-full cursor-pointer transition-all duration-300 ${isOpening ? 'animate-pulse' : 'hover:scale-105'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg shadow-xl border-2 border-white/30 flex items-center justify-center">
        <div className={`w-full h-full flex items-center justify-center ${isOpening ? 'animate-bounce' : ''}`}>
          <Gift className={`h-20 w-20 text-primary ${isOpening ? 'opacity-50' : ''}`} />
        </div>
        
        {isOpening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Sparkles around the box */}
        <div className="absolute -top-2 -right-2">
          <Sparkle className="h-6 w-6 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <Sparkle className="h-6 w-6 text-purple-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default MysteryBox;
