/**
 * conflictChecker.ts
 *
 * Módulo puro de verificação de conflitos para o Problema das N-Rainhas.
 *
 * Este arquivo é completamente independente de qualquer componente React
 * ou estado de UI. Ele pode ser importado e utilizado diretamente por
 * algoritmos de otimização (backtracking, heurísticas, etc.) em etapas futuras.
 *
 * Regras de conflito entre duas rainhas A e B:
 *   1. Mesma linha:    A.row === B.row
 *   2. Mesma coluna:   A.col === B.col
 *   3. Mesma diagonal: Math.abs(A.row - B.row) === Math.abs(A.col - B.col)
 */

import { Queen } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Função auxiliar interna (não exportada)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Verifica se duas rainhas se atacam mutuamente.
 * Cobre conflitos de linha, coluna e diagonal (principal e secundária).
 */
function queensConflict(a: Queen, b: Queen): boolean {
  return (
    a.row === b.row ||
    a.col === b.col ||
    Math.abs(a.row - b.row) === Math.abs(a.col - b.col)
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// API pública
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Verifica se uma rainha específica está em conflito com alguma das demais.
 *
 * A rainha alvo é excluída da comparação pela sua posição (row, col),
 * portanto ela pode estar presente dentro do array `queens`.
 *
 * @param queen  - A rainha a ser verificada
 * @param queens - Lista completa de rainhas posicionadas no tabuleiro
 * @returns `true` se houver ao menos um conflito com outra rainha
 *
 * @example
 * hasConflict({ row: 0, col: 1 }, [{ row: 0, col: 1 }, { row: 1, col: 3 }])
 * // → false (a segunda rainha não conflita com a primeira)
 */
export function hasConflict(queen: Queen, queens: Queen[]): boolean {
  return queens.some(
    (other) =>
      // Exclui a própria rainha da comparação
      !(other.row === queen.row && other.col === queen.col) &&
      queensConflict(queen, other)
  );
}

/**
 * Retorna o conjunto de identificadores de posição de todas as rainhas
 * que estão envolvidas em ao menos um conflito.
 *
 * O identificador de cada posição é a string `"row,col"`.
 * Esse formato permite verificação em O(1) com `Set.has()`.
 *
 * @param queens - Lista de rainhas posicionadas no tabuleiro
 * @returns `Set<string>` com as chaves das rainhas conflitantes
 *
 * @example
 * // Rainhas na mesma coluna:
 * getConflictingQueens([{ row: 0, col: 2 }, { row: 3, col: 2 }])
 * // → Set { "0,2", "3,2" }
 */
export function getConflictingQueens(queens: Queen[]): Set<string> {
  const conflicting = new Set<string>();

  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      if (queensConflict(queens[i], queens[j])) {
        conflicting.add(`${queens[i].row},${queens[i].col}`);
        conflicting.add(`${queens[j].row},${queens[j].col}`);
      }
    }
  }

  return conflicting;
}

/**
 * Conta o número de pares de rainhas em conflito.
 *
 * Cada par (A, B) é contado uma única vez.
 * Se três rainhas se atacam mutuamente, o resultado é 3 (não 6).
 *
 * @param queens - Lista de rainhas posicionadas no tabuleiro
 * @returns Número inteiro de pares conflitantes (≥ 0)
 *
 * @example
 * // Solução válida N=4:
 * countConflicts([
 *   { row: 0, col: 1 }, { row: 1, col: 3 },
 *   { row: 2, col: 0 }, { row: 3, col: 2 }
 * ])
 * // → 0
 */
export function countConflicts(queens: Queen[]): number {
  let count = 0;

  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      if (queensConflict(queens[i], queens[j])) {
        count++;
      }
    }
  }

  return count;
}
