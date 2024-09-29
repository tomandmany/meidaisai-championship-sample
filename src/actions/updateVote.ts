'use server';
import { supabase } from '@/lib/supabaseClient';

// 日本時間を取得する関数
function getJSTDate(): string {
  const now = new Date();
  return now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}

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
      updated_at: getJSTDate(), // 日本時間で更新日時を設定
    })
    .eq('id', voteId);

  if (updateError) {
    console.error('Supabase Update Error:', updateError);
    throw new Error('投票の更新中にエラーが発生しました');
  }

  console.log('投票が更新されました。');
  return '投票が更新されました。';
}
