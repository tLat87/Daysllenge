import { Challenge } from '../types';

export const generateRandomChallenge = (): Challenge => {
  const challenges = [
    {
      id: '1',
      title: 'Do a light stretch for 10 minutes',
      description: 'A simple stretching routine to improve flexibility and reduce muscle tension.',
      duration: 10,
    },
    {
      id: '2',
      title: 'Take a 15-minute walk',
      description: 'A gentle walk to get your body moving and improve circulation.',
      duration: 15,
    },
    {
      id: '3',
      title: 'Do 20 push-ups',
      description: 'Build upper body strength with this classic exercise.',
      duration: 5,
    },
    {
      id: '4',
      title: 'Practice deep breathing for 5 minutes',
      description: 'Focus on your breath to reduce stress and improve mindfulness.',
      duration: 5,
    },
    {
      id: '5',
      title: 'Do 30 squats',
      description: 'Strengthen your legs and glutes with this bodyweight exercise.',
      duration: 8,
    },
  ];

  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  const now = new Date();
  const endDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 дня

  return {
    ...randomChallenge,
    isCompleted: false,
    startDate: now,
    endDate: endDate,
  };
};

export const getTimeRemaining = (endDate: Date): string => {
  const now = new Date().getTime();
  const endTime = endDate.getTime();
  const diff = endTime - now;

  if (diff <= 0) {
    return 'Expired';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

export const isChallengeExpired = (endDate: Date): boolean => {
  return new Date().getTime() > endDate.getTime();
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
};


