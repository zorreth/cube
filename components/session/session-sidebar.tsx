'use client';

import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { usePuzzle } from '@/contexts/puzzle';
import { createClient } from '@/lib/supabase/client';
import { calcAo, calcBest, calcMean, formatTime } from '@/lib/session-stats';
import { Skeleton } from '../ui/skeleton';

interface Solve {
  id: number;
  created_at: string;
  time: number;
}

export function SessionSidebar() {
  const { selectedPuzzle } = usePuzzle();
  const [solves, setSolves] = useState<Solve[]>([]);

  useEffect(() => {
    if (!selectedPuzzle) return;

    const supabase = createClient();
    supabase
      .from('solves')
      .select('id, created_at, time')
      .eq('puzzle_id', selectedPuzzle.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => setSolves(data ?? []));
  }, [selectedPuzzle]);

  const times = solves.map((s) => s.time);
  const fmt = (v: number | null) => (v === null ? '–' : formatTime(v));

  return (
    <div className="hidden md:flex h-svh w-80 flex-col border-l bg-sidebar text-sidebar-foreground shrink-0">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Session</span>
          {selectedPuzzle ? (
            <Badge style={{ backgroundColor: selectedPuzzle?.color }}>{selectedPuzzle.name}</Badge>
          ) : (
            <Skeleton className="h-5 w-12 rounded-full" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {(
            [
              {
                label: 'BEST',
                value: fmt(calcBest(times)),
              },
              {
                label: 'MEAN',
                value: fmt(calcMean(times)),
              },
              {
                label: 'AO5',
                value: fmt(calcAo(times, 5)),
              },
              {
                label: 'AO12',
                value: fmt(calcAo(times, 12)),
              },
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
      </div>

      <Separator className="w-full mb-8" />

      {solves.length === 0 && (
        <span className="text-center text-muted-foreground text-xs">
          No solves yet.
          <br />
          Hold space to begin your session.
        </span>
      )}
    </div>
  );
}
