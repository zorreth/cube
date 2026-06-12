import { createClient } from './client';

export async function saveSolve(puzzleId: number, elapsed: number, scramble: string | null) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;
  await supabase.from('solves').insert({
    user_id: data.user.id,
    puzzle_id: puzzleId,
    time: elapsed,
    scramble,
  });
}
