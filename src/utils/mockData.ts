
import { Course } from '@/types/course';
import { UserRank, TeamRank } from '@/components/rewards/types';
import { Notification } from '@/hooks/useNotifications';

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Leadership',
    description: 'Learn the fundamentals of leadership and management in this comprehensive course.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1470&q=80',
    category: 'Leadership & Management',
    duration: '2 hours',
    rating: 4.7,
    isHot: true,
    isNew: false,
    level: 'Beginner',
    previewUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data science, statistics, and machine learning.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80',
    category: 'Data & Analytics',
    duration: '3 hours',
    rating: 4.9,
    isHot: true,
    isNew: true,
    level: 'Intermediate',
    previewUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
  {
    id: '3',
    title: 'Effective Communication Skills',
    description: 'Improve your verbal and written communication in professional settings.',
    imageUrl: 'https://images.unsplash.com/photo-1573497161237-306afcd7e7e0?auto=format&fit=crop&w=1470&q=80',
    category: 'Soft Skills',
    duration: '1.5 hours',
    rating: 4.5,
    isHot: false,
    isNew: true,
    level: 'Beginner',
    previewUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
];

// Mock user rankings
export const mockUserRankings: UserRank[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    position: 1,
    positionChange: 0,
    points: 1250,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    department: 'Engineering',
    team: 'Frontend',
    role: 'Senior Developer',
    details: {
      assessmentScore: 92,
      engagementScore: 88,
      completionRate: 95
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 2,
    positionChange: 1,
    points: 1180,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    department: 'Product',
    team: 'Design',
    role: 'Product Manager',
    details: {
      assessmentScore: 88,
      engagementScore: 90,
      completionRate: 85
    }
  },
  {
    id: '3',
    name: 'Jessica Williams',
    position: 3,
    positionChange: -1,
    points: 1120,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    department: 'Marketing',
    team: 'Digital',
    role: 'Marketing Specialist',
    details: {
      assessmentScore: 85,
      engagementScore: 92,
      completionRate: 88
    }
  },
];

// Mock team rankings
export const mockTeamRankings: TeamRank[] = [
  {
    id: 'team1',
    name: 'Frontend Team',
    position: 1,
    positionChange: 2,
    points: 5430,
    avatar: '',
    memberCount: 8,
    department: 'Engineering',
    winStreak: 3,
    isCurrentUserGroup: true
  },
  {
    id: 'team2',
    name: 'Backend Team',
    position: 2,
    positionChange: -1,
    points: 5240,
    avatar: '',
    memberCount: 7,
    department: 'Engineering',
    winStreak: 0,
    isCurrentUserGroup: false
  },
  {
    id: 'team3',
    name: 'Design Team',
    position: 3,
    positionChange: -1,
    points: 4980,
    avatar: '',
    memberCount: 6,
    department: 'Design',
    winStreak: 0,
    isCurrentUserGroup: false
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'course_assigned',
    title: 'New Course Assigned',
    description: 'You have been assigned "Data Analysis with Python"',
    link: '/course/123',
    icon: 'BookOpen',
    accentColor: 'bg-blue-500',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    category: 'course'
  },
  {
    id: '2',
    type: 'badge_earned',
    title: 'New Badge Earned',
    description: 'Congratulations! You earned the "Fast Learner" badge',
    link: '/profile',
    icon: 'Award',
    accentColor: 'bg-yellow-500',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    category: 'reward'
  },
  {
    id: '3',
    type: 'course_due',
    title: 'Course Due Soon',
    description: 'The course "Leadership Skills" is due in 2 days',
    link: '/course/456',
    icon: 'Clock',
    accentColor: 'bg-orange-500',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    category: 'course'
  },
];

// Mock user profile
export const mockUserProfile = {
  id: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Senior Developer with 5+ years of experience in frontend technologies.',
  jobTitle: 'Senior Frontend Developer',
  department: 'Engineering',
  role: 'Developer',
  experiencePoints: 2450,
  streakDays: 7,
  lastActive: new Date().toISOString(),
  skills: [
    { name: 'JavaScript', proficiency: 90, target: 100 },
    { name: 'React', proficiency: 85, target: 95 },
    { name: 'TypeScript', proficiency: 75, target: 90 },
    { name: 'CSS', proficiency: 80, target: 85 },
  ],
  achievements: [
    { name: 'Fast Learner', date: '2023-09-15', description: 'Completed 5 courses in one week' },
    { name: 'Perfect Score', date: '2023-08-20', description: 'Scored 100% on the React Assessment' },
  ]
};
