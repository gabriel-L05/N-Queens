import { useState } from 'react';
import { BookOpen, Code, Cpu, ShieldCheck, Copy, Check, GitBranch } from 'lucide-react';

export const TheoryView = () => {
  const [copied, setCopied] = useState(false);

  const pythonSnippet = `# Algoritmo Clássico de Backtracking (Python)
def resolver_n_rainhas(n):
    solucoes = []
    tabuleiro = [-1] * n  # tabuleiro[linha] = coluna

    def posicao_valida(linha, col):
        for r in range(linha):
            c = tabuleiro[r]
            # Mesma coluna ou mesma diagonal
            if c == col or abs(linha - r) == abs(col - c):
                return False
        return True

    def backtrack(linha=0):
        if linha == n:
            solucoes.append(list(tabuleiro))
            return
        
        for col in range(n):
            if posicao_valida(linha, col):
                tabuleiro[linha] = col
                backtrack(linha + 1)      # Avança para a próxima linha
                tabuleiro[linha] = -1     # Desfaz a escolha (Backtrack)

    backtrack(0)
    return solucoes

# Exemplo: N=4 gera 2 soluções válidas
print("Soluções para N=4:", resolver_n_rainhas(4))`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 py-4 px-6 overflow-auto">
      {/* Cabeçalho */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Teoria & Algoritmo das N-Rainhas
            </h1>
            <p className="text-xs text-slate-400">
              Conceitos fundamentais de restrição, busca em profundidade e retrocesso (Backtracking).
            </p>
          </div>
        </div>
      </div>

      {/* Cards de Conceitos Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Restrições */}
        <div className="p-5 rounded-2xl bg-[#111625] border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <h3>As 4 Restrições do Problema</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            O objetivo é colocar <strong className="text-purple-200">N rainhas</strong> em um tabuleiro <strong className="text-purple-200">N×N</strong> de forma que nenhuma peça consiga atacar outra.
          </p>
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span>1. Linhas distintas:</span>
              <span className="font-mono text-cyan-300">1 rainha por linha</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2. Colunas distintas:</span>
              <span className="font-mono text-cyan-300">1 rainha por coluna</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3. Diagonal Principal:</span>
              <span className="font-mono text-rose-300">|linha₁ - linha₂| ≠ |col₁ - col₂|</span>
            </div>
          </div>
        </div>

        {/* Card 2: Backtracking e Poda */}
        <div className="p-5 rounded-2xl bg-[#111625] border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <h3>Como Funciona o Backtracking</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Em vez de testar todas as combinações às cegas (força bruta de complexidade <span className="font-mono text-purple-300">N^N</span>), o algoritmo posiciona uma rainha por linha.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>Tenta colocar uma rainha em uma posição segura da linha atual.</li>
            <li>Se a posição for válida, avança recursivamente para a próxima linha.</li>
            <li>Se nenhuma coluna for válida, <strong>retorna (backtrack)</strong> e reposiciona a rainha anterior.</li>
          </ul>
        </div>
      </div>

      {/* Código Clássico e Didático */}
      <div className="rounded-2xl p-5 bg-[#0c101d] border border-slate-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
            <Code className="w-4 h-4 text-purple-400" />
            <span>Implementação Didática em Python (Backtracking Recursivo)</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-[#070a12] border border-slate-900 overflow-x-auto text-xs font-mono text-purple-200 leading-relaxed">
          {pythonSnippet}
        </pre>
      </div>
    </div>
  );
};
