import { calcAo, calcBest, calcMean, formatTime, Solve } from '@/lib/session-stats';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { useTimer } from '@/contexts/timer';

const fmt = (v: number | null) => (v === null ? '–' : formatTime(v));

export function SessionContent({ solves }: { solves: Solve[] }) {
  const { setIsDnf, setIsPenalty, timerHasSolve } = useTimer();

  const results = {
    best: { label: 'BEST', value: calcBest(solves) },
    mean: { label: 'MEAN', value: calcMean(solves) },
    ao5: { label: 'AO5', value: calcAo(solves, 5) },
    ao12: { label: 'AO12', value: calcAo(solves, 12) },
  };

  const onDnf = async (solveId: number) => {
    const solve = solves.find((s) => s.id === solveId);
    if (!solve) return;

    const newDnf = !solve.is_dnf;
    if (solveId === solves[0].id && timerHasSolve) {
      setIsDnf(newDnf);
      if (newDnf) setIsPenalty(false);
    }

    const supabase = createClient();
    await supabase
      .from('solves')
      .update({ is_dnf: newDnf, is_penalty: newDnf ? false : solve.is_penalty })
      .eq('id', solveId);
  };

  const onPenalty = async (solveId: number) => {
    const solve = solves.find((s) => s.id === solveId);
    if (!solve) return;

    const newPenalty = !solve.is_penalty;
    if (solveId === solves[0].id && timerHasSolve) {
      setIsPenalty(newPenalty);
      if (newPenalty) setIsDnf(false);
    }

    const supabase = createClient();
    await supabase
      .from('solves')
      .update({ is_penalty: newPenalty, is_dnf: newPenalty ? false : solve.is_dnf })
      .eq('id', solveId);
  };

  const onDelete = async (solveId: number) => {
    const supabase = createClient();
    await supabase.from('solves').delete().eq('id', solveId);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="grid grid-cols-2 gap-2 px-4 mb-4">
        {Object.values(results).map(({ label, value }) => (
          <div key={label} className="flex flex-col rounded-lg border bg-muted p-2">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              {label}
            </span>
            <span className="font-mono text-lg font-semibold">{fmt(value)}</span>
          </div>
        ))}
      </div>

      <Separator className="w-full" />

      <div className="flex-1 min-h-0 overflow-y-auto">
        {solves.length === 0 ? (
          <p className="text-center text-muted-foreground text-xs mt-8">
            No solves yet.
            <br />
            Hold space to begin your session.
          </p>
        ) : (
          <div className="flex flex-col p-2" role="list">
            {solves.map((solve, idx) => (
              <div
                key={solve.id}
                className="flex items-center p-2 rounded-lg transition-colors hover:bg-accent group"
                role="listitem"
              >
                <span className="font-mono text-muted-foreground text-xs mr-4">
                  {solves.length - idx}
                </span>

                {solve.is_dnf ? (
                  <s className="text-muted-foreground font-semibold mr-2 text-sm">DNF</s>
                ) : solve.is_penalty ? (
                  <span className="font-mono font-semibold mr-2 text-sm">
                    {formatTime(solve.time + 2000)}+
                  </span>
                ) : (
                  <span className="font-mono text-sm font-semibold mr-2">
                    {formatTime(solve.time)}
                  </span>
                )}

                {solve.time === results.best.value && <Badge>PB</Badge>}

                <div className="flex gap-1 items-center ml-auto">
                  <Button
                    onClick={() => onPenalty(solve.id)}
                    variant="ghost"
                    size="icon-sm"
                    className={cn(
                      'opacity-0 group-hover:opacity-100 hover:bg-sidebar! text-muted-foreground text-xs',
                      solve.is_penalty && 'text-yellow-400 hover:text-yellow-400',
                    )}
                  >
                    +2
                  </Button>
                  <Button
                    onClick={() => onDnf(solve.id)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'opacity-0 group-hover:opacity-100 hover:bg-sidebar! text-muted-foreground text-xs',
                      solve.is_dnf && 'text-red-400 hover:text-red-400',
                    )}
                  >
                    DNF
                  </Button>
                  <Button
                    onClick={() => onDelete(solve.id)}
                    variant="ghost"
                    size="icon-sm"
                    className="opacity-0 group-hover:opacity-100 hover:bg-sidebar! text-muted-foreground"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="py-2 px-4 border-t border-border">
        <span className="text-muted-foreground text-xs">{solves.length} solves</span>
      </div>
    </div>
  );
}
