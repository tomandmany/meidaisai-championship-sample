// @/actions/votes/setTutorial.ts
'use server';

import getTutorials from '@/data/getTutorials';
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface SetTutorialParams {
  user_id: string;
  tutorial_name: string;
}

export default async function setTutorial({
  user_id,
  tutorial_name,
}: SetTutorialParams): Promise<void> {
  const isFinishedTutorial = await getTutorials(user_id, tutorial_name);
  if (isFinishedTutorial) {
    console.error('チュートリアルは終了しています。: ', user_id, tutorial_name);
    throw new Error('チュートリアルは終了しています。');
  }

  const { error } = await supabase.from('tutorials').insert({
    user_id: user_id,
    tutorial_name: tutorial_name,
  });

  if (error) {
    console.error(
      'チュートリアルの完了フラグを追加中にエラーが発生しました:',
      error.message
    );
    throw new Error('チュートリアルの完了フラグを追加中にエラーが発生しました');
  }

  revalidatePath('/votes/champ');

  console.log('チュートリアルの完了フラグを追加しました:', user_id);
}
