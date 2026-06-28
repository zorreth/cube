export interface Solve {
  id: number;
  created_at: string;
  time: number;
  is_dnf: boolean;
  is_penalty: boolean;
}

function filterTimes(solves: Solve[]) {
  const filtered = solves.filter((s) => !s.is_dnf);
  if (filtered.length === 0) return [];
  return filtered.map((s) => (s.is_penalty ? s.time + 2000 : s.time));
}

export function formatTime(ms: number): string {
  if (ms < 60000) {
    return (ms / 1000).toFixed(2);
  }
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(2).padStart(5, '0');
  return `${minutes}:${seconds}`;
}

export function calcBest(solves: Solve[]): number | null {
  const times = filterTimes(solves);
  if (times.length === 0) return null;
  return Math.min(...times);
}

export function calcMean(solves: Solve[]): number | null {
  const times = filterTimes(solves);
  if (times.length === 0) return null;
  return times.reduce((a, b) => a + b, 0) / times.length;
}

export function calcAo(solves: Solve[], n: number): number | null {
  const times = filterTimes(solves);
  if (times.length < n) return null;
  const last = [...times.slice(-n)].sort((a, b) => a - b);
  const trimmed = last.slice(1, -1);
  return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
}
