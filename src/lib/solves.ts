import { supabase } from './supabase';

export async function saveSolve(
  puzzle_id: number,
  elapsed: number,
  scramble: string | null,
) {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;

  await supabase.from('solves').insert({
    user_id: data.user.id,
    puzzle_id,
    time: elapsed,
    scramble,
  });
}
