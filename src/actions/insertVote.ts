// @/app/api/votes/insertVote.ts
'use server';
import getJSTDate from '@/lib/getJSTDate';
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface InsertVoteParams {
  user_id: string;
  booth: string;
  outstage: string;
  room: string;
  testDate?: Date; // testDateはDate型
}

export async function insertVote({
  user_id,
  booth,
  outstage,
  room,
  testDate,
}: InsertVoteParams): Promise<string> {
  console.log('Inserting vote:', { booth, outstage, room, testDate });

  const { error: insertError } = await supabase.from('votes').insert({
    user_id,
    booth,
    outstage,
    room,
    created_at: testDate ? getJSTDate(testDate) : getJSTDate(), // JSTに変換して保存
    updated_at: null,
  });

  if (insertError) {
    console.error('Supabase Insert Error:', insertError.message);
    throw new Error(
      '投票の挿入中にエラーが発生しました: ' + insertError.message
    );
  }

  revalidatePath('/votes/champ');

  return '投票が完了しました。';
}
