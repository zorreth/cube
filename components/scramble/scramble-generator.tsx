'use client';

import { usePuzzle } from '@/contexts/puzzle';
import { useTimer } from '@/contexts/timer';
import { generateScramble } from '@/lib/scramble';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Shuffle } from 'lucide-react';

export function ScrambleGenerator() {
  const { scramble, setScramble } = usePuzzle();
  const { timerState } = useTimer();

  useEffect(() => {
    setScramble(generateScramble());
  }, [setScramble]);

  return (
    <div
      className={cn(
        'flex flex-col gap-4 items-center transition-opacity duration-200',
        timerState === 'running' ? 'opacity-0' : 'opacity-100',
      )}
    >
      <span className="font-mono font-semibold text-2xl text-center">{scramble}</span>
      <Button size="lg" variant="ghost" onClick={() => setScramble(generateScramble())}>
        <Shuffle /> New scramble
      </Button>
    </div>
  );
}
