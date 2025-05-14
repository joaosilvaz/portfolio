'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';
  const buttonClass = `fixed bottom-5 right-6 z-50 p-3 rounded-full shadow transition-colors cursor-pointer ${isDark ? 'bg-white text-black' : 'bg-black text-white'
    }`;

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className={buttonClass}>
      {isDark ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </button>
  );
};
