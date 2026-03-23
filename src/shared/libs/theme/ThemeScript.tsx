export const ThemeScript = () => {
  const code = `
    (function() {
      try {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = savedTheme || systemTheme;
        document.documentElement.dataset.theme = theme;
      } catch (e) {
        console.error("Theme script error", e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
};
