import { Menu, Moon, Sun, Shield, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Navbar() {
  const { role, setRole, darkMode, setDarkMode, activePage, setSidebarOpen } = useApp();

  return (
    <header className="sticky top-0 z-20 bg-deep/90 backdrop-blur-md border-b border-violet/20 px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-blush/70 hover:text-white transition-colors"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="font-display font-semibold text-white text-xl leading-tight">
            {PAGE_TITLES[activePage]}
          </h1>
          <p className="text-xs text-blush/40 font-mono hidden sm:block">
            April 2024 · Demo
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <div className="flex items-center bg-white/5 rounded-xl border border-violet/25 p-1 gap-1">
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              role === 'admin'
                ? 'bg-gradient-to-r from-violet to-magenta text-white shadow-md'
                : 'text-blush/60 hover:text-blush'
            }`}
          >
            <Shield size={12} />
            <span className="hidden sm:inline">Admin</span>
          </button>
          <button
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              role === 'viewer'
                ? 'bg-gradient-to-r from-violet to-magenta text-white shadow-md'
                : 'text-blush/60 hover:text-blush'
            }`}
          >
            <Eye size={12} />
            <span className="hidden sm:inline">Viewer</span>
          </button>
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-9 h-9 rounded-xl bg-white/5 border border-violet/25 flex items-center justify-center text-blush/70 hover:text-white hover:border-magenta/40 transition-all duration-200"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
