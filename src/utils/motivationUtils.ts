export const motivationQuotes = [
  'YOUR 2 DAYS ARE YOUR CHALLENGE',
  'Small steps lead to big changes',
  'Every expert was once a beginner',
  'Progress, not perfection',
  'You are stronger than you think',
  'Consistency is the key to success',
  'Today is a new opportunity',
  'Believe in yourself',
  'Every challenge makes you stronger',
  'Success starts with a single step',
  'Your future self will thank you',
  'Make today count',
  'Small actions, big results',
  'You have the power to change',
  'Every day is a fresh start',
];

export const getRandomMotivation = (): string => {
  const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
  return motivationQuotes[randomIndex];
};

export const getDailyMotivation = (): string => {
  // Получаем мотивацию на основе дня года для консистентности
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % motivationQuotes.length;
  return motivationQuotes[index];
};


