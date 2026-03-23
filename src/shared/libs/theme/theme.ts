export type Theme = 'light' | 'dark';

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme as Theme;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const setTheme = (theme: Theme) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};
