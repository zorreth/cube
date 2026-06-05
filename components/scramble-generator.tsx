'use client';

import { usePuzzle } from '@/lib/puzzle-context';
import { useCallback, useEffect } from 'react';
import { Button } from './ui/button';
import { Shuffle } from 'lucide-react';

const FACES = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
const MODIFIERS = ['', "'", '2'] as const;
const OPPOSITE: Record<string, string> = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'B', B: 'F' };

function generateScramble(length = 20): string {
  const moves: string[] = [];
  let lastFace = '';
  let secondLastFace = '';

  for (let i = 0; i < length; i++) {
    const excluded = new Set([lastFace, OPPOSITE[lastFace]]);
    // If last two moves were on opposite faces (same axis), also exclude that axis for the current move
    if (secondLastFace && OPPOSITE[secondLastFace] === lastFace) {
      excluded.add(secondLastFace);
    }
    const available = FACES.filter((f) => !excluded.has(f));
    const face = available[Math.floor(Math.random() * available.length)];
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    moves.push(face + modifier);
    secondLastFace = lastFace;
    lastFace = face;
  }

  return moves.join(' ');
}

export function ScrambleGenerator() {
  const { scramble, setScramble } = usePuzzle();

  const newScramble = useCallback(() => setScramble(generateScramble()), [setScramble]);

  useEffect(() => {
    newScramble();
  }, [newScramble]);

  return (
    <div className="flex flex-col gap-4 items-center p-8">
      <span className="font-mono font-semibold text-2xl text-center">{scramble}</span>
      <Button size="lg" variant="ghost" onClick={newScramble}>
        <Shuffle /> New scramble
      </Button>
    </div>
  );
}
