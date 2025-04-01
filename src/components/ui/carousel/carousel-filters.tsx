
import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className={cn("w-full overflow-x-auto no-scrollbar", className)}>
      <Tabs
        value={selectedFilter}
        onValueChange={onFilterSelect}
        className="w-full"
      >
        <TabsList className="flex flex-nowrap">
          {filters.map((filter) => (
            <TabsTrigger
              key={filter}
              value={filter}
              className="px-4 py-1.5 whitespace-nowrap"
            >
              {filter}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
