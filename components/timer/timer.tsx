'use client';

import { useTimer } from '@/contexts/timer';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export function Timer() {
  const [time] = useState('0.00');
  const { timerState, setTimerState } = useTimer();

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const timerStateRef = useRef(timerState);

  useEffect(() => {
    timerStateRef.current = timerState;
  }, [timerState]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat) return;

      if (timerStateRef.current === 'running') {
        setTimerState('idle');
        return;
      }

      setTimerState('ready');
      holdTimeout.current = setTimeout(() => {
        setTimerState('set');
      }, 500);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;

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

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      if (holdTimeout.current) clearTimeout(holdTimeout.current);
    };
  }, [setTimerState]);

  return (
    <span
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-semibold text-[168px] transition-colors cursor-default',
        timerState === 'ready' && 'text-orange-300',
        timerState === 'set' && 'text-green-300',
        timerState === 'running' && 'cursor-pointer',
      )}
    >
      {time}
    </span>
  );
}
