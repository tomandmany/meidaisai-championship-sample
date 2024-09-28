'use server';

import { supabase } from '@/lib/supabaseClient';

export async function getVotes(line_id: string) {
  const now = new Date();
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  const todayEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));

  console.log(`Fetching votes for user ${line_id} between ${todayStart.toISOString()} and ${todayEnd.toISOString()}`);

  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('line_id', line_id)
    .gte('created_at', todayStart.toISOString())
    .lte('created_at', todayEnd.toISOString())
    .single();

  if (error) {
    console.error('Supabase Get Votes Error:', error); // エラーがあれば表示
    return null;
  }

  console.log('Fetched vote:', data); // データを確認
  return data;
}
