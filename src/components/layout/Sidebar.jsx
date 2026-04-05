import { LayoutDashboard, ArrowLeftRight, Lightbulb, X, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',    Icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', Icon: ArrowLeftRight  },
  { id: 'insights',     label: 'Insights',     Icon: Lightbulb       },
];

export default function Sidebar() {
  const { activePage, setActivePage, sidebarOpen, setSidebarOpen } = useApp();

  const nav = (id) => { setActivePage(id); setSidebarOpen(false); };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-40 w-64
        bg-deep border-r border-violet/20
        flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-violet/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-magenta to-violet flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">FinTrack</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-blush/60 hover:text-blush transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => nav(id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 text-left
                ${activePage === id
                  ? 'bg-gradient-to-r from-violet/50 to-magenta/20 text-white border border-magenta/30'
                  : 'text-blush/70 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon size={18} className={activePage === id ? 'text-magenta' : ''} />
              {label}
              {activePage === id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-magenta" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-violet/20">
          <p className="text-xs text-blush/40 text-center font-mono">v1.0 · Demo Mode</p>
        </div>
      </aside>
    </>
  );
}
