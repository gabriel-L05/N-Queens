/**
 * StatusPanel.tsx
 *
 * Painel lateral direito que exibe o estado atual do tabuleiro.
 * Mostra contagem de rainhas, número de conflitos e status da configuração.
 *
 * Recebe dados calculados pelo App (via conflictChecker) e os apresenta
 * de forma visual seguindo o design do projeto.
 */

import { useState, useEffect } from 'react';
import { Queen } from '../types';
import { AlertTriangle, CheckCircle2, Trash2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { QueenIcon } from './QueenIcon';

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

interface StatusPanelProps {
  /** Tamanho N do tabuleiro */
  n: number;
  /** Lista de rainhas posicionadas atualmente */
  queens: Queen[];
  /** Número de pares de rainhas em conflito (calculado por conflictChecker) */
  conflictCount: number;
  /** Callback para limpar o tabuleiro */
  onClearBoard: () => void;
  /** Callback para resolver automaticamente */
  onAutoSolve: () => void;
  /** Callback para aplicar um novo tamanho ao tabuleiro */
  onApplyN: (newN: number) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────────────────────

export const StatusPanel = ({
  n,
  queens,
  conflictCount,
  onClearBoard,
  onAutoSolve,
  onApplyN,
}: StatusPanelProps) => {
  const [tempN, setTempN] = useState<number>(n);
  
  useEffect(() => {
    setTempN(n);
  }, [n]);

  const hasConflicts = conflictCount > 0;
  const isComplete = queens.length === n && !hasConflicts;

  // Texto do status de conflito no plural/singular correto
  const conflictLabel =
    conflictCount === 1 ? '1 conflito' : `${conflictCount} conflitos`;

  return (
    <div className="w-80 flex flex-col gap-4 flex-shrink-0">
      {/* ── Card de Status ──────────────────────────────────────────────────── */}
      <div
        className={`rounded-2xl p-5 border transition-all ${
          hasConflicts
            ? 'bg-[#12131d] border-rose-600/40 shadow-lg shadow-rose-950/20'
            : isComplete
            ? 'bg-[#111927] border-emerald-500/40 shadow-lg shadow-emerald-950/20'
            : 'bg-[#111625] border-slate-800'
        }`}
      >
        {/* Título do card com ícone de estado */}
        <div className="flex items-center gap-2 mb-4">
          {hasConflicts ? (
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          ) : isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          )}
          <h3
            className={`font-bold tracking-tight text-base ${
              hasConflicts
                ? 'text-rose-200'
                : isComplete
                ? 'text-emerald-200'
                : 'text-slate-100'
            }`}
          >
            Visão Geral
          </h3>
        </div>

        {/* Métricas: rainhas posicionadas e conflitos */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400">Rainhas Posicionadas</span>
            <span className="text-sm font-semibold text-slate-100 font-mono">
              {queens.length} / {n}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400">Conflitos Atuais</span>
            <span
              className={`text-sm font-semibold font-mono ${
                hasConflicts ? 'text-rose-400' : 'text-slate-100'
              }`}
            >
              {conflictCount}
            </span>
          </div>
        </div>

        {/* Pílula de status */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">Status:</span>
          {hasConflicts ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-950/60 text-rose-300 border border-rose-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              {conflictLabel}
            </span>
          ) : isComplete ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Solução Válida!
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Sem conflitos
            </span>
          )}
        </div>
      </div>

      {/* ── Card de Ações e Resolução ────────────────────────────────────────── */}
      <div className="rounded-2xl p-5 bg-[#111625] border border-slate-800 flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Ações
        </h4>

        {/* Botão de Resolução Automática */}
        <button
          id="btn-auto-solve"
          onClick={onAutoSolve}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-purple-950 bg-gradient-to-r from-purple-300 to-indigo-300 hover:from-purple-200 hover:to-indigo-200 transition-all cursor-pointer shadow-md shadow-purple-950/30 active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-purple-900" />
          <span>Resolver Automaticamente</span>
        </button>

        <button
          id="btn-clear-board"
          onClick={onClearBoard}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 transition-all cursor-pointer active:scale-[0.98]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Limpar Tabuleiro</span>
        </button>
      </div>

      {/* ── Card de Configuração do Tamanho ─────────────────────────────────── */}
      <div className="rounded-2xl p-5 bg-[#111625] border border-slate-800 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal className="w-4 h-4 text-purple-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tamanho (N)
          </h4>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300">
            <span>Redimensionar Tabuleiro</span>
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
            id="status-slider-n"
            type="range"
            min="4"
            max="32"
            step="1"
            value={tempN}
            onChange={(e) => setTempN(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400 my-2"
          />

          <button
            onClick={() => onApplyN(tempN)}
            className="w-full py-2 px-4 mt-1 rounded-xl text-xs font-semibold bg-purple-300 hover:bg-purple-200 text-purple-950 transition-all cursor-pointer shadow-md shadow-purple-950/40 active:scale-[0.98]"
          >
            Aplicar Novo Tamanho
          </button>
        </div>
      </div>

      {/* ── Card de Legenda ──────────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5 bg-[#111625] border border-slate-800 flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Legenda
        </h4>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded bg-rose-950 border border-rose-500/40" />
          <span className="text-xs text-slate-300">Caminho de Ameaça</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded border-2 border-dashed border-rose-500 bg-rose-900/20 animate-pulse" />
          <span className="text-xs text-slate-300">Rainha em Conflito</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 flex items-center justify-center">
            <QueenIcon isConflict={false} size={16} />
          </div>
          <span className="text-xs text-slate-300">Rainha Ativa (sem conflito)</span>
        </div>
      </div>

      {/* ── Dica de uso ──────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-xl bg-slate-900/50 border-l-2 border-purple-400 text-xs italic text-slate-400">
        Clique em uma célula vazia para adicionar uma rainha.<br />
        Clique novamente para removê-la.
      </div>
    </div>
  );
};
