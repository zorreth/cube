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

export const SCRAMBLE_TYPES = [
  '3x3',
  '2x2',
  '4x4',
  '5x5',
  '6x6',
  '7x7',
] as const;

// prettier-ignore
const MOVES_4X4 = ['U', 'Uw', 'D', 'Dw', 'L', 'Lw', 'R', 'Rw', 'F', 'Fw', 'B', 'Bw'] as const;
// prettier-ignore
const MOVES_6X6 = [
  'U', 'Uw', '3Uw', 'D', 'Dw', '3Dw',
  'L', 'Lw', '3Lw', 'R', 'Rw', '3Rw',
  'F', 'Fw', '3Fw', 'B', 'Bw', '3Bw',
] as const;

function faceOf(moveBase: string): string {
  return moveBase.replace(/^\d+/, '')[0];
}

function buildScramble(moveBases: readonly string[], length: number): string {
  const moves: string[] = [];
  let lastFace = '';
  let secondLastFace = '';

  for (let i = 0; i < length; i++) {
    const excluded = new Set([lastFace, OPPOSITE[lastFace]]);
    if (secondLastFace && OPPOSITE[secondLastFace] === lastFace) {
      excluded.add(secondLastFace);
    }
    const available = moveBases.filter((m) => !excluded.has(faceOf(m)));
    const base = available[Math.floor(Math.random() * available.length)];
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    moves.push(base + modifier);
    secondLastFace = lastFace;
    lastFace = faceOf(base);
  }

  return moves.join(' ');
}

export function generateScramble(scrambleType: string | null): string | null {
  switch (scrambleType) {
    case '3x3':
      return buildScramble(FACES, 20);
    case '2x2':
      return buildScramble(FACES_2X2, 9);
    case '4x4':
      return buildScramble(MOVES_4X4, 40);
    case '5x5':
      return buildScramble(MOVES_4X4, 60);
    case '6x6':
      return buildScramble(MOVES_6X6, 80);
    case '7x7':
      return buildScramble(MOVES_6X6, 100);
    default:
      return null;
  }
}
