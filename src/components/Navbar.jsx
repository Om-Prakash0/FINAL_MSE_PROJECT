import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const firstName = user.name.split(' ')[0];

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    setUser(null); // Instantly logs the user out
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black text-indigo-600 dark:text-indigo-400">KIET Events</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`font-medium ${location.pathname === '/' ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400'}`}>Discover</Link>
            <Link to="/my-registrations" className={`font-medium ${location.pathname === '/my-registrations' ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400'}`}>My Tickets</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-xl">{isDark ? '☀️' : '🌙'}</button>
          <span className="hidden sm:block text-sm font-medium text-indigo-700 dark:text-indigo-300">Hi, {firstName}</span>
          <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700">Logout</button>
        </div>
      </div>
    </nav>
  );
}