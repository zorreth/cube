import { createContext } from 'react';

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

export const TimerContext = createContext<TimerContextValue>({
  timerState: 'idle',
  setTimerState: () => {},
  timerHasSolve: false,
  setTimerHasSolve: () => {},
  isDnf: false,
  setIsDnf: () => {},
  isPenalty: false,
  setIsPenalty: () => {},
});
