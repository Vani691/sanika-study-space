import { BookOpenText } from 'lucide-react';

function Navbar() {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-icon"><BookOpenText size={18} /></div>
        <div>
          <p className="brand-name">Sanika’s Study Space</p>
          <span className="brand-sub">A calm little focus corner</span>
        </div>
      </div>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="#dashboard">Dashboard</a>
        <a href="#tasks">Tasks</a>
        <a href="#focus">Focus</a>
      </nav>
    </header>
  );
}

export default Navbar;
