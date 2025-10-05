import { Challenge, Badge, User, Motivation } from '../types';

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Do a light stretch for 10 minutes',
    description: 'A simple stretching routine to improve flexibility and reduce muscle tension.',
    duration: 10,
    isCompleted: false,
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Take a 15-minute walk',
    description: 'A gentle walk to get your body moving and improve circulation.',
    duration: 15,
    isCompleted: true,
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    actualDuration: 12,
  },
  {
    id: '3',
    title: 'Do 20 push-ups',
    description: 'Build upper body strength with this classic exercise.',
    duration: 5,
    isCompleted: true,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    actualDuration: 8,
  },
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Bronze Start',
    description: 'Received for completing the first challenge in the app. This is your first victory on the path to healthy habits.',
    icon: '🥉',
    isReceived: false,
  },
  {
    id: '2',
    name: 'Silver Streak',
    description: 'Complete 5 challenges in a row to earn this badge.',
    icon: '🥈',
    isReceived: false,
  },
  {
    id: '3',
    name: 'Gold Master',
    description: 'Complete 10 challenges to become a true master.',
    icon: '🥇',
    isReceived: false,
  },
  {
    id: '4',
    name: 'Early Bird',
    description: 'Complete a challenge before 8 AM.',
    icon: '🐦',
    isReceived: false,
  },
  {
    id: '5',
    name: 'Night Owl',
    description: 'Complete a challenge after 10 PM.',
    icon: '🦉',
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
};

export const mockMotivations: Motivation[] = [
  {
    id: '1',
    text: 'YOUR 2 DAYS ARE YOUR CHALLENGE',
    date: new Date(),
  },
  {
    id: '2',
    text: 'Small steps lead to big changes',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    text: 'Every expert was once a beginner',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];


