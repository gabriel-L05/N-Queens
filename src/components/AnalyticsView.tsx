import { KNOWN_SOLUTIONS } from '../utils/nqueens';
import { BarChart3, TrendingUp, Layers, Activity } from 'lucide-react';

interface AnalyticsViewProps {
  currentN: number;
}

export const AnalyticsView = ({ currentN }: AnalyticsViewProps) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-6 overflow-auto pr-2">
      {/* Header Banner */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Algorithmic Analytics & Complexity
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Theoretical scaling, search tree pruning efficiency, and state space explosion analysis.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111625] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Espaço de Busca Bruto</span>
              <Activity className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              N^{currentN} = {(Math.pow(currentN, currentN)).toExponential(2)}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Combinações totais sem restrições de linha/coluna.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111625] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Permutações Linha/Coluna</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-cyan-300 font-mono">
              {currentN}! = {factorial(currentN).toLocaleString()}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Espaço de busca colocando exatamente uma rainha por linha/coluna.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111625] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Soluções Válidas (N={currentN})</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-purple-300 font-mono">
              {KNOWN_SOLUTIONS[currentN]?.total?.toLocaleString() || 'N/A'}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Fundamentais: {KNOWN_SOLUTIONS[currentN]?.fundamental?.toLocaleString() || 'N/A'} (sem simetrias).
          </p>
        </div>
      </div>

      {/* Solutions Table & Complexity Matrix */}
      <div className="rounded-2xl p-6 bg-[#111625] border border-slate-800 flex flex-col gap-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span>Tabela de Crescimento Combinatório (OEIS A000170)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/60">
                <th className="py-3 px-4 rounded-l-lg">Tamanho (N)</th>
                <th className="py-3 px-4">Soluções Totais</th>
                <th className="py-3 px-4">Soluções Fundamentais</th>
                <th className="py-3 px-4">Taxa de Eficiência</th>
                <th className="py-3 px-4 rounded-r-lg">Complexidade Estimada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {Object.entries(KNOWN_SOLUTIONS).map(([nStr, data]) => {
                const nVal = Number(nStr);
                const isCurrent = nVal === currentN;
                return (
                  <tr
                    key={nVal}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-purple-950/40 text-purple-200 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-bold flex items-center gap-2">
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                      N = {nVal}
                    </td>
                    <td className="py-2.5 px-4">{data.total.toLocaleString()}</td>
                    <td className="py-2.5 px-4">{data.fundamental.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {nVal <= 3 ? '0%' : `${((data.total / factorial(nVal)) * 100).toExponential(2)}%`}
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">O({nVal}!)</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function factorial(n: number): number {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
