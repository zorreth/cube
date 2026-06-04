import { SessionSidebar } from '@/components/session-sidebar';

export default function Page() {
  return (
    <div className="flex flex-1 min-h-svh">
      <div className="flex-1" />
      <SessionSidebar />
    </div>
  );
}
