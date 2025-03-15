
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  className
}) => {
  return (
    <ScrollArea className={cn("w-full", className)}>
      <div className="flex items-center gap-2 pb-1 px-1">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterSelect(filter)}
            className="whitespace-nowrap flex-shrink-0"
          >
            {filter}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
