
export interface Mentor {
  id: number;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  topics: string[];
  bio?: string;
  experience?: string;
  availability?: string;
  expectations?: string;
}

export interface RecommendedMentorsCarouselProps {
  mentors?: Mentor[];
  selectedTopics?: string[];
}
