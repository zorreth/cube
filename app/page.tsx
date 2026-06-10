import { ScrambleGenerator } from '@/components/scramble/scramble-generator';
import { Timer } from '@/components/timer/timer';
import { TimerState } from '@/components/timer/timer-state';
import { SessionSidebar } from '@/components/session/session-sidebar';
import { TimerArea } from '@/components/timer/timer-area';
import { TimerProvider } from '@/contexts/timer';

export default function Page() {
  return (
    <TimerProvider>
      <div className="flex">
        <TimerArea>
          <ScrambleGenerator />
          <Timer />
          <TimerState />
        </TimerArea>

        <SessionSidebar />
      </div>
    </TimerProvider>
  );
}
