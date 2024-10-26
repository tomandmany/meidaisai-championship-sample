// @/app/api/votes/deleteVote.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface DeleteVoteParams {
  voteId: string;
  user_id: string;
}

export async function deleteVote({ voteId, user_id }: DeleteVoteParams): Promise<string> {
  console.log('Deleting vote:', voteId);

  const { error: deleteError } = await supabase
    .from('votes')
    .delete()
    .match({ id: voteId, user_id }) // voteId と user_id 両方で一致するものを削除
    .single(); // 一件のみを対象

  if (deleteError) {
    console.error('Supabase Delete Error:', deleteError.message);
    throw new Error('投票の削除中にエラーが発生しました: ' + deleteError.message);
  }

  revalidatePath('/votes/champ');

  return '投票が削除されました。';
}
