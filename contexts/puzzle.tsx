'use client';

import { createContext, useContext, useState } from 'react';

export type Puzzle = { id: number; name: string; color: string };

type PuzzleContextValue = {
  selectedPuzzle: Puzzle | null;
  setSelectedPuzzle: (puzzle: Puzzle | null) => void;
  scramble: string | null;
  setScramble: (scramble: string | null) => void;
};

const PuzzleContext = createContext<PuzzleContextValue>({
  selectedPuzzle: null,
  setSelectedPuzzle: () => {},
  scramble: null,
  setScramble: () => {},
});

export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const [scramble, setScramble] = useState<string | null>(null);

  return (
    <PuzzleContext value={{ selectedPuzzle, setSelectedPuzzle, scramble, setScramble }}>
      {children}
    </PuzzleContext>
  );
}

export const usePuzzle = () => useContext(PuzzleContext);
