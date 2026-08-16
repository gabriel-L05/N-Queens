# N-Queens Scholar

Aplicação web interativa para exploração, visualização e resolução do **Problema das N-Rainhas** (N-Queens Problem).

---

## 📌 Sobre o Projeto

O **Problema das N-Rainhas** consiste em posicionar $N$ rainhas em um tabuleiro de xadrez $N \times N$ de modo que nenhuma rainha ameace qualquer outra (ou seja, não compartilhem a mesma linha, coluna ou diagonal).

Esta aplicação foi desenvolvida para fins acadêmicos e educacionais, permitindo:
- **Interação Manual:** Posicione ou remova rainhas clicando nas células do tabuleiro.
- **Detecção de Conflitos em Tempo Real:** Destaque visual instantâneo das rainhas e trajetórias sob ataque.
- **Resolução Automática:** Algoritmo integrado de satisfação de restrições (CSP / Backtracking) que encontra uma solução válida com um clique.
- **Análise & Teoria:** Consulta de complexidade algorítmica, número de soluções conhecidas (OEIS A000170) e conceitos matemáticos.
- **Exportação:** Exportação dos estados em formatos JSON, Matriz ASCII e Vetor.

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm

### Passo a passo

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse a aplicação no navegador em **`http://localhost:3000`** (ou na porta indicada no terminal).

---

## 🛠️ Tecnologias Utilizadas

- **React 19 + TypeScript:** Interface e tipagem estática.
- **Vite:** Build tool rápida para desenvolvimento frontend.
- **Tailwind CSS:** Estilização responsiva com tema dark moderno.
- **Lucide Icons:** Conjunto de ícones para a interface.

---

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes visuais da interface (Tabuleiro, Painéis, Modais)
├── utils/
│   ├── conflictChecker.ts # Lógica pura de cálculo de conflitos (linha, coluna, diagonais)
│   └── nqueens.ts         # Algoritmos de busca e resolução (Backtracking, Min-Conflicts)
├── types.ts              # Definições de tipos e interfaces TypeScript
├── App.tsx               # Componente principal e gerenciamento de estado
└── main.tsx              # Ponto de entrada da aplicação
```

Uso de Inteligência Artificial

A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento, principalmente para prototipação, implementação, organização do código e revisão da solução.

Principais prompts utilizados

1. Google Stitch — criação da interface

Foi solicitado o desenvolvimento do design de uma aplicação web educacional para o Problema das N-Rainhas, especificando o tabuleiro N × N, interação por cliques, identificação visual de conflitos e uma interface moderna e tecnológica.

2. Antigravity — análise do projeto

Foi solicitado que a ferramenta analisasse a estrutura criada pelo Stitch, identificando framework, linguagem, componentes, organização de pastas e possibilidades de reutilização da interface.

3. Antigravity — implementação

Foi solicitado que a aplicação fosse transformada em uma implementação funcional, preservando o design existente e adicionando:

seleção dinâmica de N;
inserção e remoção de rainhas;
representação das posições por linha e coluna;
verificação de conflitos;
feedback visual;
limite máximo de N rainhas.

4. Antigravity — refinamentos

Foram solicitados ajustes finais para garantir que o número máximo de rainhas correspondesse ao tamanho do tabuleiro e que diferentes tamanhos de tabuleiro fossem suportados de forma dinâmica e responsiva.