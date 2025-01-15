import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  setIsSystemTheme: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const [manualTheme, setManualTheme] = useState<Theme>('dark');

  // Get the active theme based on system preference or manual selection
  const theme = isSystemTheme ? (systemColorScheme as Theme || 'light') : manualTheme;

  // Update theme when system preferences change
  useEffect(() => {
    if (isSystemTheme && systemColorScheme) {
      setManualTheme(systemColorScheme as Theme);
    }
  }, [systemColorScheme, isSystemTheme]);

  const toggleTheme = () => {
    if (isSystemTheme) {
      // If currently using system theme, switch to manual and toggle
      setIsSystemTheme(false);
      setManualTheme(systemColorScheme === 'dark' ? 'light' : 'dark');
    } else {
      // If using manual theme, just toggle it
      setManualTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isSystemTheme, 
      setIsSystemTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 