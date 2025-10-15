export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // в минутах
  isCompleted: boolean;
  isStarted?: boolean;
  startDate?: Date;
  endDate?: Date;
  startedAt?: Date;
  completedAt?: Date;
  actualDuration?: number; // фактическое время выполнения в минутах
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  wordsLearned: number;
  totalWords: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji для начала
  isReceived: boolean;
  receivedAt?: Date;
  lessonId?: string;
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
  streak: number; // текущая серия дней изучения
  longestStreak: number; // самая длинная серия
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  points: number;
  currentLanguage: string;
  wordsLearned: number;
  totalLessonsCompleted: number;
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
  type: 'lesson' | 'streak' | 'time' | 'words' | 'social';
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
  category: 'streak' | 'lessons' | 'time' | 'words' | 'social' | 'special';
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
  currentLesson?: Lesson;
  completedLessons: Lesson[];
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
  vocabulary: VocabularyWord[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isLearned: boolean;
  timesReviewed: number;
  lastReviewed?: Date;
}

export type RootStackParamList = {
  Main: undefined;
  Share: { type: 'challenge' | 'motivation'; data: any };
};

export type MainTabParamList = {
  Home: undefined;
  Lessons: undefined;
  Vocabulary: undefined;
  Settings: undefined;
};
