import { X, HelpCircle, MousePointer, Cpu, BarChart } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0a0e1a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-600/20 text-purple-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Guia de Uso & Instruções</h3>
              <p className="text-xs text-slate-400">Como interagir com o laboratório de N-Rainhas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <MousePointer className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-200 mb-1">Posicionamento Manual</h4>
              <p className="text-slate-400 leading-relaxed">
                Clique em qualquer casa do tabuleiro para adicionar uma rainha. Clique novamente sobre ela para removê-la. O sistema calculará instantaneamente se ela está sob ataque.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <Cpu className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-200 mb-1">Resolução Automática</h4>
              <p className="text-slate-400 leading-relaxed">
                Clique no botão <strong>Resolver Automaticamente</strong> no painel lateral para encontrar instantaneamente uma disposição livre de ataques mútuos calculada por algoritmos de satisfação de restrições (CSP / Backtracking).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <BarChart className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-200 mb-1">Análise de Complexidade & Teoria</h4>
              <p className="text-slate-400 leading-relaxed">
                Acesse a aba <strong>Teoria & Algoritmos</strong> no topo ou o menu <strong>Analytics</strong> para analisar as métricas combinatórias e formulações matemáticas do problema.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0a0e1a] flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-semibold bg-purple-300 hover:bg-purple-200 text-purple-950 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
