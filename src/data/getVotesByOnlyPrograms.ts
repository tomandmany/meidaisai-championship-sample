// @/data/getVotesByOnlyPrograms.ts
import { supabase } from '@/lib/supabaseClient';

export async function getVotesByOnlyPrograms() {
  const { data, error } = await supabase
    .from('votes')       // テーブルを指定
    .select('booth, outstage, room'); // 必要なカラムを全て指定

  if (error) {
    console.error('Error fetching votes:', error);
    return [];
  }

  return data;
}
