'use client';

import { type TimerState as TimerStateValue, useTimer } from '@/contexts/timer';

const messages: Record<TimerStateValue, string> = {
  idle: 'hold SPACE / tap & hold to start',
  ready: 'keep holding...',
  set: 'release!',
  running: '',
};

export function TimerState() {
  const { timerState } = useTimer();

  const message = messages[timerState] ?? '';

  return <span className="font-mono text-accent-foreground text-xs">{message}</span>;
}
