// @/app/api/votes/insertVote.ts
'use server';

import getJSTDate from '@/lib/getJSTDate';
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface InsertVoteParams {
  user_id: string;
  programs: { id: string; title: string }[];
  testDate?: Date;
}

export async function insertVote({
  user_id,
  programs,
  testDate,
}: InsertVoteParams): Promise<string> {
  console.log('Inserting votes:', { programs, testDate });

  // ユーザーが存在するか確認
  const { data: userExists, error: userCheckError } = await supabase
    .from('users')
    .select('id')
    .eq('user_id', user_id)
    .single(); // user_idで検索

  if (userCheckError && userCheckError.message.includes('invalid input syntax')) {
    console.error('ユーザーIDの形式が無効です:', user_id);
    throw new Error('ユーザーIDの形式が無効です');
  }

  if (!userExists) {
    const { error: insertUserError } = await supabase.from('users').insert({
      user_id,
      created_at: getJSTDate(new Date()),
    });

    if (insertUserError) {
      console.error('ユーザー追加エラー:', insertUserError.message);
      throw new Error('新しいユーザーの追加中にエラーが発生しました');
    }

    console.log('新しいユーザーが追加されました:', user_id);
  }

  const votesData = programs.map(program => ({
    user_id,
    created_at: testDate ? getJSTDate(testDate) : getJSTDate(),
    program_id: program.id,
    program_name: program.title,
  }));

  const { error: insertError } = await supabase.from('votes').insert(votesData);

  if (insertError) {
    console.error('Supabase Insert Error:', insertError.message);
    throw new Error('投票の挿入中にエラーが発生しました: ' + insertError.message);
  }

  revalidatePath('/votes/champ');

  return '投票が完了しました。';
}
