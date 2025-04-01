
import React from 'react';
import { cn } from '@/lib/utils';

export interface CarouselFiltersProps {
  filters: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
  className?: string; // Added className prop
}

export const CarouselFilters: React.FC<CarouselFiltersProps> = ({
  filters,
  selectedFilter,
  onFilterSelect,
  className,
}) => {
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2 mb-3", className)}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterSelect(filter)}
          className={cn(
            "px-3 py-1 text-sm rounded-full transition-colors",
            selectedFilter === filter
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default CarouselFilters;
