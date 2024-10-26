// @/actions/updateTicketStatus.ts
'use server';
import { supabase } from '@/lib/supabaseClient';

export async function updateTicketStatus(userId: string) {
  const { error } = await supabase
    .from('users')
    .update({ ticket_used: true }) // `ticket_used` を必ず `true` に設定
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating ticket status:', error.message);
    throw new Error('チケットの状態更新に失敗しました');
  }

  return 'チケットの状態が使用済みに更新されました';
}
