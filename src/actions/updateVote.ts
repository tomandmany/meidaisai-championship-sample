// @/app/api/votes/updateVote.ts
'use server';
import getJSTDate from '@/lib/getJSTDate';
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface UpdateVoteParams {
  voteId: string;
  booth: string;
  outstage: string;
  room: string;
  testDate?: Date; // testDateはDate型
}

export async function updateVote({
  voteId,
  booth,
  outstage,
  room,
  testDate,
}: UpdateVoteParams): Promise<string> {
  console.log('Updating vote:', { voteId, booth, outstage, room, testDate });

  const { error: updateError } = await supabase
    .from('votes')
    .update({
      booth,
      outstage,
      room,
      updated_at: testDate ? getJSTDate(testDate) : getJSTDate(), // JSTに変換して更新
    })
    .eq('id', voteId);

  if (updateError) {
    console.error('Supabase Update Error:', updateError.message);
    throw new Error(
      '投票の更新中にエラーが発生しました: ' + updateError.message
    );
  }

  revalidatePath('/votes/champ');

  return '投票が更新されました。';
}
