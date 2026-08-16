import { SidebarTab } from '../types';
import { Sliders, BarChart2, BookOpen, Share2, RotateCcw, Cpu } from 'lucide-react';

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onResetBoard: () => void;
}

export const Sidebar = ({
  activeTab,
  onTabChange,
  onResetBoard,
}: SidebarProps) => {
  const menuItems: { id: SidebarTab; label: string; icon: typeof Sliders }[] = [
    { id: 'board-config', label: 'Board Config', icon: Sliders },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'rules', label: 'Rules', icon: BookOpen },
    { id: 'export', label: 'Export', icon: Share2 },
  ];

  return (
    <aside className="w-64 bg-[#0c101d] border-r border-slate-800/80 flex flex-col p-4 flex-shrink-0">
      {/* Logic Lab Header */}
      <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-slate-900/60 border border-slate-800/50">
        <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-200 leading-tight">Logic Lab</h2>
          <p className="text-xs text-slate-500">Algorithmic Complexity</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-1.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Reset Board Button */}
      <div className="pt-4 border-t border-slate-800/60">
        <button
          id="btn-reset-board"
          onClick={onResetBoard}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/50 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Board</span>
        </button>
      </div>
    </aside>
  );
};
