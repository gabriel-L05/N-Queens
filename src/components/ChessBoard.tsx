import { useState, useRef } from 'react';
import { Position, ConflictPair } from '../types';
import { QueenIcon } from './QueenIcon';
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface ChessBoardProps {
  n: number;
  queens: Position[];
  conflicts: ConflictPair[];
  conflictPathMatrix: boolean[][];
  onToggleQueen: (row: number, col: number) => void;
  title?: string;
  showCoordinates?: boolean;
  theme?: string;
}

export const ChessBoard = ({
  n,
  queens,
  conflicts,
  conflictPathMatrix,
  onToggleQueen,
  title,
  showCoordinates = true,
  theme = 'scholar-dark',
}: ChessBoardProps) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null);
  const boardContainerRef = useRef<HTMLDivElement>(null);

  // Set of queen locations
  const queenMap = new Map<string, Position>();
  for (const q of queens) {
    queenMap.set(`${q.row},${q.col}`, q);
  }

  // Set of conflicting queen keys
  const conflictingQueens = new Set<string>();
  for (const conf of conflicts) {
    conflictingQueens.add(`${conf.queen1.row},${conf.queen1.col}`);
    conflictingQueens.add(`${conf.queen2.row},${conf.queen2.col}`);
  }

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.7));

  const toggleFullscreen = () => {
    if (!boardContainerRef.current) return;
    if (!isFullscreen) {
      if (boardContainerRef.current.requestFullscreen) {
        boardContainerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const getColLetter = (c: number) => {
    let letter = '';
    let temp = c;
    while (temp >= 0) {
      letter = String.fromCharCode(65 + (temp % 26)) + letter;
      temp = Math.floor(temp / 26) - 1;
    }
    return letter;
  };
  const getRowNumber = (r: number) => n - r;

  return (
    <div
      ref={boardContainerRef}
      className={`flex flex-col bg-[#0f1422] rounded-2xl border border-slate-800/80 p-5 shadow-2xl relative transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 p-8 bg-[#0a0e1a] overflow-auto' : 'w-full h-full'
      }`}
    >
      {/* Canvas Top Bar */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-200">
            {title || `Live State: N=${n} Matrix`}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            {queens.length}/{n} {queens.length === 1 ? 'Rainha' : 'Rainhas'}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          <button
            id="btn-board-zoom-in"
            onClick={handleZoomIn}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-board-zoom-out"
            onClick={handleZoomOut}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Diminuir zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-board-fullscreen"
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Board Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[380px] p-2 overflow-auto">
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
          className="transition-transform duration-150 relative"
        >
          {/* Coordinates Header (Cols) */}
          {showCoordinates && n <= 16 && (
            <div
              className="grid gap-1 mb-1.5 text-center text-[10px] font-mono text-slate-500 font-medium select-none"
              style={{
                gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                paddingLeft: n <= 10 ? '20px' : '0px',
              }}
            >
              {Array.from({ length: n }).map((_, c) => (
                <div key={c}>{getColLetter(c)}</div>
              ))}
            </div>
          )}

          <div className="flex items-center">
            {/* Coordinates Left (Rows) */}
            {showCoordinates && n <= 10 && (
              <div
                className="grid gap-1 mr-2 text-right text-[10px] font-mono text-slate-500 font-medium select-none"
                style={{
                  gridTemplateRows: `repeat(${n}, minmax(0, 1fr))`,
                  height: n <= 6 ? '320px' : n <= 8 ? '400px' : '480px',
                }}
              >
                {Array.from({ length: n }).map((_, r) => (
                  <div key={r} className="flex items-center justify-end pr-1">
                    {getRowNumber(r)}
                  </div>
                ))}
              </div>
            )}

            {/* Chess Grid Container */}
            <div
              className="grid gap-1 bg-[#090d16] p-2 rounded-xl border border-slate-800 shadow-2xl relative select-none"
              style={{
                gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                width: n <= 4 ? '320px' : n <= 6 ? '380px' : n <= 8 ? '460px' : n <= 12 ? '540px' : n <= 20 ? '600px' : n <= 32 ? '700px' : '800px',
                height: n <= 4 ? '320px' : n <= 6 ? '380px' : n <= 8 ? '460px' : n <= 12 ? '540px' : n <= 20 ? '600px' : n <= 32 ? '700px' : '800px',
              }}
            >
              {Array.from({ length: n }).map((_, r) =>
                Array.from({ length: n }).map((__, c) => {
                  const key = `${r},${c}`;
                  const hasQueen = queenMap.has(key);
                  const isConflicting = conflictingQueens.has(key);
                  const isConflictRay = conflictPathMatrix[r]?.[c] && !hasQueen;
                  const isDarkSquare = (r + c) % 2 === 1;
                  const isHovered = hoveredCell?.row === r && hoveredCell?.col === c;

                  let lightCellBg = 'bg-[#222c42]';
                  let darkCellBg = 'bg-[#182032]';
                  let hoverCellBg = 'hover:bg-[#2c3955]';

                  if (theme === 'midnight') {
                    lightCellBg = 'bg-slate-800';
                    darkCellBg = 'bg-slate-950';
                    hoverCellBg = 'hover:bg-slate-700';
                  }

                  // Icon size dynamic based on N
                  const iconSize = n <= 4 ? 36 : n <= 6 ? 28 : n <= 8 ? 22 : n <= 12 ? 16 : n <= 20 ? 12 : n <= 32 ? 8 : 4;

                  return (
                    <button
                      key={key}
                      id={`cell-${r}-${c}`}
                      onClick={() => onToggleQueen(r, c)}
                      onMouseEnter={() => setHoveredCell({ row: r, col: c })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`relative flex items-center justify-center rounded-md transition-all duration-150 cursor-pointer overflow-hidden group ${
                        isDarkSquare ? darkCellBg : lightCellBg
                      } ${
                        isConflictRay
                          ? 'bg-rose-950/40 border border-rose-500/30'
                          : hoverCellBg
                      } ${
                        isConflicting
                          ? 'ring-2 ring-rose-500 ring-offset-2 ring-offset-[#090d16] bg-rose-900/30 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                          : hasQueen
                          ? 'ring-1 ring-purple-400/50 bg-purple-950/40 shadow-[0_0_10px_rgba(192,132,252,0.3)]'
                          : ''
                      }`}
                    >
                      {/* Threat ray subtle diagonal/cross pattern */}
                      {isConflictRay && (
                        <div className="absolute inset-0 bg-red-500/10 pointer-events-none" />
                      )}

                      {/* Placed Queen */}
                      {hasQueen && (
                        <QueenIcon
                          isConflict={isConflicting}
                          size={iconSize}
                          className="z-10"
                        />
                      )}

                      {/* Ghost preview on hover if cell is empty */}
                      {!hasQueen && isHovered && (
                        <div className="opacity-40 transition-opacity">
                          <QueenIcon isConflict={false} size={iconSize * 0.85} />
                        </div>
                      )}

                      {/* Small coordinate indicator in corners for clarity */}
                      {n <= 6 && (
                        <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-slate-500/60 pointer-events-none">
                          {getColLetter(c)}
                          {getRowNumber(r)}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Caption / Helper info */}
      <div className="text-center pt-2">
        <p className="text-xs italic text-slate-400">
          "Clique em uma célula para posicionar ou remover uma rainha."
        </p>
      </div>
    </div>
  );
};
