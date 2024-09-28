// @/data/getVotesHistory.ts
import { supabase } from '@/lib/supabaseClient';

export async function getVotesHistory(userId: string) {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('line_id', userId)
    .gte('created_at', threeDaysAgo.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching votes history:', error);
    return [];
  }

  return data || [];
}
