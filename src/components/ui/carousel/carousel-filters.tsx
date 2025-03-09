
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"

interface CarouselFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

const CarouselFilters = React.forwardRef<HTMLDivElement, CarouselFiltersProps>(
  ({ className, filters, selectedFilter, onFilterSelect, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [showLeftNav, setShowLeftNav] = React.useState(false);
    const [showRightNav, setShowRightNav] = React.useState(true);

    const updateNavVisibility = React.useCallback(() => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowLeftNav(container.scrollLeft > 10);
        setShowRightNav(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
      }
    }, []);

    const scrollLeft = React.useCallback(() => {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollBy({ left: -200, behavior: 'smooth' });
      }
    }, []);

    const scrollRight = React.useCallback(() => {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, []);

    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
        updateNavVisibility();
        container.addEventListener('scroll', updateNavVisibility);
        window.addEventListener('resize', updateNavVisibility);
      }
      
      return () => {
        if (container) {
          container.removeEventListener('scroll', updateNavVisibility);
          window.removeEventListener('resize', updateNavVisibility);
        }
      };
    }, [updateNavVisibility]);

    return (
      <div className="relative group">
        {showLeftNav && (
          <Button 
            variant="outline" 
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-background/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className={cn(
            "flex space-x-2 overflow-x-auto scrollbar-hide py-1 px-1",
            className
          )}
          {...props}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterSelect(filter)}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1 text-sm transition-colors focus:outline-none",
                selectedFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {showRightNav && (
          <Button 
            variant="outline" 
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-background/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }
)

CarouselFilters.displayName = "CarouselFilters"

export { CarouselFilters }
