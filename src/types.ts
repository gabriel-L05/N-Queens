/**
 * types.ts
 *
 * Definições de tipos e interfaces utilizadas em todo o projeto.
 * Centralizar os tipos aqui facilita a manutenção e o uso por algoritmos futuros.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Tipos de navegação
// ─────────────────────────────────────────────────────────────────────────────

/** Abas da navegação principal (Header) */
export type NavigationTab = 'dashboard' | 'theory';

/** Abas do menu lateral (Sidebar) */
export type SidebarTab = 'board-config' | 'analytics' | 'rules' | 'export';

// ─────────────────────────────────────────────────────────────────────────────
// Estrutura principal de dados — Rainha
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Representa a posição de uma rainha no tabuleiro N×N.
 *
 * - `row`: índice da linha   (0 = topo,     N-1 = base)
 * - `col`: índice da coluna  (0 = esquerda, N-1 = direita)
 *
 * Esta estrutura é independente da interface visual e pode ser utilizada
 * diretamente pelos algoritmos de otimização implementados no futuro.
 *
 * @example
 * // Solução válida para N=4: [1, 3, 0, 2]
 * const queens: Queen[] = [
 *   { row: 0, col: 1 },
 *   { row: 1, col: 3 },
 *   { row: 2, col: 0 },
 *   { row: 3, col: 2 },
 * ];
 */
export interface Queen {
  row: number;
  col: number;
}

/**
 * Alias de compatibilidade — semanticamente idêntico a `Queen`.
 * Mantido para não quebrar componentes que já utilizam o nome `Position`.
 */
export type Position = Queen;

// ─────────────────────────────────────────────────────────────────────────────
// Estruturas de conflito (utilizadas pelo ChessBoard para renderização visual)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Representa um par de rainhas em conflito e o tipo do conflito.
 * Utilizado internamente por `nqueens.ts` para gerar a matriz de ameaça visual.
 */
export interface ConflictPair {
  queen1: Queen;
  queen2: Queen;
  type: 'row' | 'col' | 'diag-main' | 'diag-anti';
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuração do tabuleiro
// ─────────────────────────────────────────────────────────────────────────────

/** Configurações visuais do tabuleiro (utilizadas pelo SettingsModal) */
export interface BoardConfig {
  n: number;
  showThreats: boolean;
  showCoordinates: boolean;
  zoomLevel: number;
  theme: 'scholar-dark' | 'midnight' | 'cyber-purple';
}

// ─────────────────────────────────────────────────────────────────────────────
// Tipos reservados para implementações futuras
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Motor de busca/otimização.
 * Reservado para a próxima etapa (implementação de algoritmos).
 */
export type SolverEngine = 'backtracking' | 'genetic' | 'simulated-annealing';

/**
 * Dados de solução conhecidos (utilizados por AnalyticsView).
 */
export interface SolutionData {
  n: number;
  totalSolutions: number;
  fundamentalSolutions: number;
  /** Posição de coluna para cada linha na primeira solução encontrada */
  firstSolution: number[];
}
