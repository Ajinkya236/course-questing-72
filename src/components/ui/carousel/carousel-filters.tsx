
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  if (!filters || filters.length === 0) return null;

  return (
    <div className={cn("flex overflow-x-auto gap-2 pb-2 scrollbar-hide", className)}>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selectedFilter === filter ? "default" : "outline"}
          size="sm"
          className="whitespace-nowrap"
          onClick={() => onFilterSelect(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};
