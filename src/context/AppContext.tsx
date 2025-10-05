import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Challenge, Badge, User, Motivation } from '../types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CURRENT_CHALLENGE'; payload: Challenge | undefined }
  | { type: 'COMPLETE_CHALLENGE'; payload: Challenge }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'RESET_PROGRESS' }
  | { type: 'UPDATE_USER_TIME'; payload: number }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'COMPLETE_PROFILE_REGISTRATION' };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Nick',
    sex: 'Man',
    registrationDate: new Date(),
    timeInApp: 0,
    numberOfDays: 0,
  },
  currentChallenge: {
    id: '1',
    title: 'Do a light stretch for 10 minutes',
    description: 'A simple stretching routine to improve flexibility and reduce muscle tension.',
    duration: 10,
    isCompleted: false,
    isAccepted: false,
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
  },
  completedChallenges: [],
  badges: [
    {
      id: '1',
      name: 'Bronze Start',
      description: 'Received for completing the first challenge in the app. This is your first victory on the path to healthy habits.',
      icon: '🥉',
      isReceived: false,
    },
  ],
  motivations: [
    {
      id: '1',
      text: 'YOUR 2 DAYS ARE YOUR CHALLENGE',
      date: new Date(),
    },
  ],
  notificationsEnabled: true,
  hasCompletedOnboarding: false,
  hasCompletedProfileRegistration: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_CHALLENGE':
      return { ...state, currentChallenge: action.payload };
    case 'COMPLETE_CHALLENGE':
      const completedChallenge = { ...action.payload, isCompleted: true, completedAt: new Date() };
      return {
        ...state,
        currentChallenge: undefined,
        completedChallenges: [...state.completedChallenges, completedChallenge],
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
        currentChallenge: undefined,
        completedChallenges: [],
        badges: state.badges.map(badge => ({ ...badge, isReceived: false, receivedAt: undefined })),
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
