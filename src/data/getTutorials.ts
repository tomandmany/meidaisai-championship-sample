// @/data/getTutorials.ts

import { supabase } from '@/lib/supabaseClient';

export default async function getTutorials(userId: string, tutorial_name: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('tutorials')
    .select('*')
    .eq('user_id', userId)
    .eq('tutorial_name', tutorial_name)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching tutorial data:', error);
    return false;
  }

  return data.length > 0;
}
