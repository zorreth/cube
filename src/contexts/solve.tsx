'use client';

import { generateScramble } from '@/lib/scramble';
import { createContext, useCallback, useContext, useState } from 'react';

export type Puzzle = {
  id: number;
  name: string;
  color: string;
};

type SolveContextValue = {
  selectedPuzzle: Puzzle | null;
  setSelectedPuzzle: (puzzle: Puzzle | null) => void;
  scramble: string | null;
  regenerateScramble: () => void;
};

const SolveContext = createContext<SolveContextValue>({
  selectedPuzzle: null,
  setSelectedPuzzle: () => {},
  scramble: null,
  regenerateScramble: () => {},
});

export function SolveProvider({ children }: { children: React.ReactNode }) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const [scramble, setScramble] = useState<string | null>(null);

  const regenerateScramble = useCallback(() => {
    setScramble(generateScramble());
  }, []);

  return (
    <SolveContext value={{ selectedPuzzle, setSelectedPuzzle, scramble, regenerateScramble }}>
      {children}
    </SolveContext>
  );
}

export const useSolve = () => useContext(SolveContext);
