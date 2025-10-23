import { Lesson, Badge, User, Motivation } from '../types';

export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Learn 10 basic English words',
    description: 'Master essential vocabulary for daily conversations and build your language foundation.',
    duration: 15,
    isCompleted: false,
    isStarted: false,
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    language: 'English',
    level: 'beginner',
    wordsLearned: 0,
    totalWords: 10,
  },
  {
    id: '2',
    title: 'Spanish greetings and introductions',
    description: 'Learn common Spanish phrases for meeting new people and making friends.',
    duration: 20,
    isCompleted: true,
    isStarted: true,
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    actualDuration: 18,
    language: 'Spanish',
    level: 'beginner',
    wordsLearned: 8,
    totalWords: 8,
  },
  {
    id: '3',
    title: 'French numbers and colors',
    description: 'Master French numbers 1-20 and basic color vocabulary.',
    duration: 12,
    isCompleted: true,
    isStarted: true,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    actualDuration: 15,
    language: 'French',
    level: 'beginner',
    wordsLearned: 15,
    totalWords: 15,
  },
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Bronze Start',
    description: 'Received for completing the first lesson in the app. This is your first victory on the path to language mastery.',
    icon: '🥉',
    isReceived: false,
  },
  {
    id: '2',
    name: 'Silver Streak',
    description: 'Complete 5 lessons in a row to earn this badge.',
    icon: '🥈',
    isReceived: false,
  },
  {
    id: '3',
    name: 'Gold Master',
    description: 'Complete 10 lessons to become a true language master.',
    icon: '🥇',
    isReceived: false,
  },
  {
    id: '4',
    name: 'Early Bird',
    description: 'Complete a lesson before 8 AM.',
    icon: '🐦',
    isReceived: false,
  },
  {
    id: '5',
    name: 'Night Owl',
    description: 'Complete a lesson after 10 PM.',
    icon: '🦉',
    isReceived: false,
  },
  {
    id: '6',
    name: 'Word Master',
    description: 'Learn 100 words to earn this vocabulary badge.',
    icon: '📚',
    isReceived: false,
  },
];

export const mockUser: User = {
  id: '1',
  name: 'Nick',
  sex: 'Man',
  registrationDate: new Date('2025-09-30'),
  timeInApp: 159,
  numberOfDays: 16,
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
};

export const mockMotivations: Motivation[] = [
  {
    id: '1',
    text: 'EVERY WORD IS A STEP FORWARD',
    date: new Date(),
  },
  {
    id: '2',
    text: 'Language is the road map of a culture',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    text: 'The limits of my language mean the limits of my world',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    text: 'Learning a new language is becoming a new person',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    text: 'One language sets you in a corridor for life. Two languages open every door along the way',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
];


