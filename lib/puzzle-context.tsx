'use client';

import { createContext, useContext, useState } from 'react';

export type Puzzle = { id: number; name: string; color: string };

type PuzzleContextValue = {
  selectedPuzzle: Puzzle | null;
  setSelectedPuzzle: (puzzle: Puzzle | null) => void;
};

const PuzzleContext = createContext<PuzzleContextValue>({
  selectedPuzzle: null,
  setSelectedPuzzle: () => {},
});

export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  return (
    <PuzzleContext.Provider value={{ selectedPuzzle, setSelectedPuzzle }}>
      {children}
    </PuzzleContext.Provider>
  );
}

export const usePuzzle = () => useContext(PuzzleContext);
