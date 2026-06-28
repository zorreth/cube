import { useState } from 'react';
import { TimerContext, type TimerState } from './timer-context';

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
