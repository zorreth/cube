import { calcAo, calcBest, calcMean, formatTime } from '@/lib/session-stats';
import { Separator } from '../ui/separator';

export interface Solve {
  id: number;
  created_at: string;
  time: number;
}

export function SessionContent({ solves }: { solves: Solve[] }) {
  const times = solves.map((s) => s.time);
  const fmt = (v: number | null) => (v === null ? '–' : formatTime(v));

  return (
    <>
      <div className="grid grid-cols-2 gap-2 px-4">
        {(
          [
            { label: 'BEST', value: fmt(calcBest(times)) },
            { label: 'MEAN', value: fmt(calcMean(times)) },
            { label: 'AO5', value: fmt(calcAo(times, 5)) },
            { label: 'AO12', value: fmt(calcAo(times, 12)) },
          ] as const
        ).map(({ label, value }) => (
          <div key={label} className="flex flex-col rounded-lg border bg-muted p-2">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              {label}
            </span>
            <span className="text-lg font-semibold">{value}</span>
          </div>
        ))}
      </div>

      <Separator className="w-full my-4" />

      {solves.length === 0 && (
        <span className="text-center text-muted-foreground text-xs mb-8">
          No solves yet.
          <br />
          Hold space to begin your session.
        </span>
      )}
    </>
  );
}
