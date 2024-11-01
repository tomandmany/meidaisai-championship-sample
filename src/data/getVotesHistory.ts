import { supabase } from '@/lib/supabaseClient';

function createJSTDateFromString(dateString: string): string {
  // "YYYY-MM-DDTHH:mm:ss" 形式の文字列をパース
  const [datePart, timePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // JSTの時間をそのまま保持するDateオブジェクトを作成
  return new Date(year, month - 1, day, hours, minutes, seconds).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}

export default async function getVotesHistory(userId: string) {
  const votingStart = createJSTDateFromString(process.env.NEXT_PUBLIC_VOTING_PERIOD_START!);
  const votingEnd = createJSTDateFromString(process.env.NEXT_PUBLIC_VOTING_PERIOD_END!);
  // console.log('votingStart:', votingStart);
  // console.log('votingEnd:', votingEnd);

  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', votingStart) // 開始日付以上
    .lte('created_at', votingEnd) // 終了日付以下
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching votes history:', error);
    return [];
  }

  // console.log('votes history:', data);

  return data || [];
}
