import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Lesson, Badge, User, Motivation, DailyQuest, Achievement, LeaderboardEntry, Notification, VocabularyWord } from '../types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CURRENT_LESSON'; payload: Lesson | undefined }
  | { type: 'COMPLETE_LESSON'; payload: Lesson }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'RESET_PROGRESS' }
  | { type: 'UPDATE_USER_TIME'; payload: number }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'COMPLETE_PROFILE_REGISTRATION' }
  | { type: 'ADD_EXPERIENCE'; payload: number }
  | { type: 'LEVEL_UP'; payload: { newLevel: number; newExperience: number } }
  | { type: 'UPDATE_STREAK'; payload: number }
  | { type: 'COMPLETE_QUEST'; payload: DailyQuest }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'UPDATE_LEADERBOARD'; payload: LeaderboardEntry[] }
  | { type: 'ADD_VOCABULARY_WORD'; payload: VocabularyWord }
  | { type: 'LEARN_VOCABULARY_WORD'; payload: string };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Nick',
    sex: 'Man',
    registrationDate: new Date(),
    timeInApp: 0,
    numberOfDays: 0,
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
    totalExperience: 0,
    streak: 0,
    longestStreak: 0,
    rank: 'Bronze',
    points: 0,
    currentLanguage: 'English',
    wordsLearned: 0,
    totalLessonsCompleted: 0,
  },
  currentLesson: {
    id: '1',
    title: 'Learn 10 basic English words',
    description: 'Master essential vocabulary for daily conversations and build your language foundation.',
    duration: 15,
    isCompleted: false,
    isStarted: false,
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    language: 'English',
    level: 'beginner',
    wordsLearned: 0,
    totalWords: 10,
  },
  completedLessons: [],
  badges: [
    {
      id: '1',
      name: 'Bronze Start',
      description: 'Received for completing the first lesson in the app. This is your first victory on the path to language mastery.',
      icon: '🥉',
      isReceived: false,
    },
  ],
  motivations: [
    {
      id: '1',
      text: 'EVERY WORD IS A STEP FORWARD',
      date: new Date(),
    },
  ],
  notificationsEnabled: true,
  hasCompletedOnboarding: false,
  hasCompletedProfileRegistration: false,
  dailyQuests: [
    {
      id: '1',
      title: 'Complete your first lesson',
      description: 'Finish any language lesson to earn bonus experience',
      type: 'lesson',
      target: 1,
      current: 0,
      reward: { experience: 50, points: 25 },
      isCompleted: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  ],
  achievements: [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      category: 'lessons',
      requirement: 1,
      current: 0,
      isUnlocked: false,
      rarity: 'common',
    },
    {
      id: '2',
      name: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      category: 'streak',
      requirement: 7,
      current: 0,
      isUnlocked: false,
      rarity: 'rare',
    },
  ],
  leaderboard: [],
  notifications: [
    {
      id: '1',
      title: 'Welcome to LinguaQuest!',
      message: 'Start your language learning journey with your first lesson. Good luck!',
      type: 'achievement',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2',
      title: 'Daily Quest Available',
      message: 'Complete your first lesson to earn bonus experience points!',
      type: 'quest',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
  ],
  currentStreak: 0,
  lastActivityDate: undefined,
  vocabulary: [
    {
      id: '1',
      word: 'Hello',
      translation: 'Привет',
      language: 'English',
      difficulty: 'easy',
      isLearned: false,
      timesReviewed: 0,
    },
    {
      id: '2',
      word: 'Goodbye',
      translation: 'До свидания',
      language: 'English',
      difficulty: 'easy',
      isLearned: false,
      timesReviewed: 0,
    },
  ],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_LESSON':
      return { ...state, currentLesson: action.payload };
    case 'COMPLETE_LESSON':
      const completedLesson = { ...action.payload, isCompleted: true, completedAt: new Date() };
      return {
        ...state,
        currentLesson: undefined,
        completedLessons: [...state.completedLessons, completedLesson],
        user: {
          ...state.user,
          totalLessonsCompleted: state.user.totalLessonsCompleted + 1,
          wordsLearned: state.user.wordsLearned + completedLesson.wordsLearned,
        },
      };
    case 'ADD_BADGE':
      return {
        ...state,
        badges: state.badges.map(badge =>
          badge.id === action.payload.id ? { ...badge, isReceived: true, receivedAt: new Date() } : badge
        ),
      };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    case 'RESET_PROGRESS':
      return {
        ...state,
        currentLesson: undefined,
        completedLessons: [],
        badges: state.badges.map(badge => ({ ...badge, isReceived: false, receivedAt: undefined })),
        user: {
          ...state.user,
          totalLessonsCompleted: 0,
          wordsLearned: 0,
        },
      };
    case 'UPDATE_USER_TIME':
      return {
        ...state,
        user: { ...state.user, timeInApp: state.user.timeInApp + action.payload },
      };
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        hasCompletedOnboarding: true,
      };
    case 'COMPLETE_PROFILE_REGISTRATION':
      return {
        ...state,
        hasCompletedProfileRegistration: true,
      };
    case 'ADD_EXPERIENCE':
      const newExperience = state.user.experience + action.payload;
      const newTotalExperience = state.user.totalExperience + action.payload;
      const newPoints = state.user.points + Math.floor(action.payload / 2);
      
      // Check for level up
      if (newExperience >= state.user.experienceToNextLevel) {
        const newLevel = state.user.level + 1;
        const remainingExp = newExperience - state.user.experienceToNextLevel;
        const newExpToNext = Math.floor(state.user.experienceToNextLevel * 1.2);
        
        return {
          ...state,
          user: {
            ...state.user,
            level: newLevel,
            experience: remainingExp,
            experienceToNextLevel: newExpToNext,
            totalExperience: newTotalExperience,
            points: newPoints,
          },
        };
      }
      
      return {
        ...state,
        user: {
          ...state.user,
          experience: newExperience,
          totalExperience: newTotalExperience,
          points: newPoints,
        },
      };
    case 'LEVEL_UP':
      return {
        ...state,
        user: {
          ...state.user,
          level: action.payload.newLevel,
          experience: action.payload.newExperience,
        },
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        user: {
          ...state.user,
          streak: action.payload,
          longestStreak: Math.max(state.user.longestStreak, action.payload),
        },
        currentStreak: action.payload,
      };
    case 'COMPLETE_QUEST':
      return {
        ...state,
        dailyQuests: state.dailyQuests.map(quest =>
          quest.id === action.payload.id
            ? { ...quest, isCompleted: true }
            : quest
        ),
      };
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(achievement =>
          achievement.id === action.payload.id
            ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
            : achievement
        ),
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        ),
      };
    case 'UPDATE_LEADERBOARD':
      return {
        ...state,
        leaderboard: action.payload,
      };
    case 'ADD_VOCABULARY_WORD':
      return {
        ...state,
        vocabulary: [...state.vocabulary, action.payload],
      };
    case 'LEARN_VOCABULARY_WORD':
      return {
        ...state,
        vocabulary: state.vocabulary.map(word =>
          word.id === action.payload
            ? { ...word, isLearned: true, timesReviewed: word.timesReviewed + 1, lastReviewed: new Date() }
            : word
        ),
        user: {
          ...state.user,
          wordsLearned: state.user.wordsLearned + 1,
        },
      };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
