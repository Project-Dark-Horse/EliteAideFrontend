export const darkTheme = {
  background: '#111111',
  surface: '#1a1a1a',
  surfaceVariant: '#242424',
  card: '#2a2a2a',
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    tertiary: '#999999',
  },
  accent: {
    primary: '#3DFF98',
    warning: '#ff4757',
    pending: '#FF6B6B',
    inProgress: '#4834D4',
    completed: '#20BF6B',
  },
  priority: {
    high: '#ff4757',
    medium: '#ffa502',
    low: '#2ed573',
  }
};

export const lightTheme = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#FAFAFA',
  card: '#FFFFFF',
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#888888',
  },
  accent: {
    primary: '#2ECC71',
    warning: '#E74C3C',
    pending: '#E74C3C',
    inProgress: '#3498DB',
    completed: '#27AE60',
  },
  priority: {
    high: '#E74C3C',
    medium: '#F39C12',
    low: '#27AE60',
  }
};

export type Theme = typeof darkTheme; 