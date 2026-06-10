import { ScrambleGenerator } from '@/components/scramble/scramble-generator';
import { Timer } from '@/components/timer/timer';
import { TimerState } from '@/components/timer/timer-state';
import { SessionSidebar } from '@/components/session/session-sidebar';
import { TimerProvider } from '@/contexts/timer';

export default function Page() {
  return (
    <TimerProvider>
      <div className="flex">
        <div className="flex-1 flex flex-col items-center justify-between p-8">
          <ScrambleGenerator />
          <Timer />
          <TimerState />
        </div>

        <SessionSidebar />
      </div>
    </TimerProvider>
  );
}
