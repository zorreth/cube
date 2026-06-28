'use client';

import { type TimerState as TimerStateValue, useTimer } from '@/contexts/timer';
import { cn } from '@/lib/utils';

const messages: Record<TimerStateValue, string> = {
  idle: 'hold SPACE / tap & hold to start',
  ready: 'keep holding...',
  set: 'release!',
  running: '',
};

export function TimerState() {
  const { timerState } = useTimer();

  const message = messages[timerState];

  return (
    <span
      className={cn(
        'font-mono text-accent-foreground text-xs transition-opacity duration-200 select-none cursor-default',
        timerState === 'running' ? 'opacity-0' : 'opacity-100',
      )}
    >
      {message}
    </span>
  );
}
