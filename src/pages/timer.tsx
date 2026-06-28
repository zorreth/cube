import { SessionSidebar } from '@/components/session/session-sidebar';
import { TimerArea } from '@/components/timer/timer-area';
import { TimerProvider } from '@/contexts/timer/timer-provider';

export function Timer() {
  return (
    <TimerProvider>
      <div className="flex h-svh">
        <TimerArea />
        <SessionSidebar />
      </div>
    </TimerProvider>
  );
}
