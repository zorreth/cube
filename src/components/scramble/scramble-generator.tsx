'use client';

import { usePuzzle } from '@/contexts/puzzle';
import { useTimer } from '@/contexts/timer';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Shuffle } from 'lucide-react';

export function ScrambleGenerator() {
  const { scramble, regenerateScramble } = usePuzzle();
  const { timerState } = useTimer();

  useEffect(() => {
    regenerateScramble();
  }, [regenerateScramble]);

  return (
    <div
      className={cn(
        'flex flex-col gap-4 items-center transition-opacity duration-200',
        timerState === 'running' ? 'opacity-0' : 'opacity-100',
      )}
    >
      <span className="font-mono font-semibold text-2xl text-center cursor-default">
        {scramble}
      </span>
      <Button
        size="lg"
        variant="ghost"
        onClick={regenerateScramble}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <Shuffle /> New scramble
      </Button>
    </div>
  );
}
