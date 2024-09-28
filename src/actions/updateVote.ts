'use server';

import { supabase } from '@/lib/supabaseClient';

export async function updateVote({
  voteId,
  booth,
  outstage,
  room,
}: {
  voteId: string;
  booth: string;
  outstage: string;
  room: string;
}) {
  console.log('Updating vote:', { voteId, booth, outstage, room });

  const { error: updateError } = await supabase
    .from('votes')
    .update({
      booth,
      outstage,
      room,
      updated_at: new Date().toISOString(), // 更新日時を現在時刻に設定
    })
    .eq('id', voteId); // IDで一致するものを更新

  if (updateError) {
    console.error('Supabase Update Error:', updateError);
    throw new Error('投票の更新中にエラーが発生しました');
  }

  console.log('投票が更新されました。');
  return '投票が更新されました。';
}
