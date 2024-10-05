'use server';
import getJSTDate from '@/lib/getJSTDate';
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface InsertVoteParams {
  line_id: string;
  booth: string;
  outstage: string;
  room: string;
  testDate?: Date;
}

export async function insertVote({
  line_id,
  booth,
  outstage,
  room,
  testDate,
}: InsertVoteParams): Promise<string> {
  console.log('Inserting vote:', { line_id, booth, outstage, room, testDate });

  console.log(testDate?.toString() || getJSTDate());

  const { error: insertError } = await supabase.from('votes').insert({
    line_id,
    booth,
    outstage,
    room,
    created_at: testDate?.toISOString() || getJSTDate(),
  });

  if (insertError) {
    console.error('Supabase Insert Error:', insertError.message); // エラーの詳細を表示
    throw new Error(
      '投票の挿入中にエラーが発生しました: ' + insertError.message
    ); // エラーメッセージを含める
  }

  revalidatePath('/');

  return '投票が完了しました。';
}
