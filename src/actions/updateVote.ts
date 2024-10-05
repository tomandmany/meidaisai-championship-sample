'use server';
import getJSTDate from '@/lib/getJSTDate';
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface UpdateVoteParams {
  voteId: string;
  booth: string;
  outstage: string;
  room: string;
  testDate?: Date;
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
      updated_at: testDate?.toISOString() || getJSTDate(), // 日本時間で更新日時を設定
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
