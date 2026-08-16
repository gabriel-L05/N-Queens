import { NavigationTab } from '../types';
import { HelpCircle, Settings, Grid3X3 } from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenHelp: () => void;
  onOpenSettings: () => void;
}

export const Header = ({
  activeTab,
  onTabChange,
  onOpenHelp,
  onOpenSettings,
}: HeaderProps) => {
  return (
    <header className="w-full bg-[#0a0e1a] border-b border-slate-800/80 px-6 py-4 flex items-center justify-between z-30 sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/30">
          <Grid3X3 className="w-5 h-5 text-purple-100" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-purple-200">
          N-Queens Scholar
        </h1>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="flex items-center gap-8">
        {(['dashboard', 'theory'] as NavigationTab[]).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab === 'dashboard' ? 'Dashboard' : 'Teoria & Algoritmos';
          return (
            <button
              key={tab}
              id={`nav-tab-${tab}`}
              onClick={() => onTabChange(tab)}
              className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <button
          id="btn-help"
          onClick={onOpenHelp}
          className="p-2 text-slate-400 hover:text-purple-300 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
          title="Como usar & Guia rápido"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          id="btn-settings"
          onClick={onOpenSettings}
          className="p-2 text-slate-400 hover:text-purple-300 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
          title="Configurações do Visualizador"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
