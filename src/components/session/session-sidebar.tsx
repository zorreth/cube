import { useEffect, useState } from 'react';
import { useSolve } from '@/hooks/use-solve';
import { supabase } from '@/lib/supabase';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { BarChart2 } from 'lucide-react';
import { SessionContent } from './session-content';
import { Skeleton } from '../ui/skeleton';
import type { Solve } from '@/lib/session-stats';

export function SessionSidebar() {
  const { selectedPuzzle } = useSolve();
  const [solves, setSolves] = useState<Solve[]>([]);

  useEffect(() => {
    if (!selectedPuzzle) return;

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
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'solves' },
        fetchSolves,
      )
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
          {selectedPuzzle ? (
            <span className="font-semibold mx-auto">{selectedPuzzle.name}</span>
          ) : (
            <Skeleton className="h-6 w-24 rounded-full mx-auto" />
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
            <SheetTitle>
              {selectedPuzzle ? (
                <span className="font-bold">{selectedPuzzle.name}</span>
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
