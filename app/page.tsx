import { ScrambleGenerator } from '@/components/scramble-generator';
import { SessionSidebar } from '@/components/session-sidebar';

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
