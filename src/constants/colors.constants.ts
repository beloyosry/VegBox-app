export const colors = {
  // Primary colors
  primary: '#68B984',
  primaryDark: '#5AA876',
  primaryLight: '#E8F5E9',

  // Icons
  activeIcon: '#68B984',
  inactiveIcon: '#B9BABD',
  
  // Secondary colors
  secondary: '#FF6B6B',
  secondaryLight: '#FFE5E5',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  
  // Text colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Category colors
  category: {
    vegetable: '#E8F5E9',
    fruit: '#FFF9C4',
    meat: '#FFEBEE',
    seafood: '#FFE0B2',
    protein: '#F5F5F5',
    poultry: '#FCE4EC',
  },
} as const;

export type ColorKey = keyof typeof colors;
