
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'professional-blue' | 'modern-light' | 'focused-dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
  toggleColorTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    // Check if system prefers dark mode
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme || (systemPrefersDark ? 'dark' : 'light');
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    // Check if color theme preference exists in localStorage
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
    return savedColorTheme || 'professional-blue';
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Toggle between color themes in a cycle
  const toggleColorTheme = () => {
    setColorTheme((prevColorTheme) => {
      switch (prevColorTheme) {
        case 'professional-blue':
          return 'modern-light';
        case 'modern-light':
          return 'focused-dark';
        case 'focused-dark':
          return 'professional-blue';
        default:
          return 'professional-blue';
      }
    });
  };

  // Update the class on the html element when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save the preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply color theme classes when color theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all color theme classes
    root.classList.remove('professional-blue', 'modern-light', 'focused-dark');
    
    // Add the new color theme class
    root.classList.add(colorTheme);
    
    // Save the preference to localStorage
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      colorTheme, 
      setColorTheme, 
      toggleTheme, 
      toggleColorTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
