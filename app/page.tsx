import { ScrambleGenerator } from '@/components/timer/scramble-generator';
import { SessionSidebar } from '@/components/session/session-sidebar';

export default function Page() {
  return (
    <div className="flex">
      <div className="flex-1">
        <ScrambleGenerator />
      </div>

      <SessionSidebar />
    </div>
  );
}
