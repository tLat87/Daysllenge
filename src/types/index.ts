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
}

export interface Motivation {
  id: string;
  text: string;
  date: Date;
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
