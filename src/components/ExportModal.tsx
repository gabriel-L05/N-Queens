import { useState } from 'react';
import { Position } from '../types';
import { X, Share2, Copy, Check, Download } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  n: number;
  queens: Position[];
}

export const ExportModal = ({
  isOpen,
  onClose,
  n,
  queens,
}: ExportModalProps) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  // JSON export
  const jsonData = JSON.stringify(
    {
      n,
      queensCount: queens.length,
      queens: queens.map((q) => ({ row: q.row, col: q.col })),
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );

  // ASCII Matrix export
  let asciiBoard = '';
  for (let r = 0; r < n; r++) {
    let rowStr = '';
    for (let c = 0; c < n; c++) {
      const hasQ = queens.some((q) => q.row === r && q.col === c);
      rowStr += hasQ ? ' Q ' : ' . ';
    }
    asciiBoard += rowStr + '\n';
  }

  // Array / Vector notation
  const vectorNotation = JSON.stringify(queens.map((q) => q.col));

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0a0e1a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-600/20 text-purple-300">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Exportar Configuração</h3>
              <p className="text-xs text-slate-400">Exporte o estado do tabuleiro em múltiplos formatos</p>
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
          {/* JSON Export */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-purple-200">Formato JSON</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(jsonData, 'json')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  {copiedType === 'json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'json' ? 'Copiado' : 'Copiar'}</span>
                </button>
                <button
                  onClick={() => downloadFile(jsonData, `nqueens-n${n}.json`, 'application/json')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-900 font-mono text-[11px] text-slate-300 max-h-28 overflow-y-auto">
              {jsonData}
            </pre>
          </div>

          {/* ASCII Board Export */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-purple-200">Matriz ASCII</span>
              <button
                onClick={() => copyToClipboard(asciiBoard, 'ascii')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                {copiedType === 'ascii' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'ascii' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-900 font-mono text-[11px] text-slate-300 max-h-28 overflow-y-auto">
              {asciiBoard}
            </pre>
          </div>

          {/* Vector Notation */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-purple-200">Vetor de Colunas</span>
              <button
                onClick={() => copyToClipboard(vectorNotation, 'vector')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                {copiedType === 'vector' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'vector' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-900 font-mono text-[11px] text-cyan-300">
              {vectorNotation}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0a0e1a] flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
