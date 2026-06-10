export const FACES = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
export const MODIFIERS = ['', "'", '2'] as const;
export const OPPOSITE: Record<string, string> = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'B', B: 'F' };

export function generateScramble(length = 20): string {
  const moves: string[] = [];
  let lastFace = '';
  let secondLastFace = '';

  for (let i = 0; i < length; i++) {
    const excluded = new Set([lastFace, OPPOSITE[lastFace]]);
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
