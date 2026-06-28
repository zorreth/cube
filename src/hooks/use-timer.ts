import { TimerContext } from '@/contexts/timer/timer-context';
import { useContext } from 'react';

export const useTimer = () => useContext(TimerContext);
