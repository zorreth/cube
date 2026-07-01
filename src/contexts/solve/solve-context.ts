import { createContext } from 'react';

export type Puzzle = {
  id: number;
  name: string;
  color: string;
  scramble_type: string | null;
  user_id: string | null;
};

export type NewPuzzle = {
  name: string;
  slug: string;
  color: string;
  scramble_type: string | null;
};

export type SolveContextValue = {
  puzzles: Puzzle[];
  puzzlesLoading: boolean;
  selectedPuzzle: Puzzle | null;
  setSelectedPuzzle: (puzzle: Puzzle) => void;
  scramble: string | null;
  regenerateScramble: () => void;
  addPuzzle: (puzzle: NewPuzzle) => Promise<void>;
};

export const SolveContext = createContext<SolveContextValue>({
  puzzles: [],
  puzzlesLoading: true,
  selectedPuzzle: null,
  setSelectedPuzzle: () => {},
  scramble: null,
  regenerateScramble: () => {},
  addPuzzle: async () => {},
});
