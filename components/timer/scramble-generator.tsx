'use client';

import { usePuzzle } from '@/contexts/puzzle';
import { generateScramble } from '@/lib/scramble';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Shuffle } from 'lucide-react';

export function ScrambleGenerator() {
  const { scramble, setScramble } = usePuzzle();

  useEffect(() => {
    setScramble(generateScramble());
  }, [setScramble]);

  return (
    <div className="flex flex-col gap-4 items-center p-8">
      <span className="font-mono font-semibold text-2xl text-center">{scramble}</span>
      <Button size="lg" variant="ghost" onClick={() => setScramble(generateScramble())}>
        <Shuffle /> New scramble
      </Button>
    </div>
  );
}
