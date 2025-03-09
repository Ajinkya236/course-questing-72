
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex overflow-x-auto scrollbar-hide gap-2 pb-1",
        className
      )}
    >
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selectedFilter === filter ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterSelect(filter)}
          className="flex-shrink-0 text-xs px-3 h-7"
        >
          {filter}
        </Button>
      ))}
    </div>
  );
});

CarouselFilters.displayName = "CarouselFilters";
