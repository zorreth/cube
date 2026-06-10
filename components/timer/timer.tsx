'use client';

import { useEffect, useRef, useState } from 'react';
import { useTimer } from '@/contexts/timer';
import { formatTime } from '@/lib/session-stats';
import { usePuzzle } from '@/contexts/puzzle';
import { cn } from '@/lib/utils';

export function Timer() {
  const [time, setTime] = useState('0.00');

  const { timerState, setTimerState } = useTimer();
  const { regenerateScramble } = usePuzzle();

  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartDateRef = useRef<number>(0);
  const timerStateRef = useRef(timerState);

  useEffect(() => {
    timerStateRef.current = timerState;
  }, [timerState]);

  useEffect(() => {
    if (timerState === 'running') {
      timerStartDateRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - timerStartDateRef.current;
        setTime(formatTime(elapsed));
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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat) return;

      if (timerStateRef.current === 'running') {
        setTimerState('idle');
        regenerateScramble();
        return;
      }

      setTimerState('ready');
      holdTimeoutRef.current = setTimeout(() => {
        setTimerState('set');
      }, 500);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;

      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }

      if (timerStateRef.current === 'set') {
        setTimerState('running');
      } else if (timerStateRef.current === 'ready') {
        setTimerState('idle');
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    };
  }, [setTimerState, regenerateScramble]);

  return (
    <span
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-semibold text-8xl lg:text-[168px] transition-colors cursor-default',
        timerState === 'ready' && 'text-orange-300',
        timerState === 'set' && 'text-green-300',
        timerState === 'running' && 'cursor-pointer',
      )}
    >
      {time}
    </span>
  );
}
