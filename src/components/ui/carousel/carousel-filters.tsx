
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselFiltersProps {
  filters: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
  className?: string;
}

export const CarouselFilters: React.FC<CarouselFiltersProps> = ({
  filters,
  selectedFilter,
  onFilterSelect,
  className,
}) => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if we should show navigation buttons based on scroll position
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
  };

  // Scroll handler
  const handleScroll = () => {
    checkScrollButtons();
  };

  // Initialize and handle resize
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [filters]);

  // Scroll left/right handlers
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  if (!filters || filters.length === 0) return null;

  return (
    <div 
      className={cn("w-full relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left navigation button */}
      {showLeftButton && (
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md backdrop-blur-sm transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      {/* Right navigation button */}
      {showRightButton && (
        <Button
          variant="outline"
          size="icon"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md backdrop-blur-sm transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
      
      {/* Filter tabs with scroll container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar"
        onScroll={handleScroll}
      >
        <Tabs
          value={selectedFilter}
          onValueChange={onFilterSelect}
          className="w-full"
        >
          <TabsList className="flex flex-nowrap bg-transparent h-auto gap-2 p-1">
            {filters.map((filter) => (
              <TabsTrigger
                key={filter}
                value={filter}
                className="px-4 py-1.5 whitespace-nowrap rounded-full text-sm bg-background border hover:bg-primary/10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 shadow-sm transition-all"
              >
                {filter}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
