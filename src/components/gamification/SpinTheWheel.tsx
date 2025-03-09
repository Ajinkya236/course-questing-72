
import React, { useRef, useEffect } from 'react';

interface Segment {
  id: number;
  name: string;
  color: string;
  value: any;
  type: string;
}

interface SpinTheWheelProps {
  segments: Segment[];
  spinning: boolean;
  onSpinComplete?: (segment: Segment) => void;
}

const SpinTheWheel: React.FC<SpinTheWheelProps> = ({ 
  segments, 
  spinning,
  onSpinComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw the wheel when component mounts or segments change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw segments
    const segmentAngle = (2 * Math.PI) / segments.length;
    segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill segment
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      // Add segment border
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
      
      // Add text to segment
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Arial';
      
      // Calculate text position
      const textRadius = radius * 0.75;
      
      // Draw reward text
      ctx.fillText(segment.name, textRadius, 5);
      
      ctx.restore();
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    
    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    
  }, [segments]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className={`w-full h-full ${spinning ? 'animate-spin' : ''}`}
        style={{ 
          transitionProperty: 'transform',
          transitionDuration: spinning ? '3s' : '0s',
          transitionTimingFunction: spinning ? 'cubic-bezier(0.2, 0.8, 0.2, 1)' : 'ease-out'
        }}
      />
    </div>
  );
};

export default SpinTheWheel;
