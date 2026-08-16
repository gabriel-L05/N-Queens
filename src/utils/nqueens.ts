import { Position, ConflictPair } from '../types';

export const KNOWN_SOLUTIONS: Record<number, { total: number; fundamental: number }> = {
  1: { total: 1, fundamental: 1 },
  2: { total: 0, fundamental: 0 },
  3: { total: 0, fundamental: 0 },
  4: { total: 2, fundamental: 1 },
  5: { total: 10, fundamental: 2 },
  6: { total: 4, fundamental: 1 },
  7: { total: 40, fundamental: 6 },
  8: { total: 92, fundamental: 12 },
  9: { total: 352, fundamental: 46 },
  10: { total: 724, fundamental: 92 },
  11: { total: 2680, fundamental: 341 },
  12: { total: 14200, fundamental: 1787 },
  13: { total: 73712, fundamental: 9233 },
  14: { total: 365596, fundamental: 45752 },
  15: { total: 2279184, fundamental: 285053 },
  16: { total: 14772512, fundamental: 1846955 },
};

/**
 * Checks all pairwise conflicts between queens on the board.
 */
export function getConflicts(queens: Position[]): ConflictPair[] {
  const conflicts: ConflictPair[] = [];
  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      const q1 = queens[i];
      const q2 = queens[j];

      if (q1.row === q2.row) {
        conflicts.push({ queen1: q1, queen2: q2, type: 'row' });
      } else if (q1.col === q2.col) {
        conflicts.push({ queen1: q1, queen2: q2, type: 'col' });
      } else if (q1.row - q1.col === q2.row - q2.col) {
        conflicts.push({ queen1: q1, queen2: q2, type: 'diag-main' });
      } else if (q1.row + q1.col === q2.row + q2.col) {
        conflicts.push({ queen1: q1, queen2: q2, type: 'diag-anti' });
      }
    }
  }
  return conflicts;
}

/**
 * Returns set of string keys "row,col" of all queens that are in conflict.
 */
export function getConflictingQueensSet(queens: Position[]): Set<string> {
  const conflicting = new Set<string>();
  const pairs = getConflicts(queens);
  for (const pair of pairs) {
    conflicting.add(`${pair.queen1.row},${pair.queen1.col}`);
    conflicting.add(`${pair.queen2.row},${pair.queen2.col}`);
  }
  return conflicting;
}

/**
 * Returns a 2D boolean array representing whether a cell is along a conflict ray between two clashing queens.
 */
export function getConflictPathCells(n: number, conflicts: ConflictPair[]): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

  for (const conf of conflicts) {
    const { queen1, queen2, type } = conf;
    if (type === 'row') {
      const minCol = Math.min(queen1.col, queen2.col);
      const maxCol = Math.max(queen1.col, queen2.col);
      for (let c = minCol; c <= maxCol; c++) {
        matrix[queen1.row][c] = true;
      }
    } else if (type === 'col') {
      const minRow = Math.min(queen1.row, queen2.row);
      const maxRow = Math.max(queen1.row, queen2.row);
      for (let r = minRow; r <= maxRow; r++) {
        matrix[r][queen1.col] = true;
      }
    } else if (type === 'diag-main') {
      const minRow = Math.min(queen1.row, queen2.row);
      const maxRow = Math.max(queen1.row, queen2.row);
      const minCol = Math.min(queen1.col, queen2.col);
      for (let k = 0; k <= maxRow - minRow; k++) {
        matrix[minRow + k][minCol + k] = true;
      }
    } else if (type === 'diag-anti') {
      const startQueen = queen1.row < queen2.row ? queen1 : queen2;
      const endQueen = queen1.row < queen2.row ? queen2 : queen1;
      const diff = endQueen.row - startQueen.row;
      for (let k = 0; k <= diff; k++) {
        const r = startQueen.row + k;
        const c = startQueen.col - k;
        if (r >= 0 && r < n && c >= 0 && c < n) {
          matrix[r][c] = true;
        }
      }
    }
  }

  return matrix;
}

/**
 * Solves N-Queens using recursive backtracking and returns array of valid solutions (each solution is an array of column indices for row 0..n-1).
 */
export function findAllSolutions(n: number, maxLimit = 200): number[][] {
  const solutions: number[][] = [];
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // row - col
  const diag2 = new Set<number>(); // row + col
  const current: number[] = [];

  function backtrack(row: number) {
    if (row === n) {
      solutions.push([...current]);
      return;
    }
    if (solutions.length >= maxLimit) return;

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;
      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;

      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);
      current.push(col);

      backtrack(row + 1);

      current.pop();
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return solutions;
}

/**
 * Fast Min-Conflicts local search solver for finding a solution quickly even on large N (e.g. N=12..30).
 */
export function solveMinConflicts(n: number, maxSteps = 10000): number[] | null {
  if (n <= 3) return null;

  // Initialize randomly with 1 queen per row
  const queens: number[] = Array.from({ length: n }, () => Math.floor(Math.random() * n));

  for (let step = 0; step < maxSteps; step++) {
    // Find all rows with conflicts
    const conflictRows: number[] = [];
    for (let r = 0; r < n; r++) {
      let rowConflicts = 0;
      for (let otherR = 0; otherR < n; otherR++) {
        if (r === otherR) continue;
        if (
          queens[r] === queens[otherR] ||
          Math.abs(queens[r] - queens[otherR]) === Math.abs(r - otherR)
        ) {
          rowConflicts++;
        }
      }
      if (rowConflicts > 0) {
        conflictRows.push(r);
      }
    }

    if (conflictRows.length === 0) {
      return queens; // Found a conflict-free solution!
    }

    // Pick a random conflicted row
    const varRow = conflictRows[Math.floor(Math.random() * conflictRows.length)];

    // Find column with minimum conflicts for varRow
    let minConf = Infinity;
    let bestCols: number[] = [];

    for (let c = 0; c < n; c++) {
      let cConflicts = 0;
      for (let otherR = 0; otherR < n; otherR++) {
        if (varRow === otherR) continue;
        if (
          c === queens[otherR] ||
          Math.abs(c - queens[otherR]) === Math.abs(varRow - otherR)
        ) {
          cConflicts++;
        }
      }
      if (cConflicts < minConf) {
        minConf = cConflicts;
        bestCols = [c];
      } else if (cConflicts === minConf) {
        bestCols.push(c);
      }
    }

    // Assign queen to best col (random tie-breaker)
    queens[varRow] = bestCols[Math.floor(Math.random() * bestCols.length)];
  }

  // Fallback to backtracking if local search didn't converge within maxSteps
  const fallback = findAllSolutions(n, 1);
  return fallback.length > 0 ? fallback[0] : null;
}
