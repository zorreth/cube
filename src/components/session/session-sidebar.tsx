'use client';

import { useEffect, useState } from 'react';
import { useSolve } from '@/contexts/solve';
import { createClient } from '@/lib/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { BarChart2 } from 'lucide-react';
import { SessionContent } from './session-content';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Solve } from '@/lib/session-stats';

export function SessionSidebar() {
  const { selectedPuzzle } = useSolve();
  const [solves, setSolves] = useState<Solve[]>([]);

  useEffect(() => {
    if (!selectedPuzzle) return;

    const supabase = createClient();

    const fetchSolves = () =>
      supabase
        .from('solves')
        .select('id, created_at, time, is_dnf, is_penalty')
        .eq('puzzle_id', selectedPuzzle.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setSolves(data ?? []));

    fetchSolves();

    const channel = supabase
      .channel(`solves:${selectedPuzzle.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'solves' }, fetchSolves)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedPuzzle]);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-svh w-80 flex-col border-l bg-sidebar text-sidebar-foreground shrink-0">
        <div className="flex justify-between items-center p-4">
          <span className="font-bold">Session</span>
          {selectedPuzzle ? (
            <Badge style={{ backgroundColor: selectedPuzzle.color }}>{selectedPuzzle.name}</Badge>
          ) : (
            <Skeleton className="h-5 w-12 rounded-full" />
          )}
        </div>

        <SessionContent solves={solves} />
      </div>

      {/* Mobile sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="md:hidden fixed bottom-4 right-4 z-40 rounded-full size-12"
          >
            <BarChart2 className="size-5" />
            <span className="sr-only">Session stats</span>
          </Button>
        </SheetTrigger>
        <SheetContent aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle className="flex gap-2 items-center">
              Session
              {selectedPuzzle ? (
                <Badge style={{ backgroundColor: selectedPuzzle.color }}>
                  {selectedPuzzle.name}
                </Badge>
              ) : (
                <Skeleton className="h-5 w-12 rounded-full" />
              )}
            </SheetTitle>
          </SheetHeader>

          <SessionContent solves={solves} />
        </SheetContent>
      </Sheet>
    </>
  );
}
