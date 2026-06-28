import { createContext } from 'react';
import { puzzles, type Puzzle } from '@/lib/puzzles';

export type SolveContextValue = {
  selectedPuzzle: Puzzle;
  setSelectedPuzzle: (puzzle: Puzzle) => void;
  scramble: string | null;
  regenerateScramble: () => void;
};

export const SolveContext = createContext<SolveContextValue>({
  selectedPuzzle: puzzles[0],
  setSelectedPuzzle: () => {},
  scramble: null,
  regenerateScramble: () => {},
});
