
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselFilters = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    filters: string[];
    selectedFilter: string;
    onFilterSelect: (filter: string) => void;
    loop?: boolean;
  }
>(({ className, filters, selectedFilter, onFilterSelect, loop = true, ...props }, ref) => {
  const filtersRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(0);
  // Remove duplicates from filters array
  const uniqueFilters = [...new Set(filters)];
  const maxPosition = Math.max(0, uniqueFilters.length - 6); // Show 6 filters at a time

  const scrollLeft = () => {
    if (filtersRef.current) {
      if (loop && position === 0) {
        setPosition(maxPosition);
      } else {
        setPosition(prev => Math.max(0, prev - 1));
      }
    }
  };

  const scrollRight = () => {
    if (filtersRef.current) {
      if (loop && position >= maxPosition) {
        setPosition(0);
      } else {
        setPosition(prev => Math.min(maxPosition, prev + 1));
      }
    }
  };

  // Calculate visible filters based on position
  const getVisibleFilters = () => {
    if (!loop) return uniqueFilters;
    
    // Create a circular array effect by duplicating the array
    const extendedFilters = [...uniqueFilters, ...uniqueFilters, ...uniqueFilters];
    // Start from the middle copy to allow backward scrolling
    const startIndex = uniqueFilters.length + position;
    // Take enough items for display
    return extendedFilters.slice(startIndex, startIndex + 6);
  };

  const visibleFilters = getVisibleFilters();

  return (
    <div className={cn("relative mb-4", className)} {...props}>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-8 w-8 shadow-md ml-0"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="overflow-hidden px-10">
        <div 
          ref={filtersRef} 
          className="flex transition-transform duration-300 justify-center"
        >
          {visibleFilters.map((filter, index) => (
            <Button
              key={`${filter}-${index}`}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterSelect(filter)}
              className="rounded-full whitespace-nowrap mx-1"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-8 w-8 shadow-md mr-0"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
})
CarouselFilters.displayName = "CarouselFilters"

export { CarouselFilters }
