import { useState } from 'react';
import { Position, ConflictPair } from '../types';
import { SlidersHorizontal, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ConfigPanelProps {
  currentN: number;
  onApplyN: (newN: number) => void;
  queens: Position[];
  conflicts: ConflictPair[];
}

export const ConfigPanel = ({
  currentN,
  onApplyN,
  queens,
  conflicts,
}: ConfigPanelProps) => {
  const [tempN, setTempN] = useState<number>(currentN);
  const hasConflicts = conflicts.length > 0;

  const handleApply = () => {
    onApplyN(tempN);
  };

  return (
    <div className="w-80 flex flex-col gap-4 flex-shrink-0">
      {/* Configuração Card (Image 1) */}
      <div className="rounded-2xl p-5 bg-[#111625] border border-slate-800 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-purple-400" />
          <h3 className="font-bold tracking-tight text-base text-slate-100">
            Configuração
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300">
            <span>Tamanho do Tabuleiro (N)</span>
            <input
              type="number"
              min="4"
              max="32"
              value={tempN}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (isNaN(val)) setTempN(4);
                else if (val > 32) setTempN(32);
                else setTempN(val);
              }}
              onBlur={() => {
                if (tempN < 4) setTempN(4);
              }}
              className="w-12 h-8 rounded-lg bg-slate-900 border border-slate-700 font-mono font-bold text-purple-300 text-sm text-center focus:outline-none focus:border-purple-500"
            />
          </div>

          <input
            id="slider-n-size"
            type="range"
            min="4"
            max="32"
            step="1"
            value={tempN}
            onChange={(e) => setTempN(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400 my-2"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono px-1">
            <span>N=4 (Mini)</span>
            <span>N=8 (Clássico)</span>
            <span>N=32 (Desafio)</span>
          </div>
        </div>

        <button
          id="btn-apply-n-config"
          onClick={handleApply}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-purple-300 hover:bg-purple-200 text-purple-950 transition-all cursor-pointer shadow-md shadow-purple-950/40 active:scale-[0.98]"
        >
          Aplicar
        </button>

        <p className="text-center text-xs text-slate-400">
          Tamanho atual: <span className="font-mono text-purple-300 font-semibold">{currentN}x{currentN}</span>
        </p>
      </div>

      {/* Estado Atual (Image 1) */}
      <div className="rounded-2xl p-5 bg-[#111625] border border-slate-800 flex flex-col gap-3">
        <h3 className="font-bold tracking-tight text-base text-slate-100 mb-1">
          Estado Atual
        </h3>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
          <span className="text-xs font-medium text-slate-400">Rainhas</span>
          <span className="text-sm font-semibold text-slate-100 font-mono">
            {queens.length} / {currentN}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
          <span className="text-xs font-medium text-slate-400">Conflitos</span>
          <span
            className={`text-sm font-semibold font-mono ${
              hasConflicts ? 'text-rose-400' : 'text-slate-100'
            }`}
          >
            {conflicts.length}
          </span>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs">
          {hasConflicts ? (
            <>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="text-rose-300 font-medium">Status: Existem conflitos</span>
            </>
          ) : queens.length === currentN ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-medium">Status: Solução Válida</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Status: Sem conflitos</span>
            </>
          )}
        </div>
      </div>

      {/* Helper quote (Image 1) */}
      <div className="p-4 rounded-xl bg-slate-900/50 border-l-2 border-purple-400 text-xs italic text-slate-400">
        "Clique em uma célula para posicionar uma rainha."
      </div>
    </div>
  );
};
