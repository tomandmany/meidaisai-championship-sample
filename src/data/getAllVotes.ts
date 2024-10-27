// @/data/getAllVotes.ts

import { supabase } from '@/lib/supabaseClient';

// Vote型を定義
export interface Vote {
  program_id: string;
  program_name: string;
}

export async function getAllVotes(): Promise<Vote[]> {
  const { data, error } = await supabase
    .from('votes') // テーブルを指定
    .select('program_id, program_name'); // 必要なカラムを全て指定

  if (error) {
    console.error('Error fetching votes:', error);
    return [];
  }

  return data as Vote[];
}
