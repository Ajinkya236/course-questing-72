
import React from 'react';
import { Gift } from 'lucide-react';

interface MysteryBoxProps {
  isOpening: boolean;
}

const MysteryBox: React.FC<MysteryBoxProps> = ({ isOpening }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className={`relative w-[80%] h-[80%] transition-all duration-700 transform ${
          isOpening ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Box */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-xl overflow-hidden transition-all duration-1000 ${
          isOpening ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjUsMjUgTDc1LDc1IE0yNSw3NSBMNzUsMjUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] opacity-30"></div>
          
          {/* Box lid */}
          <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-indigo-400 to-indigo-500 transform-origin-top transition-transform duration-1000">
            {/* Lid decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-indigo-700"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
            </div>
          </div>
          
          {/* Box ribbon */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 h-full w-4 bg-red-500 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 h-4 w-full bg-red-500 transform -translate-y-1/2"></div>
          </div>
          
          {/* Box content */}
          <div className="text-white z-10 mt-8">
            <Gift className="w-12 h-12 mb-2 animate-pulse" />
            <p className="font-bold text-lg">Mystery Box</p>
            <p className="text-sm opacity-75">Click to open</p>
          </div>
        </div>
        
        {/* Opening effect */}
        {isOpening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-lg animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full w-5 h-5 animate-ping"></div>
            </div>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIi8+PC9zdmc+')] animate-[spin_25s_linear_infinite]"></div>
            </div>
            <div className="absolute text-white font-bold text-lg z-10">Opening...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MysteryBox;
