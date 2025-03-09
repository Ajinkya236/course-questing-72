
import React from 'react';
import { CarouselFilters as FiltersComponent } from '@/components/ui/carousel';

interface CarouselFiltersProps {
  filterOptions: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
  className?: string;
}

const CarouselFilters: React.FC<CarouselFiltersProps> = ({
  filterOptions,
  selectedFilter,
  onFilterSelect,
  className,
}) => {
  if (!filterOptions || filterOptions.length === 0) {
    return null;
  }

  // Removing duplicates from filter options
  const uniqueFilterOptions = [...new Set(filterOptions)];
  
  return (
    <FiltersComponent
      filters={uniqueFilterOptions}
      selectedFilter={selectedFilter}
      onFilterSelect={onFilterSelect}
      className={className || "justify-start"}
    />
  );
};

export default CarouselFilters;
