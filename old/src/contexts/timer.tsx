'use client';

import { createContext, useContext, useState } from 'react';

export type TimerState = 'idle' | 'ready' | 'set' | 'running';

type TimerContextValue = {
  timerState: TimerState;
  setTimerState: (timerState: TimerState) => void;
  timerHasSolve: boolean;
  setTimerHasSolve: (hasSolve: boolean) => void;
  isDnf: boolean;
  setIsDnf: (dnf: boolean) => void;
  isPenalty: boolean;
  setIsPenalty: (penalty: boolean) => void;
};

const TimerContext = createContext<TimerContextValue>({
  timerState: 'idle',
  setTimerState: () => {},
  timerHasSolve: false,
  setTimerHasSolve: () => {},
  isDnf: false,
  setIsDnf: () => {},
  isPenalty: false,
  setIsPenalty: () => {},
});

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timerHasSolve, setTimerHasSolve] = useState(false);
  const [isDnf, setIsDnf] = useState(false);
  const [isPenalty, setIsPenalty] = useState(false);

  return (
    <TimerContext
      value={{
        timerState,
        setTimerState,
        timerHasSolve,
        setTimerHasSolve,
        isDnf,
        setIsDnf,
        isPenalty,
        setIsPenalty,
      }}
    >
      {children}
    </TimerContext>
  );
}

export const useTimer = () => useContext(TimerContext);
