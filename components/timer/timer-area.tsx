'use client';

import { useTimer } from '@/contexts/timer';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

export function TimerArea({ children }: { children: React.ReactNode }) {
  const { timerState, setTimerState } = useTimer();

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const timerStateRef = useRef(timerState);

  useEffect(() => {
    timerStateRef.current = timerState;
  }, [timerState]);

  const onPointerDown = () => {
    if (timerStateRef.current === 'running') {
      setTimerState('idle');
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
      {children}
    </div>
  );
}
