
import { TeamRank, UserRank } from "./types";

// Generate mock leaderboard data
export const generateMockLeaderboardData = () => {
  // Generate 50 users
  const allUsers: UserRank[] = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    position: i + 1,
    positionChange: Math.floor(Math.random() * 5) - 2, // Random position change between -2 and 2
    points: Math.floor(10000 - i * (100 + Math.random() * 50)),
    avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
    department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'][i % 6],
    team: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'][i % 6],
    role: ['Developer', 'Manager', 'Designer', 'Analyst', 'Specialist', 'Director'][i % 6],
    location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Berlin'][i % 6],
    segment: ['Enterprise', 'SMB', 'Consumer', 'Government', 'Education'][i % 5],
    jobFamily: ['Technical', 'Business', 'Creative', 'Support', 'Leadership'][i % 5],
    skill: ['JavaScript', 'Python', 'Leadership', 'Design', 'Marketing', 'Communication'][i % 6],
    details: {
      assessmentScore: Math.floor(70 + Math.random() * 30),
      engagementScore: Math.floor(60 + Math.random() * 40),
      completionRate: Math.floor(75 + Math.random() * 25)
    }
  }));

  return allUsers;
};

// Generate mock team leaderboard data
export const generateMockTeamLeaderboard = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `team-${i + 1}`,
    name: `Team ${String.fromCharCode(65 + i)}`,
    position: i + 1,
    positionChange: Math.floor(Math.random() * 5) - 2,
    points: Math.floor(25000 - i * (500 + Math.random() * 300)),
    avatar: `/placeholder.svg`,
    memberCount: Math.floor(3 + Math.random() * 10),
    department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'][i % 6],
    segment: ['Enterprise', 'SMB', 'Consumer', 'Government', 'Education'][i % 5],
    winStreak: i < 3 ? Math.floor(1 + Math.random() * 5) : 0
  }));
};

// Get Relative Individual Leaderboard (2 users above and 2 below current user)
export const getRelativeLeaderboard = (allUsers: UserRank[], currentUser?: UserRank) => {
  if (!currentUser) return [];
  
  const currentIndex = allUsers.findIndex(user => user.id === currentUser.id);
  const startIndex = Math.max(0, currentIndex - 2);
  const endIndex = Math.min(allUsers.length, currentIndex + 3);
  
  return allUsers.slice(startIndex, endIndex);
};

// Get filtered individual leaderboard
export const getFilteredIndividualLeaderboard = (
  allUsers: UserRank[], 
  leaderboardFilter: string, 
  filterValueSelect: string,
  currentUser?: UserRank
) => {
  let filteredUsers = [...allUsers];
  
  // Apply filter values
  if (filterValueSelect !== 'all' && leaderboardFilter !== 'all' && leaderboardFilter !== 'personal') {
    switch (leaderboardFilter) {
      case 'team':
        filteredUsers = filteredUsers.filter(user => user.team === filterValueSelect);
        break;
      case 'department':
        filteredUsers = filteredUsers.filter(user => user.department === filterValueSelect);
        break;
      case 'location':
        filteredUsers = filteredUsers.filter(user => user.location === filterValueSelect);
        break;
      case 'role':
        filteredUsers = filteredUsers.filter(user => user.role === filterValueSelect);
        break;
      default:
        break;
    }
  }
  // Apply default team filter if no specific filter is selected
  else if (leaderboardFilter === 'team') {
    filteredUsers = filteredUsers.filter(user => user.team === currentUser?.team);
  }
  // Apply department filter
  else if (leaderboardFilter === 'department') {
    filteredUsers = filteredUsers.filter(user => user.department === currentUser?.department);
  }
  // Apply location filter
  else if (leaderboardFilter === 'location') {
    filteredUsers = filteredUsers.filter(user => user.location === currentUser?.location);
  }
  // Apply role filter
  else if (leaderboardFilter === 'role') {
    filteredUsers = filteredUsers.filter(user => user.role === currentUser?.role);
  }
  
  return filteredUsers.slice(0, 5);
};

// Get Intra Team Leaderboard (users within the same group)
export const getIntraTeamLeaderboard = (
  allUsers: UserRank[], 
  leaderboardFilter: string, 
  filterValueSelect: string,
  currentUser?: UserRank
) => {
  let filteredUsers = [...allUsers];
  
  if (leaderboardFilter === 'team') {
    filteredUsers = filteredUsers.filter(user => user.team === (filterValueSelect === 'all' ? currentUser?.team : filterValueSelect));
  } else if (leaderboardFilter === 'role') {
    filteredUsers = filteredUsers.filter(user => user.role === (filterValueSelect === 'all' ? currentUser?.role : filterValueSelect));
  } else if (leaderboardFilter === 'department') {
    filteredUsers = filteredUsers.filter(user => user.department === (filterValueSelect === 'all' ? currentUser?.department : filterValueSelect));
  } else if (leaderboardFilter === 'location') {
    filteredUsers = filteredUsers.filter(user => user.location === (filterValueSelect === 'all' ? currentUser?.location : filterValueSelect));
  } else if (leaderboardFilter === 'job-segment') {
    filteredUsers = filteredUsers.filter(user => user.segment === (filterValueSelect === 'all' ? currentUser?.segment : filterValueSelect));
  } else if (leaderboardFilter === 'job-family') {
    filteredUsers = filteredUsers.filter(user => user.jobFamily === (filterValueSelect === 'all' ? currentUser?.jobFamily : filterValueSelect));
  }
  
  return filteredUsers.slice(0, 5);
};

// Get Inter Team Leaderboard (competition between teams/groups)
export const getInterTeamLeaderboard = (
  allUsers: UserRank[], 
  allTeams: TeamRank[], 
  leaderboardFilter: string,
  currentUser?: UserRank
) => {
  // For team filter, return teams
  if (leaderboardFilter === 'team') {
    return allTeams.slice(0, 5);
  }
  
  // For other filters, aggregate users by the filter and show as groups
  const allGroups: TeamRank[] = [];
  const groupedUsers: Record<string, TeamRank> = {};
  
  // Group users by selected filter
  allUsers.forEach(user => {
    let groupKey = '';
    
    if (leaderboardFilter === 'role') {
      groupKey = user.role || 'Unknown';
    } else if (leaderboardFilter === 'department') {
      groupKey = user.department || 'Unknown';
    } else if (leaderboardFilter === 'location') {
      groupKey = user.location || 'Unknown';
    } else if (leaderboardFilter === 'job-segment') {
      groupKey = user.segment || 'Unknown';
    } else if (leaderboardFilter === 'job-family') {
      groupKey = user.jobFamily || 'Unknown';
    }
    
    if (!groupKey) return;
    
    if (!groupedUsers[groupKey]) {
      groupedUsers[groupKey] = {
        id: `group-${groupKey}`,
        name: groupKey,
        points: 0,
        memberCount: 0,
        position: 0,
        positionChange: Math.floor(Math.random() * 5) - 2,
        isCurrentUserGroup: (
          (leaderboardFilter === 'role' && currentUser?.role === groupKey) ||
          (leaderboardFilter === 'department' && currentUser?.department === groupKey) ||
          (leaderboardFilter === 'location' && currentUser?.location === groupKey) ||
          (leaderboardFilter === 'job-segment' && currentUser?.segment === groupKey) ||
          (leaderboardFilter === 'job-family' && currentUser?.jobFamily === groupKey)
        )
      };
    }
    
    groupedUsers[groupKey].points += user.points;
    groupedUsers[groupKey].memberCount += 1;
  });
  
  // Convert to array and sort by points
  Object.values(groupedUsers).forEach(group => {
    allGroups.push(group);
  });
  
  allGroups.sort((a, b) => b.points - a.points);
  
  // Assign positions
  allGroups.forEach((group, index) => {
    group.position = index + 1;
  });
  
  return allGroups.slice(0, 5);
};

// Get Personal Best (tracking own progress)
export const getPersonalBestLeaderboard = (currentUser?: UserRank) => {
  if (!currentUser) return [];
  
  // Mock historical positions of the current user
  return [
    { ...currentUser, position: currentUser.position + 4, positionChange: -1, date: '3 months ago' },
    { ...currentUser, position: currentUser.position + 3, positionChange: -1, date: '2 months ago' },
    { ...currentUser, position: currentUser.position + 1, positionChange: -2, date: '1 month ago' },
    { ...currentUser, position: currentUser.position, positionChange: -1, date: 'This month' },
  ];
};

// Get filter values for selected filter type
export const getFilterValues = (allUsers: UserRank[], leaderboardFilter: string) => {
  const uniqueValues = new Set<string>();
  
  if (leaderboardFilter === 'team') {
    allUsers.forEach(user => user.team && uniqueValues.add(user.team));
  } else if (leaderboardFilter === 'department') {
    allUsers.forEach(user => user.department && uniqueValues.add(user.department));
  } else if (leaderboardFilter === 'location') {
    allUsers.forEach(user => user.location && uniqueValues.add(user.location));
  } else if (leaderboardFilter === 'role') {
    allUsers.forEach(user => user.role && uniqueValues.add(user.role));
  } else if (leaderboardFilter === 'job-segment') {
    allUsers.forEach(user => user.segment && uniqueValues.add(user.segment));
  } else if (leaderboardFilter === 'job-family') {
    allUsers.forEach(user => user.jobFamily && uniqueValues.add(user.jobFamily));
  }
  
  return Array.from(uniqueValues);
};

// Get the current leaderboard title
export const getLeaderboardTitle = (
  activeLeaderboardType: string, 
  teamLeaderboardScope: string,
  leaderboardFilter: string
) => {
  if (activeLeaderboardType === 'team') {
    return teamLeaderboardScope === 'intra' ? 'Intra-Group Leaderboard' : 'Inter-Group Leaderboard';
  } else if (leaderboardFilter === 'personal') {
    return 'Personal Best Progression';
  } else {
    return 'Individual Leaderboard';
  }
};

// Get the current leaderboard description
export const getLeaderboardDescription = (
  activeLeaderboardType: string, 
  teamLeaderboardScope: string,
  leaderboardFilter: string
) => {
  if (activeLeaderboardType === 'team') {
    return teamLeaderboardScope === 'intra' 
      ? `Compare members within your ${leaderboardFilter}` 
      : `Compare different ${leaderboardFilter}s against each other`;
  } else if (leaderboardFilter === 'personal') {
    return 'Track your own progress over time';
  } else if (leaderboardFilter === 'all') {
    return 'See how you rank compared to others near your position';
  } else if (leaderboardFilter === 'team') {
    return 'See how you rank within your team';
  } else if (leaderboardFilter === 'department') {
    return 'See how you rank within your department';
  } else if (leaderboardFilter === 'location') {
    return 'See how you rank within your location';
  } else if (leaderboardFilter === 'role') {
    return 'See how you rank among peers with the same role';
  }
  
  return 'See how you rank in your selected filter group';
};

// Get active leaderboard based on current settings
export const getActiveLeaderboard = (
  activeLeaderboardType: string,
  teamLeaderboardScope: string,
  leaderboardFilter: string,
  allUsers: UserRank[],
  allTeams: TeamRank[],
  filterValueSelect: string,
  currentUser?: UserRank
) => {
  if (activeLeaderboardType === 'team') {
    return teamLeaderboardScope === 'intra' 
      ? getIntraTeamLeaderboard(allUsers, leaderboardFilter, filterValueSelect, currentUser) 
      : getInterTeamLeaderboard(allUsers, allTeams, leaderboardFilter, currentUser);
  } else if (leaderboardFilter === 'personal') {
    return getPersonalBestLeaderboard(currentUser);
  } else {
    return getRelativeLeaderboard(allUsers, currentUser);
  }
};

// Mock rewards data
export const getMockRewardsData = () => {
  return {
    totalPoints: 1250,
    pointsToNextReward: 750,
    nextRewardThreshold: 2000,
    streak: 15,
    multiplier: 1.5,
    nextMilestone: {
      points: 1500,
      reward: "Coffee Voucher"
    },
    pointsBreakdown: {
      coursesCompleted: 650,
      quizzesPassed: 280,
      dailyLogins: 120,
      voluntaryActivities: 150,
      streakBonus: 50
    },
    courseWisePoints: [
      { id: 1, courseName: 'Introduction to Leadership', totalPoints: 350, breakdown: { completion: 150, quizzes: 80, assignments: 70, participation: 50 } },
      { id: 2, courseName: 'Advanced Data Analysis', totalPoints: 280, breakdown: { completion: 120, quizzes: 90, assignments: 50, participation: 20 } },
      { id: 3, courseName: 'Effective Communication Strategies', totalPoints: 210, breakdown: { completion: 100, quizzes: 60, assignments: 30, participation: 20 } },
    ]
  };
};
