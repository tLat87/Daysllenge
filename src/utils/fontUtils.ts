import { FONTS } from '../constants';

export const getFontFamily = (weight: 'regular' | 'medium' | 'bold' | 'italic' = 'regular'): string => {
  return FONTS[weight];
};

export const getFontStyle = (weight: 'regular' | 'medium' | 'bold' | 'italic' = 'regular') => {
  return {
    fontFamily: getFontFamily(weight),
  };
};

// Предустановленные стили для часто используемых текстов
export const textStyles = {
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    fontWeight: 'bold' as const,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    fontWeight: '400' as const,
  },
  small: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    fontWeight: '400' as const,
  },
  button: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    fontWeight: '400' as const,
  },
};

