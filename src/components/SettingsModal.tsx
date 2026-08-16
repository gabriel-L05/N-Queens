import { X, Settings, Eye, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCoordinates: boolean;
  onToggleCoordinates: () => void;
  showThreats: boolean;
  onToggleThreats: () => void;
  theme: string;
  onChangeTheme: (theme: string) => void;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  showCoordinates,
  onToggleCoordinates,
  showThreats,
  onToggleThreats,
  theme,
  onChangeTheme,
}: SettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0a0e1a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-600/20 text-purple-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Configurações Visuais</h3>
              <p className="text-xs text-slate-400">Personalize o canvas e indicadores</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 text-xs text-slate-300">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-purple-400" />
              <div>
                <span className="font-semibold text-slate-200 block">Exibir Coordenadas (A-H, 1-8)</span>
                <span className="text-[11px] text-slate-500">Rótulos algébricos de linhas e colunas</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={showCoordinates}
              onChange={onToggleCoordinates}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded bg-rose-950 border border-rose-500/40" />
              <div>
                <span className="font-semibold text-slate-200 block">Exibir Raios de Ameaça</span>
                <span className="text-[11px] text-slate-500">Destaque vermelho nos vetores de ataque</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={showThreats}
              onChange={onToggleThreats}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-500 cursor-pointer"
            />
          </label>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2">
            <span className="font-semibold text-slate-200">Tema do Tabuleiro</span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { id: 'scholar-dark', label: 'Scholar Dark' },
                { id: 'midnight', label: 'Midnight Navy' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => onChangeTheme(t.id)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-between transition-all cursor-pointer ${
                    theme === t.id
                      ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{t.label}</span>
                  {theme === t.id && <Check className="w-3 h-3 text-purple-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0a0e1a] flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-semibold bg-purple-300 hover:bg-purple-200 text-purple-950 transition-colors cursor-pointer"
          >
            Salvar & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
