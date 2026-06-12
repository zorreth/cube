'use client';

import { generateScramble } from '@/lib/scramble';
import { createContext, useCallback, useContext, useState } from 'react';

export type Puzzle = { id: number; name: string; color: string };

type PuzzleContextValue = {
  selectedPuzzle: Puzzle | null;
  setSelectedPuzzle: (puzzle: Puzzle | null) => void;
  scramble: string | null;
  regenerateScramble: () => void;
};

const PuzzleContext = createContext<PuzzleContextValue>({
  selectedPuzzle: null,
  setSelectedPuzzle: () => {},
  scramble: null,
  regenerateScramble: () => {},
});

export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const [scramble, setScramble] = useState<string | null>(null);

  const regenerateScramble = useCallback(() => {
    setScramble(generateScramble());
  }, []);

  return (
    <PuzzleContext value={{ selectedPuzzle, setSelectedPuzzle, scramble, regenerateScramble }}>
      {children}
    </PuzzleContext>
  );
}

export const usePuzzle = () => useContext(PuzzleContext);
