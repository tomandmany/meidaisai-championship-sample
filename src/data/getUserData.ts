'use server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabaseClient';

interface UserData {
  userId: string | null;
  data: User[] | null;
}

export async function getUserData(): Promise<UserData> {
  const { userId } = auth(); // Clerkのセッションを取得

  if (!userId) {
    console.error('userIdが見つかりませんでした。');
    return { userId: null, data: null }; // null ではなく、型に沿ったオブジェクトを返す
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user data:', error.message);
    return { userId, data: null }; // 型に従った形式で返す
  }

  return { data, userId };
}