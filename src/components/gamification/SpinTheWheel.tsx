
import React, { useEffect, useRef } from 'react';

interface SpinTheWheelSegment {
  id: number;
  name: string;
  value: number | string;
  type: string;
  color: string;
}

interface SpinTheWheelProps {
  spinning?: boolean;
  segments: SpinTheWheelSegment[];
  onSpinComplete?: (segment: SpinTheWheelSegment) => void;
}

const SpinTheWheel: React.FC<SpinTheWheelProps> = ({ 
  spinning = false, 
  segments, 
  onSpinComplete 
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!spinning && wheelRef.current) {
      // When spinning stops, get the segment that stopped at the top
      const randomIndex = Math.floor(Math.random() * segments.length);
      if (onSpinComplete) {
        onSpinComplete(segments[randomIndex]);
      }
    }
  }, [spinning, segments, onSpinComplete]);
  
  // Create a dynamic keyframes style for the spin animation
  const spinAnimation = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(${1080 + Math.floor(Math.random() * 360)}deg); }
    }
  `;
  
  return (
    <div className="relative w-full h-full">
      {/* Add the keyframes as a style element */}
      <style dangerouslySetInnerHTML={{ __html: spinAnimation }} />
      
      {/* Wheel pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary z-10"></div>
      
      {/* Wheel */}
      <div 
        ref={wheelRef}
        className={`w-full h-full rounded-full overflow-hidden border-4 border-gray-200 shadow-lg transition-transform duration-5000 ease-out ${spinning ? 'animate-spin' : ''}`}
        style={{ 
          transform: spinning ? 'rotate(0deg)' : 'rotate(0deg)', // This will be animated with CSS
          animation: spinning ? 'spin 5s cubic-bezier(0.1, 0.7, 0.1, 1) forwards' : 'none'
        }}
      >
        {segments.map((segment, index) => {
          const segmentDegrees = 360 / segments.length;
          const rotation = index * segmentDegrees;
          
          return (
            <div 
              key={index}
              className="absolute top-0 left-0 w-full h-full origin-center"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 origin-bottom"
                style={{ 
                  backgroundColor: segment.color,
                  clipPath: `polygon(0 0, 100% 0, 50% 100%)` 
                }}
              >
                <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 text-white text-xs font-bold flex flex-col items-center">
                  <span className="text-center whitespace-nowrap" style={{ transform: `rotate(180deg)` }}>
                    {segment.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpinTheWheel;
