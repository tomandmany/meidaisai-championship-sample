import { supabase } from '@/lib/supabaseClient';

export async function getVotesHistory(userId: string) {
  const votingStart = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_START!);
  const votingEnd = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_END!);

  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', votingStart.toISOString()) // 開始日付以上
    .lte('created_at', votingEnd.toISOString()) // 終了日付以下
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching votes history:', error);
    return [];
  }

  return data || [];
}
