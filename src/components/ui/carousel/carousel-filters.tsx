
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselFiltersProps {
  filters: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
  className?: string;
}

export const CarouselFilters = React.forwardRef<
  HTMLDivElement,
  CarouselFiltersProps
>(({ filters, selectedFilter, onFilterSelect, className }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftNav, setShowLeftNav] = React.useState(false);
  const [showRightNav, setShowRightNav] = React.useState(true);

  if (!filters || filters.length === 0) {
    return null;
  }

  // Check for scroll position to show/hide navigation buttons
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftNav(scrollLeft > 0);
    setShowRightNav(scrollLeft + clientWidth < scrollWidth - 5); // 5px buffer
  };

  // Scroll left/right when nav buttons are clicked
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  // Check scroll position on mount and when container is scrolled
  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScrollPosition();
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      
      // Also check on resize since that can change if buttons need to be shown
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return (
    <div className="relative group/filters">
      {/* Left navigation button - only shows when scrolled right */}
      {showLeftNav && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-background/80 border shadow-sm 
                     opacity-0 group-hover/filters:opacity-100 transition-opacity duration-300"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      )}
      
      {/* Filters container with overflow handling */}
      <div
        ref={(el) => {
          // Assign to forwarded ref and local ref
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
          scrollContainerRef.current = el;
        }}
        className={cn(
          "flex overflow-x-auto scrollbar-hide gap-2 pb-1 px-2",
          className
        )}
      >
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterSelect(filter)}
            className="flex-shrink-0 text-xs px-3 h-7 rounded-full shadow-sm"
          >
            {filter}
          </Button>
        ))}
      </div>
      
      {/* Right navigation button - only shows when more content to scroll */}
      {showRightNav && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-background/80 border shadow-sm
                     opacity-0 group-hover/filters:opacity-100 transition-opacity duration-300"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      )}
    </div>
  );
});

CarouselFilters.displayName = "CarouselFilters";
