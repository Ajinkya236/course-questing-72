
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Palette } from 'lucide-react';

interface ThemeSelectorProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  variant = 'outline',
  size = 'icon'
}) => {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const cycleColorTheme = () => {
    if (colorTheme === 'professional-blue') {
      setColorTheme('modern-light');
    } else if (colorTheme === 'modern-light') {
      setColorTheme('focused-dark');
    } else {
      setColorTheme('professional-blue');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant={variant} 
        size={size} 
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      </Button>

      <Button 
        variant={variant} 
        size={size} 
        onClick={cycleColorTheme}
        aria-label="Change color theme"
      >
        <Palette className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
};

export default ThemeSelector;
