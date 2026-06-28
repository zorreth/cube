export type Puzzle = {
  name: string;
  puzzleType: string;
  color: string;
};

export const puzzles: Puzzle[] = [
  { name: '3x3', puzzleType: '3x3', color: '#2dd27f' },
  { name: '2x2', puzzleType: '2x2', color: '#f59e0b' },
];
