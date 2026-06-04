'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Puzzle, usePuzzle } from '@/lib/puzzle-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Skeleton } from './ui/skeleton';

export function PuzzleSelect() {
  const [isLoading, setIsLoading] = useState(true);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const { setSelectedPuzzle } = usePuzzle();

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('puzzles')
      .select('id, name, color')
      .then(({ data }) => {
        if (data) {
          setPuzzles(data);
          if (data.length > 0) {
            setSelected(`puzzle-${data[0].id}`);
            setSelectedPuzzle(data[0]);
          }
        }
        setIsLoading(false);
      });
  }, []);

  function handleValueChange(value: string) {
    setSelected(value);
    const id = parseInt(value.replace('puzzle-', ''));
    setSelectedPuzzle(puzzles.find((p) => p.id === id) ?? null);
  }

  if (isLoading) return <Skeleton className="h-8 w-full" />;

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select puzzle" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {puzzles.map(({ id, name, color }) => (
            <SelectItem key={id} value={`puzzle-${id}`}>
              <span
                className="w-2 h-2 rounded-xs inline-block shrink-0"
                style={{ backgroundColor: color }}
              />
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
