'use client';

import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { usePuzzle } from '@/lib/puzzle-context';
import { createClient } from '@/lib/supabase/client';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface Solve {
  id: number;
  created_at: string;
  time: number;
}

function formatTime(ms: number): string {
  if (ms < 60000) {
    return (ms / 1000).toFixed(2);
  }
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(2).padStart(5, '0');
  return `${minutes}:${seconds}`;
}

function calcBest(times: number[]): number | null {
  if (times.length === 0) return null;
  return Math.min(...times);
}

function calcMean(times: number[]): number | null {
  if (times.length === 0) return null;
  return times.reduce((a, b) => a + b, 0) / times.length;
}

function calcAo(times: number[], n: number): number | null {
  if (times.length < n) return null;
  const last = [...times.slice(-n)].sort((a, b) => a - b);
  const trimmed = last.slice(1, -1);
  return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
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
          <Badge style={{ backgroundColor: selectedPuzzle?.color }}>
            {selectedPuzzle?.name ?? '–'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {(
            [
              {
                label: 'BEST',
                value: fmt(calcBest(times)),
                hint: 'Best single solve of this puzzle',
              },
              {
                label: 'MEAN',
                value: fmt(calcMean(times)),
                hint: 'Mean of all solves of this puzzle',
              },
              {
                label: 'AO5',
                value: fmt(calcAo(times, 5)),
                hint: 'Average of last 5 (best and worst excluded)',
              },
              {
                label: 'AO12',
                value: fmt(calcAo(times, 12)),
                hint: 'Average of last 12 (best and worst excluded)',
              },
            ] as const
          ).map(({ label, value, hint }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <div className="flex flex-col rounded-lg border bg-muted p-2">
                  <span className="text-xs font-medium text-muted-foreground tracking-wider">
                    {label}
                  </span>
                  <span className="text-lg font-semibold">{value}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{hint}</p>
              </TooltipContent>
            </Tooltip>
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
