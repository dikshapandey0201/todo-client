import { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import { IconButton } from '@mui/material';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (

    <IconButton
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <LightModeIcon className="text-gray-500 dark:text-gray-400" />
      ) : (
        <NightsStayOutlinedIcon className="text-gray-500 dark:text-gray-400" />
      )}
    </IconButton>
  );
};
