
// Import the new CSS styles
import './carousel.css';

// Main export file to maintain the current import structure
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext,
  CarouselApi,
  CarouselOptions
} from './carousel-components';

import { CarouselFilters } from './carousel-filters';

export {
  type CarouselApi,
  type CarouselOptions,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselFilters
}
