'use server';
import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

// 日本時間を取得する関数
function getJSTDate(): string {
  const now = new Date();
  return now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}

export async function insertVote({ line_id, booth, outstage, room }: { line_id: string, booth: string, outstage: string, room: string }) {
  console.log('Inserting vote:', { line_id, booth, outstage, room });

  const { error: insertError } = await supabase
    .from('votes')
    .insert({
      line_id,
      booth,
      outstage,
      room,
    });

  if (insertError) {
    console.error('Supabase Insert Error:', insertError);
    throw new Error('投票の挿入中にエラーが発生しました');
  }

  revalidatePath('/');

  return '投票が完了しました。';
}
