'use client';

import { useTheme } from '@/src/shared/libs/theme/useTheme';
import { LoadCircleIcon } from '@/src/shared/uiKit/components';
import { Moon, Sun } from 'lucide-react';
import dynamic from 'next/dynamic';

export const ThemeButton = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="bg-card border-card-border hover:bg-muted rounded-lg border p-3 transition-colors"
    >
      {isDark ? <Sun className="text-foreground h-5 w-5" /> : <Moon className="text-foreground h-5 w-5" />}
    </button>
  );
};

export const LazyThemeButton = dynamic(() => Promise.resolve(ThemeButton), {
  ssr: false,
  loading: () => (
    <button className="bg-card border-card-border cursor-not-allowed rounded-lg border p-3 opacity-50">
      <LoadCircleIcon className="text-foreground h-5 w-5" />
    </button>
  ),
});
