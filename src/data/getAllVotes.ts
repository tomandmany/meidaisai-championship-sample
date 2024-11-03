// @/data/getAllVotes.ts

import { supabase } from '@/lib/supabaseClient';

export async function getAllVotes(): Promise<Vote[]> {
  const { data, error } = await supabase
    .from('votes') // テーブルを指定
    .select('program_id, program_name, department, created_at'); // 必要なカラムを全て指定

  if (error) {
    console.error('Error fetching votes:', error);
    return [];
  }

  return data as Vote[];
}
