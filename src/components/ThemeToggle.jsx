import { MoonStar, SunMedium } from 'lucide-react';

function ThemeToggle({ theme, onToggle }) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label="Toggle color theme">
      {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
      <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}

export default ThemeToggle;
