export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number; // в минутах
  isCompleted: boolean;
  isAccepted?: boolean;
  startDate?: Date;
  endDate?: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  actualDuration?: number; // фактическое время выполнения в минутах
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji для начала
  isReceived: boolean;
  receivedAt?: Date;
  challengeId?: string;
}

export interface User {
  id: string;
  name: string;
  sex: 'Man' | 'Woman';
  registrationDate: Date;
  timeInApp: number; // в часах
  numberOfDays: number;
  profilePicture?: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  totalExperience: number;
  streak: number; // текущая серия дней
  longestStreak: number; // самая длинная серия
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  points: number;
}

export interface Motivation {
  id: string;
  text: string;
  date: Date;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  type: 'exercise' | 'streak' | 'time' | 'social';
  target: number;
  current: number;
  reward: {
    experience: number;
    points: number;
    badge?: Badge;
  };
  isCompleted: boolean;
  expiresAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'challenges' | 'time' | 'social' | 'special';
  requirement: number;
  current: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  profilePicture?: string;
  points: number;
  level: number;
  rank: number;
  streak: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'achievement' | 'quest' | 'streak' | 'social';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface AppState {
  user: User;
  currentChallenge?: Challenge;
  completedChallenges: Challenge[];
  badges: Badge[];
  motivations: Motivation[];
  notificationsEnabled: boolean;
  hasCompletedOnboarding: boolean;
  hasCompletedProfileRegistration: boolean;
  dailyQuests: DailyQuest[];
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  notifications: Notification[];
  currentStreak: number;
  lastActivityDate?: Date;
}

export type RootStackParamList = {
  Main: undefined;
  Share: { type: 'challenge' | 'motivation'; data: any };
};

export type MainTabParamList = {
  Home: undefined;
  Challenges: undefined;
  Badges: undefined;
  Settings: undefined;
};
