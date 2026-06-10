'use client';

import { createContext, useContext, useState } from 'react';

export type TimerState = 'idle' | 'ready' | 'set' | 'running';

type TimerContextValue = {
  timerState: TimerState;
  setTimerState: (timerState: TimerState) => void;
};

const TimerContext = createContext<TimerContextValue>({
  timerState: 'idle',
  setTimerState: () => {},
});

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timerState, setTimerState] = useState<TimerState>('idle');

  return <TimerContext value={{ timerState, setTimerState }}>{children}</TimerContext>;
}

export const useTimer = () => useContext(TimerContext);
