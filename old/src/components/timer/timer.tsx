'use client';

import { useEffect, useRef, useState } from 'react';
import { useTimer } from '@/contexts/timer';
import { formatTime } from '@/lib/session-stats';
import { useSolve } from '@/contexts/solve';
import { saveSolve } from '@/lib/supabase/solves';
import { cn } from '@/lib/utils';

export function Timer() {
  const [time, setTime] = useState(0);

  const { timerState, setTimerState, setTimerHasSolve, isDnf, isPenalty, setIsDnf, setIsPenalty } =
    useTimer();
  const { selectedPuzzle, scramble, regenerateScramble } = useSolve();

  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartDateRef = useRef(0);
  const timerStateRef = useRef(timerState);

  useEffect(() => {
    timerStateRef.current = timerState;
  }, [timerState]);

  useEffect(() => {
    if (timerState === 'running') {
      timerStartDateRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - timerStartDateRef.current;
        setTime(elapsed);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState]);

  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (timerStateRef.current === 'running') {
        e.preventDefault();
        const elapsed = Date.now() - timerStartDateRef.current;

        setTime(elapsed);
        setTimerState('idle');
        setTimerHasSolve(true);
        regenerateScramble();

        saveSolve(selectedPuzzle.puzzleType, elapsed, scramble);
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setTimerState('ready');
        holdTimeoutRef.current = setTimeout(() => {
          setTimerState('set');
        }, 500);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;

      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }

      if (timerStateRef.current === 'set') {
        setIsDnf(false);
        setIsPenalty(false);
        setTimerHasSolve(false);
        setTimerState('running');
      } else if (timerStateRef.current === 'ready') {
        setTimerState('idle');
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('keyup', onKeyUp, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('keyup', onKeyUp, true);
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    };
  }, [
    setTimerState,
    setTimerHasSolve,
    regenerateScramble,
    selectedPuzzle,
    scramble,
    setIsDnf,
    setIsPenalty,
  ]);

  return (
    <span
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-semibold text-8xl lg:text-[168px] transition-colors cursor-default',
        timerState === 'ready' && 'text-orange-300',
        timerState === 'set' && 'text-green-300',
        timerState === 'running' && 'cursor-pointer',
      )}
    >
      {isDnf ? 'DNF' : isPenalty ? `${formatTime(time + 2000)}+` : formatTime(time)}
    </span>
  );
}
