import { X, BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal = ({ isOpen, onClose }: RulesModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0a0e1a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-600/20 text-purple-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Regras das N-Rainhas</h3>
              <p className="text-xs text-slate-400">Guia visual e formal de movimentação e restrições</p>
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
        <div className="p-6 overflow-y-auto flex flex-col gap-5 text-xs text-slate-300">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-purple-200">1. O Movimento da Rainha no Xadrez</h4>
            <p className="text-slate-400 leading-relaxed">
              No xadrez, a rainha (dama) é a peça com maior liberdade de movimento: ela pode se mover qualquer número de casas em linha reta horizontalmente (linhas), verticalmente (colunas) ou diagonalmente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <XCircle className="w-4 h-4" />
                <span>Situações Inválidas (Conflito)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Duas rainhas na mesma linha horizontal.</li>
                <li>Duas rainhas na mesma coluna vertical.</li>
                <li>Duas rainhas na mesma linha diagonal.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Condição de Vitória (Solução)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Exatamente N rainhas colocadas no tabuleiro N×N.</li>
                <li>Zero pares em rota de ataque mútuo.</li>
                <li>Cada linha e coluna contém exatamente 1 rainha.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-200 leading-relaxed">
            <strong className="block mb-1 text-purple-300">💡 Dica Algorítmica:</strong>
            Para tabuleiros N=2 e N=3, não existem soluções matemáticas possíveis (total = 0). A menor configuração com solução não trivial é N=4 (2 soluções).
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
