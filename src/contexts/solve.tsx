'use client';

import { generateScramble } from '@/lib/scramble';
import { createContext, useCallback, useContext, useState } from 'react';

export type Puzzle = {
  name: string;
  puzzleType: string;
  color: string;
};

export const puzzles: Puzzle[] = [{ name: '3x3', puzzleType: '3x3', color: '#2dd27f' }];

type SolveContextValue = {
  selectedPuzzle: Puzzle;
  setSelectedPuzzle: (puzzle: Puzzle) => void;
  scramble: string | null;
  regenerateScramble: () => void;
};

const SolveContext = createContext<SolveContextValue>({
  selectedPuzzle: puzzles[0],
  setSelectedPuzzle: () => {},
  scramble: null,
  regenerateScramble: () => {},
});

export function SolveProvider({ children }: { children: React.ReactNode }) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle>(puzzles[0]);
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
