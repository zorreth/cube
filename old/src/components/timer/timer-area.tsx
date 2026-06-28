'use client';

import { useTimer } from '@/contexts/timer';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { ScrambleGenerator } from '../scramble/scramble-generator';
import { Timer } from './timer';
import { TimerState } from './timer-state';
import { useSolve } from '@/contexts/solve';
import { saveSolve } from '@/lib/supabase/solves';

export function TimerArea() {
  const { timerState, setTimerState } = useTimer();
  const { selectedPuzzle, scramble, regenerateScramble } = useSolve();

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const timerStateRef = useRef(timerState);
  const timerStartRef = useRef<number>(0);

  useEffect(() => {
    timerStateRef.current = timerState;
    if (timerState === 'running') timerStartRef.current = Date.now();
  }, [timerState]);

  const onPointerDown = () => {
    if (timerStateRef.current === 'running') {
      const elapsed = Date.now() - timerStartRef.current;
      setTimerState('idle');
      regenerateScramble();
      saveSolve(selectedPuzzle.puzzleType, elapsed, scramble);
      return;
    }

    setTimerState('ready');
    holdTimeout.current = setTimeout(() => {
      setTimerState('set');
    }, 500);
  };

  const onPointerUp = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }

    if (timerStateRef.current === 'set') {
      setTimerState('running');
    } else if (timerStateRef.current === 'ready') {
      setTimerState('idle');
    }
  };

  return (
    <div
      className={cn(
        'relative flex-1 flex flex-col items-center justify-between p-8 select-none',
        timerState === 'running' && 'cursor-pointer',
      )}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <ScrambleGenerator />
      <Timer />
      <TimerState />
    </div>
  );
}
