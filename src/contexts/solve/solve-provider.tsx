import { generateScramble } from '@/lib/scramble';
import { useCallback, useEffect, useState } from 'react';
import { SolveContext, type Puzzle } from './solve-context';
import { supabase } from '@/lib/supabase';

export function SolveProvider({ children }: { children: React.ReactNode }) {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [puzzlesLoading, setPuzzlesLoading] = useState(true);
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const [scramble, setScramble] = useState<string | null>(null);

  useEffect(() => {
    const fetchPuzzles = async () => {
      const { data: authData } = await supabase.auth.getUser();

      const { data } = await supabase
        .from('puzzles')
        .select('id, name, color, scramble_type, user_id')
        .order('created_at')
        .or(`user_id.is.null,user_id.eq.${authData.user?.id}`);

      const fetched = data ?? [];
      setPuzzles(fetched);
      if (fetched.length > 0) {
        setSelectedPuzzle(fetched[0]);
      }
      setPuzzlesLoading(false);
    };

    fetchPuzzles();
  }, []);

  const regenerateScramble = useCallback(() => {
    if (selectedPuzzle) {
      setScramble(generateScramble(selectedPuzzle.scramble_type));
    }
  }, [selectedPuzzle]);

  return (
    <SolveContext
      value={{
        puzzles,
        puzzlesLoading,
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
