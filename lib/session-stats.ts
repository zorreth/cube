export function formatTime(ms: number): string {
  if (ms < 60000) {
    return (ms / 1000).toFixed(2);
  }
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(2).padStart(5, '0');
  return `${minutes}:${seconds}`;
}

export function calcBest(times: number[]): number | null {
  if (times.length === 0) return null;
  return Math.min(...times);
}

export function calcMean(times: number[]): number | null {
  if (times.length === 0) return null;
  return times.reduce((a, b) => a + b, 0) / times.length;
}

export function calcAo(times: number[], n: number): number | null {
  if (times.length < n) return null;
  const last = [...times.slice(-n)].sort((a, b) => a - b);
  const trimmed = last.slice(1, -1);
  return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
}
