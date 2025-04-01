
import { Mentor } from './types';

// Sample mentors data if none provided
export const sampleMentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 38,
    topics: ["Data Analysis", "Machine Learning", "Statistics"],
    bio: "I'm passionate about helping others understand complex data concepts and apply them to real-world problems.",
    experience: "15+ years of experience in data science and analytics across various industries.",
    availability: "Available for 1-hour sessions weekly",
    expectations: "Looking for dedicated mentees who are willing to complete assignments between sessions."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 27,
    topics: ["Product Management", "UX Design", "Agile Methodologies"],
    bio: "Product leader focused on building user-centric experiences and coaching the next generation of product thinkers.",
    experience: "Led product teams at several tech startups and Fortune 500 companies.",
    availability: "Available biweekly for mentoring sessions",
    expectations: "I expect mentees to come prepared with specific questions or challenges they're facing."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Executive Coach",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5.0,
    reviews: 42,
    topics: ["Leadership", "Communication", "Career Development"],
    bio: "Helping professionals navigate career transitions and develop leadership skills.",
    experience: "20+ years in HR leadership and executive coaching.",
    availability: "Flexible scheduling, typically 45-60 minute sessions",
    expectations: "Open to both short-term and long-term mentoring relationships."
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Software Engineering Lead",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.7,
    reviews: 31,
    topics: ["Software Development", "Cloud Computing", "System Architecture"],
    bio: "Engineer turned leader who loves helping others grow their technical and leadership skills.",
    experience: "15 years building and leading engineering teams at tech companies.",
    availability: "Weekly 30-minute check-ins or biweekly deep dives",
    expectations: "Looking for mentees who have clear goals and are passionate about technology."
  },
  {
    id: 5,
    name: "Aisha Patel",
    title: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 4.6,
    reviews: 24,
    topics: ["Digital Marketing", "Content Strategy", "Brand Development"],
    bio: "Marketing strategist specializing in digital transformation and content marketing.",
    experience: "12+ years in marketing across B2B and B2C sectors.",
    availability: "Monthly sessions with email support in between",
    expectations: "Prefer mentees who are currently working in marketing roles."
  },
  {
    id: 6,
    name: "Thomas Wright",
    title: "Finance Specialist",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.9,
    reviews: 36,
    topics: ["Financial Planning", "Investment Strategy", "Business Analytics"],
    bio: "Finance professional helping others navigate complex financial decisions and planning.",
    experience: "18 years in corporate finance and investment management",
    availability: "Available for biweekly sessions",
    expectations: "Looking for mentees interested in finance and investment careers."
  },
  {
    id: 7,
    name: "Sophia Kim",
    title: "UX Research Director",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    rating: 4.8,
    reviews: 29,
    topics: ["User Research", "Design Thinking", "Usability Testing"],
    bio: "UX researcher passionate about creating user-centered digital experiences.",
    experience: "10+ years in UX research and digital product design",
    availability: "Weekly hour-long sessions",
    expectations: "Prefer mentees with basic understanding of UX principles."
  },
  {
    id: 8,
    name: "David Nguyen",
    title: "AI Engineer",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 4.9,
    reviews: 33,
    topics: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
    bio: "AI specialist helping the next generation of engineers build ethical, effective AI systems.",
    experience: "12+ years working with machine learning and AI systems",
    availability: "Monthly deep dive sessions",
    expectations: "Looking for mentees with programming experience and passion for AI."
  }
];
