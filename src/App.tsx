/**
 * App.tsx
 *
 * Componente raiz da aplicação N-Queens Scholar.
 *
 * Responsabilidades:
 *  - Manter o estado central: lista de rainhas (`queens`) e tamanho do tabuleiro (`n`)
 *  - Calcular conflitos e repassar os dados aos componentes filhos
 *  - Gerenciar navegação entre abas e modais
 *
 * Separação de responsabilidades:
 *  - Lógica de conflitos → src/utils/conflictChecker.ts (API pura, reutilizável)
 *  - Renderização visual → ChessBoard, StatusPanel, ConfigPanel
 *  - Estado da aplicação → este arquivo (App.tsx)
 */

import { useState, useMemo, useCallback } from 'react';
import { NavigationTab, SidebarTab, Queen } from './types';
import { getConflicts, getConflictPathCells, solveMinConflicts, findAllSolutions } from './utils/nqueens';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChessBoard } from './components/ChessBoard';
import { ConfigPanel } from './components/ConfigPanel';
import { StatusPanel } from './components/StatusPanel';
import { AnalyticsView } from './components/AnalyticsView';
import { TheoryView } from './components/TheoryView';
import { RulesModal } from './components/RulesModal';
import { ExportModal } from './components/ExportModal';
import { HelpModal } from './components/HelpModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  // ── Navegação ──────────────────────────────────────────────────────────────

  /** Aba ativa na barra superior: 'dashboard' | 'theory' */
  const [activeTopTab, setActiveTopTab] = useState<NavigationTab>('dashboard');

  /** Aba ativa na sidebar esquerda */
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('board-config');

  /**
   * Controla qual painel é exibido à direita do tabuleiro:
   *  - 'standard'    → StatusPanel (modo padrão de jogo)
   *  - 'config-only' → ConfigPanel (foco na configuração do tabuleiro)
   */
  const [layoutMode, setLayoutMode] = useState<'standard' | 'config-only'>('standard');

  // ── Estado do tabuleiro ────────────────────────────────────────────────────

  /** Tamanho N do tabuleiro (cria um grid N × N) */
  const [n, setN] = useState<number>(4);

  /**
   * Lista de rainhas posicionadas no tabuleiro.
   */
  const [queens, setQueens] = useState<Queen[]>([]);

  // ── Configurações visuais ──────────────────────────────────────────────────

  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);
  const [showThreats, setShowThreats]         = useState<boolean>(true);
  const [boardTheme, setBoardTheme]           = useState<string>('scholar-dark');

  // ── Modais ─────────────────────────────────────────────────────────────────

  const [isRulesOpen,    setIsRulesOpen]    = useState<boolean>(false);
  const [isExportOpen,   setIsExportOpen]   = useState<boolean>(false);
  const [isHelpOpen,     setIsHelpOpen]     = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // ── Cálculo de conflitos ───────────────────────────────────────────────────

  const conflicts = useMemo(() => getConflicts(queens), [queens]);

  const conflictPathMatrix = useMemo(() => {
    if (!showThreats) {
      return Array.from({ length: n }, () => Array(n).fill(false));
    }
    return getConflictPathCells(n, conflicts);
  }, [n, conflicts, showThreats]);

  // ── Handlers do tabuleiro ──────────────────────────────────────────────────

  const handleToggleQueen = useCallback((row: number, col: number) => {
    setQueens((prev) => {
      const exists = prev.some((q) => q.row === row && q.col === col);
      if (exists) {
        return prev.filter((q) => !(q.row === row && q.col === col));
      }
      if (prev.length >= n) {
        return prev;
      }
      return [...prev, { row, col }];
    });
  }, [n]);

  const handleClearBoard = useCallback(() => {
    setQueens([]);
  }, []);

  const handleApplyN = useCallback((newN: number) => {
    setN(newN);
    setQueens([]);
    setLayoutMode('standard');
  }, []);

  /** Resolve o tabuleiro automaticamente para o N atual */
  const handleAutoSolve = useCallback(() => {
    if (n <= 3) {
      alert(`Para N=${n} não existe nenhuma solução matemática possível.`);
      return;
    }
    
    // Tenta algoritmo rápido min-conflicts ou backtracking
    let solutionCols = solveMinConflicts(n);
    if (!solutionCols || solutionCols.length === 0) {
      const all = findAllSolutions(n, 1);
      if (all.length > 0) solutionCols = all[0];
    }

    if (solutionCols && solutionCols.length === n) {
      const newQueens: Queen[] = solutionCols.map((col, row) => ({ row, col }));
      setQueens(newQueens);
    }
  }, [n]);

  // ── Handlers de navegação ──────────────────────────────────────────────────

  const handleSidebarTabChange = (tab: SidebarTab) => {
    setActiveSidebarTab(tab);
    if (tab === 'rules')  setIsRulesOpen(true);
    if (tab === 'export') setIsExportOpen(true);
  };

  // ── Renderização ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-purple-900 selection:text-purple-100">

      {/* Barra de navegação superior */}
      <Header
        activeTab={activeTopTab}
        onTabChange={setActiveTopTab}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Corpo principal: sidebar + conteúdo central */}
      <div className="flex-1 flex overflow-hidden">

        {/* Sidebar esquerda */}
        <Sidebar
          activeTab={activeSidebarTab}
          onTabChange={handleSidebarTabChange}
          onResetBoard={handleClearBoard}
        />

        {/* Área de conteúdo central */}
        <main className="flex-1 flex flex-col p-6 overflow-y-auto max-w-[1700px] mx-auto w-full">

          {/* ── Aba Dashboard ─────────────────────────────────────────────── */}
          {activeTopTab === 'dashboard' && (
            <>
              {activeSidebarTab === 'analytics' ? (
                <AnalyticsView currentN={n} />
              ) : (
                <div className="flex flex-col gap-6 flex-1">

                  {/* Cabeçalho da área de trabalho */}
                  <div className="flex items-center justify-between pb-1">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        N-Rainhas Dashboard
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Tabuleiro {n}×{n} — Posicione as rainhas e observe os conflitos em tempo real.
                      </p>
                    </div>

                    {/* Badge de status global no canto superior direito */}
                    <div className="flex items-center gap-2">
                      {conflicts.length === 0 && queens.length === n ? (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>Solução Válida</span>
                        </div>
                      ) : conflicts.length > 0 ? (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-800/60 text-xs font-medium text-rose-300">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          <span>Conflito Detectado</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-slate-400" />
                          <span>Sem Conflitos</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Layout de duas colunas: tabuleiro (esq) + painel (dir) */}
                  <div className="flex flex-col lg:flex-row gap-6 flex-1 items-start">

                    {/* Tabuleiro interativo */}
                    <div className="flex-1 w-full h-[620px]">
                      <ChessBoard
                        n={n}
                        queens={queens}
                        conflicts={conflicts}
                        conflictPathMatrix={conflictPathMatrix}
                        onToggleQueen={handleToggleQueen}
                        title={`Tabuleiro ${n}×${n}`}
                        showCoordinates={showCoordinates}
                        theme={boardTheme}
                      />
                    </div>

                    {/* Painel direito: configuração ou status */}
                    {layoutMode === 'config-only' ? (
                      <ConfigPanel
                        currentN={n}
                        onApplyN={handleApplyN}
                        queens={queens}
                        conflicts={conflicts}
                      />
                    ) : (
                      <StatusPanel
                        n={n}
                        queens={queens}
                        conflictCount={conflicts.length}
                        onClearBoard={handleClearBoard}
                        onAutoSolve={handleAutoSolve}
                        onApplyN={handleApplyN}
                      />
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Aba Teoria ────────────────────────────────────────────────── */}
          {activeTopTab === 'theory' && <TheoryView />}

        </main>
      </div>

      {/* ── Modais ──────────────────────────────────────────────────────────── */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        n={n}
        queens={queens}
      />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        showCoordinates={showCoordinates}
        onToggleCoordinates={() => setShowCoordinates((prev) => !prev)}
        showThreats={showThreats}
        onToggleThreats={() => setShowThreats((prev) => !prev)}
        theme={boardTheme}
        onChangeTheme={setBoardTheme}
      />
    </div>
  );
}
