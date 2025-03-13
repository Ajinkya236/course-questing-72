
export interface Mentee {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastActive: string;
}

// Mock data for mentees
export const menteeData: Record<number, Mentee> = {
  1: {
    id: 1,
    name: "Emma Johnson",
    role: "Junior Developer",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    lastActive: "2 days ago"
  },
  2: {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Specialist",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    lastActive: "Yesterday"
  },
  3: {
    id: 3,
    name: "Sarah Williams",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/64.jpg",
    lastActive: "Today"
  },
  4: {
    id: 4,
    name: "David Kim",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    lastActive: "3 days ago"
  },
  5: {
    id: 5,
    name: "Olivia Martinez",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    lastActive: "5 days ago"
  }
};
