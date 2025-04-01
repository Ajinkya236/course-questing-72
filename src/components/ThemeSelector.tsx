
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ThemeSelector = () => {
  const { theme, toggleTheme, colorTheme, toggleColorTheme, setColorTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {theme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleTheme}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setColorTheme('professional-blue')} className={colorTheme === 'professional-blue' ? 'bg-primary/10' : ''}>
          Jio Blue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorTheme('modern-light')} className={colorTheme === 'modern-light' ? 'bg-primary/10' : ''}>
          Modern Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorTheme('focused-dark')} className={colorTheme === 'focused-dark' ? 'bg-primary/10' : ''}>
          Dark Theme
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleColorTheme}>
          <Palette className="mr-2 h-4 w-4" />
          Cycle Themes
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
