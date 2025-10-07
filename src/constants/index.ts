export const COLORS = {
  primary: '#FF0000',
  primaryDark: '#CC0000',
  primaryLight: '#FF3333',
  secondary: '#ffffff',
  background: '#ffffff',
  backgroundSecondary: '#FFF5F5',
  text: '#000000',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#f0f0f0',
  borderRed: '#FFE0E0',
  shadow: '#000000',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  gradient: {
    red: ['#FF0000', '#FF3333'],
    redDark: ['#CC0000', '#FF0000'],
    gold: ['#FFD700', '#FFA500'],
  },
};

export const SIZES = {
  // Font sizes
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  xxxlarge: 24,

  // Spacing
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 30,

  // Border radius
  radius: 8,
  radiusLarge: 12,
  radiusXLarge: 16,
};

export const FONTS = {
  regular: 'DMMono-Italic',
  medium: 'DMMono-Italic',
  bold: 'DMMono-Italic',
  italic: 'DMMono-Italic',
};

export const CHALLENGE_DURATION = {
  MINUTES: 60 * 1000,
  HOURS: 60 * 60 * 1000,
  DAYS: 24 * 60 * 60 * 1000,
};

export const APP_CONFIG = {
  CHALLENGE_DURATION_DAYS: 2,
  DEFAULT_CHALLENGE_DURATION_MINUTES: 10,
  MAX_CHALLENGES_PER_DAY: 3,
  BADGE_THRESHOLDS: {
    FIRST_CHALLENGE: 1,
    WEEK_STREAK: 7,
    MONTH_STREAK: 30,
  },
};

