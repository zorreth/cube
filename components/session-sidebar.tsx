'use client';

import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { usePuzzle } from '@/lib/puzzle-context';

export function SessionSidebar() {
  const { selectedPuzzle } = usePuzzle();

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
          {[
            { label: 'BEST', value: '–' },
            { label: 'MEAN', value: '–' },
            { label: 'AO5', value: '–' },
            { label: 'AO12', value: '–' },
          ].map(({ label, value }) => (
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

      <span className="text-center text-muted-foreground text-xs">
        No solves yet.
        <br />
        Hold space to begin your session.
      </span>
    </div>
  );
}
