export const FACES = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
export const FACES_2X2 = ['U', 'R', 'F'] as const;
export const MODIFIERS = ['', "'", '2'] as const;
export const OPPOSITE: Record<string, string> = {
  U: 'D',
  D: 'U',
  L: 'R',
  R: 'L',
  F: 'B',
  B: 'F',
};

function buildScramble(faces: readonly string[], length: number): string {
  const moves: string[] = [];
  let lastFace = '';
  let secondLastFace = '';

  for (let i = 0; i < length; i++) {
    const excluded = new Set([lastFace, OPPOSITE[lastFace]]);
    if (secondLastFace && OPPOSITE[secondLastFace] === lastFace) {
      excluded.add(secondLastFace);
    }
    const available = faces.filter((f) => !excluded.has(f));
    const face = available[Math.floor(Math.random() * available.length)];
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    moves.push(face + modifier);
    secondLastFace = lastFace;
    lastFace = face;
  }

  return moves.join(' ');
}

export function generate3x3Scramble(length = 20): string {
  return buildScramble(FACES, length);
}

export function generate2x2Scramble(length = 9): string {
  return buildScramble(FACES_2X2, length);
}
