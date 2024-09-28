'use server';
import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export async function insertVote({ line_id, booth, outstage, room }: { line_id: string, booth: string, outstage: string, room: string }) {
  console.log('Inserting vote:', { line_id, booth, outstage, room });  // ログを追加して確認
  const { error: insertError } = await supabase
    .from('votes')
    .insert({
      line_id,
      booth,
      outstage,
      room,
      // created_at: new Date().toISOString(), // 作成日時を挿入
    });

  if (insertError) {
    console.error('Supabase Insert Error:', insertError);
    throw new Error('投票の挿入中にエラーが発生しました');
  }

  revalidatePath('/');

  return '投票が完了しました。';
}
