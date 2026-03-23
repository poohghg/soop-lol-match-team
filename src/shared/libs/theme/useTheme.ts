'use client';

import { getTheme, setTheme, Theme } from '@/src/shared/libs/theme/theme';
import { useState } from 'react';

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(getTheme());

  if (typeof window !== 'undefined') {
    const storedTheme = getTheme();
    if (storedTheme !== theme) {
      setThemeState(storedTheme);
    }
  }

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  return {
    theme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    setTheme: updateTheme,
    toggleTheme,
  };
};
