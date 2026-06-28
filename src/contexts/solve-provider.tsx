import { generate2x2Scramble, generate3x3Scramble } from '@/lib/scramble';
import { useCallback, useState } from 'react';
import { puzzles, type Puzzle } from '@/lib/puzzles';
import { SolveContext } from './solve-context';

export function SolveProvider({ children }: { children: React.ReactNode }) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle>(puzzles[0]);
  const [scramble, setScramble] = useState<string | null>(null);

  const regenerateScramble = useCallback(() => {
    setScramble(
      selectedPuzzle.puzzleType === '2x2'
        ? generate2x2Scramble()
        : generate3x3Scramble(),
    );
  }, [selectedPuzzle]);

  return (
    <SolveContext
      value={{
        selectedPuzzle,
        setSelectedPuzzle,
        scramble,
        regenerateScramble,
      }}
    >
      {children}
    </SolveContext>
  );
}
