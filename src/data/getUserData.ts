'use server';
import { supabase } from '@/lib/supabaseClient';

interface UserData {
  data: User | null;
}

export async function getUserData(userId: string): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single(); // 単一のレコードを取得する

  if (error) {
    console.error('Error fetching user data:', error.message);
    return { data: null }; // 型に従った形式で返す
  }

  return { data };
}